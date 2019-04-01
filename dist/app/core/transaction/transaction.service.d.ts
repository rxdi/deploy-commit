import { ITransactionType } from '../api-introspection';
import { RequestService } from '../request/request.service';
import { LoggerService } from '../logger/logger.service';
import { SpinnerService } from '../spinner/spinner.service';
import { FileService } from '../file/file.service';
export declare class TransactionService {
    private requestService;
    private tLogger;
    private spinner;
    private fileService;
    constructor(requestService: RequestService, tLogger: LoggerService, spinner: SpinnerService, fileService: FileService);
    scan(): Promise<string[]>;
    addTransaction(): Promise<ITransactionType>;
    checkoutTransaction(): Promise<ITransactionType>;
    listTransactions(): Promise<ITransactionType[]>;
}
