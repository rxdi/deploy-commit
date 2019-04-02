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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const graph_service_1 = require("../graph/graph.service");
const helpers_1 = require("../helpers");
const logger_service_1 = require("../logger/logger.service");
const spinner_service_1 = require("../spinner/spinner.service");
const operators_1 = require("rxjs/operators");
const file_service_1 = require("../file/file.service");
const app_injection_1 = require("../../app.injection");
let TransactionService = class TransactionService {
    constructor(graphService, tLogger, spinner, fileService, reactiveJson, packageJson, command) {
        this.graphService = graphService;
        this.tLogger = tLogger;
        this.spinner = spinner;
        this.fileService = fileService;
        this.reactiveJson = reactiveJson;
        this.packageJson = packageJson;
        this.command = command;
        this.addTransaction = () => __awaiter(this, void 0, void 0, function* () {
            this.spinner.start(`Adding ${this.path} to transaction...`);
            let file;
            let error = "";
            try {
                file = yield this.isDirectory(this.path);
            }
            catch (e) {
                error = e;
            }
            if (error) {
                this.spinner.stopAndPersist("🛎️", ` ${this.path} is directory! Please specify file instead`);
                return null;
            }
            let res = {};
            try {
                res = yield this.graphService
                    .request("addTransactionMutation.graphql", {
                    namespace: this.reactiveJson.name || this.packageJson.name,
                    birthtime: file.birthtime.toISOString(),
                    path: this.path,
                    repoFolder: process.cwd()
                })
                    .pipe(operators_1.map(res => res.addTransaction))
                    .toPromise();
            }
            catch (e) {
                error = e.response.errors[0].message;
            }
            this.spinner.stopAndPersist(error ? "🛎️" : "✎", error || `Transaction ${res._id} created for file: ${res.path}`);
            return res;
        });
        this.checkoutTransaction = () => __awaiter(this, void 0, void 0, function* () {
            let error = "";
            try {
                yield this.isDirectory(this.path);
            }
            catch (e) {
                error = e;
            }
            if (error) {
                this.spinner.stopAndPersist("🛎️", ` ${this.path} is directory! Please specify file instead`);
                return null;
            }
            let res;
            try {
                this.spinner.start("Commiting transaction...");
                res = yield this.graphService
                    .request("checkoutTransactionMutation.graphql", {
                    repoFolder: process.cwd(),
                    birthtime: null,
                    path: this.path
                })
                    .pipe(operators_1.map(res => res.checkoutTransaction))
                    .toPromise();
            }
            catch (e) {
                if (e && e.response && e.response.errors.length) {
                    error = e.response.errors[0].message;
                }
            }
            this.spinner.stopAndPersist(error ? "🛎️" : "✎", error || `Transaction removed: ${this.path}`);
            return res;
        });
        this.commitTransaction = () => __awaiter(this, void 0, void 0, function* () {
            const message = process.argv.slice(3)[0];
            if (!message) {
                throw new Error("Missing commit message");
            }
            let error = "";
            let res;
            try {
                this.spinner.start("");
                res = yield this.graphService
                    .request("commitTransactionMutation.graphql", {
                    repoFolder: process.cwd(),
                    message
                })
                    .pipe(operators_1.map(res => res.commitTransaction))
                    .toPromise();
            }
            catch (e) {
                console.log(e);
                if (e && e.response && e.response.errors.length) {
                    error = e.response.errors[0].message;
                }
            }
            console.log(res);
            this.spinner.stopAndPersist(error ? "🛎️" : "✎", error || `Transaction commited ${res._id} with message ${res.message}`);
            return res;
        });
        this.pushTransactions = () => __awaiter(this, void 0, void 0, function* () {
            let error = "";
            let res;
            try {
                this.spinner.start("");
                res = yield this.graphService
                    .request("pushTransactionMutation.graphql", {
                    repoFolder: process.cwd()
                })
                    .pipe(operators_1.map(res => res.commitTransaction))
                    .toPromise();
            }
            catch (e) {
                if (e && e.response && e.response.errors.length) {
                    error = e.response.errors[0].message;
                }
            }
            this.spinner.stopAndPersist(error ? "🛎️" : "✎", error ||
                `Transaction pushed ${res._id} with message ${res.message} waiting for build to pass...`);
            return res;
        });
        this.listTransactions = () => __awaiter(this, void 0, void 0, function* () {
            const status = helpers_1.nextOrDefault("--status", "UNKNOWN");
            this.spinner.start(`Loading transactions...`);
            return yield this.graphService
                .request("listTransactionsQuery.graphql", {
                status,
                repoFolder: process.cwd()
            })
                .pipe(operators_1.map(t => t.listTransactions), operators_1.tap(t => {
                this.tLogger.showTransactionLog(t);
                this.spinner.stopAndPersist("✎", "Transactions listed!");
            }))
                .toPromise();
        });
        this.path = this.reactiveJson.main || this.command[1];
    }
    scan() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.fileService.listFolder(this.path).toPromise();
            console.log("");
            console.log("Files: ", res.filter(f => f.file).length);
            console.log("Folders: ", res.filter(f => f.directory).length);
            return this.fileService.results;
        });
    }
    isDirectory(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.fileService.statAsync(path);
            if (!file.isDirectory || (file && file.constructor.prototype === String)) {
                throw new Error("Not a file!");
            }
            if (file.isDirectory()) {
                throw new Error("This is directory! Please specify file instead!");
            }
            return file;
        });
    }
};
TransactionService = __decorate([
    core_1.Injectable(),
    __param(4, core_1.Inject(app_injection_1.REACTIVE_JSON)),
    __param(5, core_1.Inject(app_injection_1.PACKAGE_JSON)),
    __param(6, core_1.Inject(app_injection_1.COMMAND_PARSER)),
    __metadata("design:paramtypes", [graph_service_1.GraphService,
        logger_service_1.LoggerService,
        spinner_service_1.SpinnerService,
        file_service_1.FileService, Object, Object, Array])
], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map