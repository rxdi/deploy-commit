import { Module } from "@rxdi/core";
import { ExecutorService } from "./executor/executor.service";
import { TransactionService } from "./transaction/transaction.service";
import { StatusService } from "./status/status.service";
import { SpinnerService } from "./spinner/spinner.service";
import { LoggerService } from "./logger/logger.service";
import { GraphService } from "./graph/graph.service";
import { FileService } from "./file/file.service";
import { TestFactoryService } from "./test-factory/test-factory.service";
import { InstallService } from "./tasks/install/install.service";

@Module({
  providers: [
    ExecutorService,
    TransactionService,
    StatusService,
    SpinnerService,
    LoggerService,
    GraphService,
    FileService,
    TestFactoryService,
    InstallService
  ]
})
export class CoreModule {}
