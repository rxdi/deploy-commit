import { Injectable } from "@rxdi/core";
import { COMMANDS } from "../../app.injection";
import { TransactionService } from "../transaction/transaction.service";
import { ITransactionType, IStatusQueryType } from "../api-introspection";
import { StatusService } from "../status/status.service";

@Injectable()
export class ExecutorService {
  taskMap = new Map<
    COMMANDS,
    () => Promise<ITransactionType | ITransactionType[]>
  >([
    [COMMANDS.add, this.transactionService.addTransaction],
    [COMMANDS.checkout, this.transactionService.checkoutTransaction],
    [COMMANDS.commit, this.transactionService.commitTransaction],
    [COMMANDS.status, this.transactionService.listTransactions],
    [COMMANDS.push, this.transactionService.pushTransactions]
  ]);

  constructor(
    private transactionService: TransactionService,
    private statusService: StatusService
  ) {}

  async execute(command: COMMANDS) {
    if (this.taskMap.has(command) && await this.isServerStarted()) {
      return await this.taskMap.get(command)();
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
