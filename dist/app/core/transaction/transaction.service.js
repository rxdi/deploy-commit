"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const request_service_1 = require("../request/request.service");
const helpers_1 = require("../helpers");
const logger_service_1 = require("../logger/logger.service");
const spinner_service_1 = require("../spinner/spinner.service");
const operators_1 = require("rxjs/operators");
const file_service_1 = require("../file/file.service");
let TransactionService = class TransactionService {
    constructor(requestService, tLogger, spinner, fileService) {
        this.requestService = requestService;
        this.tLogger = tLogger;
        this.spinner = spinner;
        this.fileService = fileService;
    }
    scan() {
        return __awaiter(this, void 0, void 0, function* () {
            const path = process.argv.slice(3);
            const res = yield this.fileService.listFolder(path[0]).toPromise();
            console.log('');
            console.log('Files: ', res.filter(f => f.file).length);
            console.log('Folders: ', res.filter(f => f.directory).length);
            return this.fileService.results;
        });
    }
    addTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const path = process.argv.slice(3);
            this.spinner.start(`Adding ${path} to transaction...`);
            const file = yield this.fileService.statAsync(path[0]);
            if (!file.isDirectory || (file && file['prototype'] === String)) {
                throw new Error('Not a file!');
            }
            if (file.isDirectory()) {
                throw new Error('this is directory!');
            }
            let error = '';
            let res;
            try {
                res = yield this.requestService
                    .request(`
          mutation addTransaction($path: String!, $birthtime: String!) {
            addTransaction(path:$path, birthtime:$birthtime) {
              _id
              status
              path
              birthtime
            }
          }
          `, {
                    birthtime: file.birthtime.toISOString(),
                    path: process.cwd() + '/' + path[0].replace(/^.*[\\\/]/, '')
                })
                    .pipe(operators_1.map(res => {
                    return res.addTransaction;
                }))
                    .toPromise();
            }
            catch (e) {
                error = e.response.errors[0].message;
            }
            this.spinner.stop('✎', error || `Transaction ${res._id} created for file: ${res.path}`);
            return res;
        });
    }
    checkoutTransaction() {
        return __awaiter(this, void 0, void 0, function* () {
            const path = process.argv.slice(3);
            const file = yield this.fileService.statAsync(path[0]);
            if (!file.isDirectory || (file && file['prototype'] === String)) {
                throw new Error('Not a file!');
            }
            if (file.isDirectory()) {
                throw new Error('this is directory!');
            }
            let error = '';
            let res;
            try {
                this.spinner.start('');
                res = yield this.requestService
                    .request(`
          mutation checkoutTransaction($path: String!) {
            checkoutTransaction(path: $path) {
              _id
              status
              birthtime
              path
            }
          }
          `, {
                    path: process.cwd() + '/' + path[0].replace(/^.*[\\\/]/, '')
                })
                    .pipe(operators_1.map(res => {
                    return res.addTransaction;
                }))
                    .toPromise();
            }
            catch (e) {
                error = e.response.errors[0].message;
            }
            this.spinner.stop('✎', error || `Transaction removed: ${path[0]}`);
            return res;
        });
    }
    listTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            const status = helpers_1.nextOrDefault('--status', 'UNKNOWN');
            this.spinner.start(`Loading ${status} transactions...`);
            return yield this.requestService
                .request(`
      query listTransactions($status:TransactionsTypeEnum) {
        listTransactions(status: $status) {
          _id
          status
          path
        }
      }
      `, {
                status
            })
                .pipe(operators_1.map(t => t.listTransactions), operators_1.tap(t => {
                this.tLogger.showTransactionLog(t);
                this.spinner.stop('✎', 'Transactions listed!');
            }))
                .toPromise();
        });
    }
};
TransactionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [request_service_1.RequestService,
        logger_service_1.LoggerService,
        spinner_service_1.SpinnerService,
        file_service_1.FileService])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map