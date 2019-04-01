import { Injectable } from '@rxdi/core';
import { COMMANDS } from 'app/app.injection';
import { TransactionService } from '../transaction/transaction.service';

@Injectable()
export class ExecutorService {
  constructor(
    private transactionService: TransactionService
  ) {}
  execute(command: COMMANDS[]) {
    switch (command[0]) {
      case 'status':
        return this.transactionService.listTransactions();
        case 'add':
        return this.transactionService.addTransaction();
        case 'checkout':
        return this.transactionService.checkoutTransaction();
      case 'scan':
        return this.transactionService.scan();
      default:
        console.log('no-command-to-execute');
        return false;
    }
  }

}
