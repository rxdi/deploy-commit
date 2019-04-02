import { ITransactionType } from "../api-introspection";
import { GraphService } from "../graph/graph.service";
import { LoggerService } from "../logger/logger.service";
import { SpinnerService } from "../spinner/spinner.service";
import { FileService } from "../file/file.service";
import { Stats } from "fs";
import { REACTIVE_JSON, COMMAND_PARSER, PACKAGE_JSON } from "../../app.injection";
export declare class TransactionService {
    private graphService;
    private tLogger;
    private spinner;
    private fileService;
    private reactiveJson;
    private packageJson;
    private command;
    path: string;
    constructor(graphService: GraphService, tLogger: LoggerService, spinner: SpinnerService, fileService: FileService, reactiveJson: REACTIVE_JSON, packageJson: PACKAGE_JSON, command: COMMAND_PARSER);
    scan(): Promise<string[]>;
    addTransaction: () => Promise<ITransactionType>;
    isDirectory(path: string): Promise<Stats>;
    checkoutTransaction: () => Promise<ITransactionType>;
    commitTransaction: () => Promise<ITransactionType>;
    pushTransactions: () => Promise<ITransactionType>;
    listTransactions: () => Promise<ITransactionType[]>;
}
