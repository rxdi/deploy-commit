import { Injectable, Inject } from "@rxdi/core";
import {
  ITransactionType,
  IMutation,
  IQuery,
  ITransactionsTypeEnumEnum
} from "../api-introspection";
import { GraphService } from "../graph/graph.service";
import { nextOrDefault } from "../helpers";
import { LoggerService } from "../logger/logger.service";
import { SpinnerService } from "../spinner/spinner.service";
import { map, tap } from "rxjs/operators";
import { FileService } from "../file/file.service";
import { Stats } from "fs";
import { addTransactionMutationVariables } from "../api-introspection/operation-result-types";
import { REACTIVE_JSON, COMMAND_PARSER, PACKAGE_JSON } from "../../app.injection";

@Injectable()
export class TransactionService {
  path: string;
  constructor(
    private graphService: GraphService,
    private tLogger: LoggerService,
    private spinner: SpinnerService,
    private fileService: FileService,
    @Inject(REACTIVE_JSON) private reactiveJson: REACTIVE_JSON,
    @Inject(PACKAGE_JSON) private packageJson: PACKAGE_JSON,
    @Inject(COMMAND_PARSER) private command: COMMAND_PARSER
  ) {
    this.path = this.reactiveJson.main || this.command[1];
  }
  async scan() {
    const res = await this.fileService.listFolder(this.path).toPromise();
    // const f = this.fileService.results.map(f => f.replace(`${process.cwd()}/${path[0].replace('./', '')}/`, ''));
    console.log("");
    console.log("Files: ", res.filter(f => f.file).length);
    console.log("Folders: ", res.filter(f => f.directory).length);
    return this.fileService.results;
  }

  addTransaction = async () => {
    this.spinner.start(`Adding ${this.path} to transaction...`);
    let file: Stats;
    let error = "";
    try {
      file = await this.isDirectory(this.path);
    } catch (e) {
      error = e;
    }

    if (error) {
      this.spinner.stopAndPersist(
        "🛎️",
        ` ${this.path} is directory! Please specify file instead`
      );
      return null;
    }

    let res: ITransactionType = {} as any;
    try {
      res = await this.graphService
        .request<IMutation>("addTransactionMutation.graphql", <addTransactionMutationVariables>{
          namespace: this.reactiveJson.name || this.packageJson.name,
          birthtime: file.birthtime.toISOString(),
          path: this.path,
          repoFolder: process.cwd()
        })
        .pipe(map(res => res.addTransaction))
        .toPromise();
    } catch (e) {
      error = e.response.errors[0].message;
    }
    this.spinner.stopAndPersist(
      error ? "🛎️" : "✎",
      error || `Transaction ${res._id} created for file: ${res.path}`
    );
    return res;
  };

  async isDirectory(path: string) {
    const file: Stats = await this.fileService.statAsync(path);
    if (!file.isDirectory || (file && file.constructor.prototype === String)) {
      throw new Error("Not a file!");
    }
    if (file.isDirectory()) {
      throw new Error("This is directory! Please specify file instead!");
    }
    return file;
  }

  checkoutTransaction = async () => {
    let error = "";
    try {
      await this.isDirectory(this.path);
    } catch (e) {
      error = e;
    }

    if (error) {
      this.spinner.stopAndPersist(
        "🛎️",
        ` ${this.path} is directory! Please specify file instead`
      );
      return null;
    }

    let res: ITransactionType;
    try {
      this.spinner.start("Commiting transaction...");
      res = await this.graphService
        .request<IMutation>("checkoutTransactionMutation.graphql", <
          addTransactionMutationVariables
        >{
          repoFolder: process.cwd(),
          birthtime: null,
          path: this.path
        })
        .pipe(map(res => res.checkoutTransaction))
        .toPromise();
    } catch (e) {
      if (e && e.response && e.response.errors.length) {
        error = e.response.errors[0].message;
      }
    }
    this.spinner.stopAndPersist(
      error ? "🛎️" : "✎",
      error || `Transaction removed: ${this.path}`
    );
    return res;
  };

  commitTransaction = async () => {
    const message = process.argv.slice(3)[0];
    if (!message) {
      throw new Error("Missing commit message");
    }
    let error = "";
    let res: ITransactionType;
    try {
      this.spinner.start("");
      res = await this.graphService
        .request<IMutation>("commitTransactionMutation.graphql", {
          repoFolder: process.cwd(),
          message
        })
        .pipe(map(res => res.commitTransaction))
        .toPromise();
    } catch (e) {
      console.log(e);
      if (e && e.response && e.response.errors.length) {
        error = e.response.errors[0].message;
      }
    }
    console.log(res);
    this.spinner.stopAndPersist(
      error ? "🛎️" : "✎",
      error || `Transaction commited ${res._id} with message ${res.message}`
    );
    return res;
  };

  pushTransactions = async () => {
    let error = "";
    let res: ITransactionType;
    try {
      this.spinner.start("");
      res = await this.graphService
        .request<IMutation>("pushTransactionMutation.graphql", {
          repoFolder: process.cwd()
        })
        .pipe(map(res => res.commitTransaction))
        .toPromise();
    } catch (e) {
      if (e && e.response && e.response.errors.length) {
        error = e.response.errors[0].message;
      }
    }
    this.spinner.stopAndPersist(
      error ? "🛎️" : "✎",
      error ||
        `Transaction pushed ${res._id} with message ${
          res.message
        } waiting for build to pass...`
    );
    return res;
  };

  listTransactions = async (): Promise<ITransactionType[]> => {
    const status: ITransactionsTypeEnumEnum = nextOrDefault(
      "--status",
      "UNKNOWN"
    );
    this.spinner.start(`Loading transactions...`);
    return await this.graphService
      .request<IQuery>("listTransactionsQuery.graphql", {
        status,
        repoFolder: process.cwd()
      })
      .pipe(
        map(t => t.listTransactions),
        tap(t => {
          this.tLogger.showTransactionLog(t);
          this.spinner.stopAndPersist("✎", "Transactions listed!");
        })
      )
      .toPromise();
  };
}
