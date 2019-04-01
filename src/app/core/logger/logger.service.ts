import { Injectable } from "@rxdi/core";
import { ITransactionType } from "../api-introspection";
const chalk = require("chalk");
const Table = require("cli-table");

@Injectable()
export class LoggerService {
  showTransactionLog(t: ITransactionType[]) {
    const table = new Table({
      head: ["Transaction ID", "Status", "Path"],
      colWidths: [20, 20, 80]
    });
    table.push(...t.map(t => [t._id, t.status ? t.status : "UNKNOWN", t.path || '']));
    console.log('');
    console.log(table.toString());
    console.log(chalk`
    There are {green.bold ${
      t.filter(t => t.status === 'DEPLOYED').length
    } deployed} transactions.
    There are {red.bold ${t.length} uncommited} transactions.
        `);
  }
}
