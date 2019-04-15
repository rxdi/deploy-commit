import { Injectable } from "@rxdi/core";
import { COMMANDS } from "../../app.injection";
import { TransactionService } from "../transaction/transaction.service";
import { ITransactionType, IStatusQueryType } from "../api-introspection";
import { StatusService } from "../status/status.service";
import { InstallService } from "../tasks/install/install.service";

@Injectable()
export class ExecutorService {
  taskMapServer = new Map<
    COMMANDS,
    () => Promise<ITransactionType | ITransactionType[] | {}>
  >([
    [COMMANDS.add, this.transactionService.addTransaction],
    [COMMANDS.checkout, this.transactionService.checkoutTransaction],
    [COMMANDS.commit, this.transactionService.commitTransaction],
    [COMMANDS.status, this.transactionService.listTransactions],
    [COMMANDS.push, this.transactionService.pushTransactions]
  ]);

  taskMapClient = new Map<
    COMMANDS,
    () => Promise<ITransactionType | ITransactionType[] | {}>
  >([
    [COMMANDS.install, this.installService.install],
    [COMMANDS.i, this.installService.install]
  ]);

  constructor(
    private transactionService: TransactionService,
    private statusService: StatusService,
    private installService: InstallService
  ) {}

  async execute(command: COMMANDS) {
    if (this.taskMapClient.has(command)) {
      return await this.taskMapClient.get(command)();
    }
    if (this.taskMapServer.has(command) && (await this.isServerStarted())) {
      return await this.taskMapServer.get(command)();
    }
    return null;
  }

  async isServerStarted() {
    let res: IStatusQueryType;
    try {
      res = (await this.statusService.requestStatus().toPromise()).status;
    } catch (e) {
      console.log(
        "FetchError: request to http://localhost:9000/graphql failed, reason: connect ECONNREFUSED 127.0.0.1:9000",
        "\nstart @rxdi/deploy server example: rxdi-deploy --webui"
      );
    }
    return !!res;
  }
}
