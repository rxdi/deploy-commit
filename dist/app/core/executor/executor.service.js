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
const app_injection_1 = require("../../app.injection");
const transaction_service_1 = require("../transaction/transaction.service");
const status_service_1 = require("../status/status.service");
let ExecutorService = class ExecutorService {
    constructor(transactionService, statusService) {
        this.transactionService = transactionService;
        this.statusService = statusService;
        this.taskMap = new Map([
            [app_injection_1.COMMANDS.add, this.transactionService.addTransaction],
            [app_injection_1.COMMANDS.checkout, this.transactionService.checkoutTransaction],
            [app_injection_1.COMMANDS.commit, this.transactionService.commitTransaction],
            [app_injection_1.COMMANDS.status, this.transactionService.listTransactions],
            [app_injection_1.COMMANDS.push, this.transactionService.pushTransactions]
        ]);
    }
    execute(command) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.taskMap.has(command) && (yield this.isServerStarted())) {
                return yield this.taskMap.get(command)();
            }
            return null;
        });
    }
    isServerStarted() {
        return __awaiter(this, void 0, void 0, function* () {
            let res;
            try {
                res = (yield this.statusService.requestStatus().toPromise()).status;
            }
            catch (e) {
                console.log("FetchError: request to http://localhost:9000/graphql failed, reason: connect ECONNREFUSED 127.0.0.1:9000", "\nstart @rxdi/deploy server example: rxdi-deploy --webui");
            }
            return !!res;
        });
    }
};
ExecutorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [transaction_service_1.TransactionService,
        status_service_1.StatusService])
], ExecutorService);
exports.ExecutorService = ExecutorService;
//# sourceMappingURL=executor.service.js.map