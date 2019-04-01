import { Module } from '@rxdi/core';
import { ExecutorService } from './executor/executor.service';
import { FileService } from './file/file.service';
import { LoggerService } from './logger/logger.service';
import { SpinnerService } from './spinner/spinner.service';
import { TransactionService } from './transaction/transaction.service';
import { RequestService } from './request/request.service';

@Module({
  providers: [ExecutorService, FileService, LoggerService, SpinnerService, TransactionService, RequestService]
})
export class CoreModule {}
