"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const executor_service_1 = require("./executor/executor.service");
const transaction_service_1 = require("./transaction/transaction.service");
const status_service_1 = require("./status/status.service");
const spinner_service_1 = require("./spinner/spinner.service");
const logger_service_1 = require("./logger/logger.service");
const graph_service_1 = require("./graph/graph.service");
const file_service_1 = require("./file/file.service");
const test_factory_service_1 = require("./test-factory/test-factory.service");
let CoreModule = class CoreModule {
};
CoreModule = __decorate([
    core_1.Module({
        providers: [
            executor_service_1.ExecutorService,
            transaction_service_1.TransactionService,
            status_service_1.StatusService,
            spinner_service_1.SpinnerService,
            logger_service_1.LoggerService,
            graph_service_1.GraphService,
            file_service_1.FileService,
            test_factory_service_1.TestFactoryService
        ]
    })
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map