"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const app_injection_1 = require("./app.injection");
const core_module_1 = require("./core/core.module");
const file_service_1 = require("./core/file/file.service");
const executor_service_1 = require("./core/executor/executor.service");
let AppModule = class AppModule {
};
AppModule = __decorate([
    core_1.Module({
        imports: [core_module_1.CoreModule],
        providers: [
            {
                provide: app_injection_1.COMMAND_PARSER,
                useFactory: () => process.argv.slice(2)
            },
            {
                provide: app_injection_1.REACTIVE_JSON,
                deps: [file_service_1.FileService],
                useFactory: (fileService) => fileService.readReactiveJson()
            },
            {
                provide: app_injection_1.PACKAGE_JSON,
                deps: [file_service_1.FileService],
                useFactory: (fileService) => fileService.readPackageJson()
            },
            {
                provide: "Executor",
                deps: [app_injection_1.COMMAND_PARSER, executor_service_1.ExecutorService],
                lazy: true,
                useFactory: (commandParser, executor) => executor.execute(commandParser[0])
            }
        ]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map