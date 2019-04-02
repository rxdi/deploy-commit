import { COMMANDS } from "../../app.injection";
import { TransactionService } from "../transaction/transaction.service";
import { ITransactionType } from "../api-introspection";
import { StatusService } from "../status/status.service";
export declare class ExecutorService {
    private transactionService;
    private statusService;
    taskMap: Map<COMMANDS, () => Promise<ITransactionType | ITransactionType[]>>;
    constructor(transactionService: TransactionService, statusService: StatusService);
    execute(command: COMMANDS): Promise<ITransactionType | ITransactionType[]>;
    isServerStarted(): Promise<boolean>;
}
