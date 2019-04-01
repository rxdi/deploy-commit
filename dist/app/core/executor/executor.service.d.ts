import { COMMANDS } from 'app/app.injection';
import { TransactionService } from '../transaction/transaction.service';
export declare class ExecutorService {
    private transactionService;
    constructor(transactionService: TransactionService);
    execute(command: COMMANDS[]): false | Promise<string[]> | Promise<import("../api-introspection").ITransactionType> | Promise<import("../api-introspection").ITransactionType[]>;
}
