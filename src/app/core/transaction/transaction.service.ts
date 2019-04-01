import { Injectable } from '@rxdi/core';
import {
  ITransactionType,
  IMutation,
  IQuery,
  ITransactionsTypeEnumEnum
} from '../api-introspection';
import { RequestService } from '../request/request.service';
import { nextOrDefault } from '../helpers';
import { LoggerService } from '../logger/logger.service';
import { SpinnerService } from '../spinner/spinner.service';
import { map, tap } from 'rxjs/operators';
import { FileService } from '../file/file.service';
import { Stats } from 'fs';
import { addTransactionMutationVariables } from '../api-introspection/operation-result-types';


@Injectable()
export class TransactionService {
  constructor(
    private requestService: RequestService,
    private tLogger: LoggerService,
    private spinner: SpinnerService,
    private fileService: FileService
  ) {}
  async scan() {
    const path = process.argv.slice(3);
    const res = await this.fileService.listFolder(path[0]).toPromise();
    // const f = this.fileService.results.map(f => f.replace(`${process.cwd()}/${path[0].replace('./', '')}/`, ''));
    console.log('');
    console.log('Files: ', res.filter(f => f.file).length);
    console.log('Folders: ', res.filter(f => f.directory).length);
    return this.fileService.results;
  }

  async addTransaction() {
    const path = process.argv.slice(3);
    this.spinner.start(`Adding ${path} to transaction...`);
    const file: Stats = await this.isDirectory(path[0]);
    let error = '';
    let res: ITransactionType;
    try {
      res = await this.requestService
        .request<IMutation>('addTransactionMutation.graphql',
        <addTransactionMutationVariables>{
            birthtime: file.birthtime.toISOString(),
            path: path[0],
            repoFolder: process.cwd()
          }
        )
        .pipe(
          map(res => res.addTransaction)
        )
        .toPromise();
    } catch (e) {
      error = e.response.errors[0].message;
    }
    this.spinner.stopAndPersist(
      '✎',
      error || `Transaction ${res._id} created for file: ${res.path}`
    );
    return res;
  }

  async isDirectory(path: string) {
    const file: Stats = await this.fileService.statAsync(path);
    if (!file.isDirectory || (file && file['prototype'] === String)) {
      throw new Error('Not a file!');
    }
    if (file.isDirectory()) {
      throw new Error('this is directory!');
    }
    return file;
  }

  async checkoutTransaction() {
    const path = process.argv.slice(3);
    await this.isDirectory(path[0]);
    let error = '';
    let res: ITransactionType;
    try {
      this.spinner.start('');
      res = await this.requestService
        .request<IMutation>('checkoutTransactionMutation.graphql',
          <addTransactionMutationVariables>{
            repoFolder: process.cwd(),
            birthtime: null,
            path: path[0]
          }
        )
        .pipe(
          map(res => res.checkoutTransaction)
        )
        .toPromise();
    } catch (e) {
      error = e.response.errors[0].message;
    }
    this.spinner.stopAndPersist(
      '✎',
      error || `Transaction removed: ${path[0]}`
    );
    return res;
  }

  async listTransactions(): Promise<ITransactionType[]> {
    const status: ITransactionsTypeEnumEnum = nextOrDefault(
      '--status',
      'UNKNOWN'
    );
    this.spinner.start(`Loading ${status} transactions...`);
    return await this.requestService
      .request<IQuery>('listTransactionsQuery.graphql', { status, repoFolder: process.cwd() })
      .pipe(
        map(t => t.listTransactions),
        tap(t => {
          this.tLogger.showTransactionLog(t);
          this.spinner.stopAndPersist('✎', 'Transactions listed!');
        })
      )
      .toPromise();
  }
}
