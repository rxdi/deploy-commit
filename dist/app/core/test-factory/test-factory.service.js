"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const app_injection_1 = require("../../app.injection");
exports.createFakeInjectable = () => [
    {
        provide: app_injection_1.COMMAND_PARSER,
        useValue: {}
    },
    {
        provide: app_injection_1.REACTIVE_JSON,
        useValue: {}
    }
];
let TestFactoryService = class TestFactoryService {
    createFakeInjectable() {
        return exports.createFakeInjectable();
    }
};
TestFactoryService = __decorate([
    core_1.Injectable()
], TestFactoryService);
exports.TestFactoryService = TestFactoryService;
//# sourceMappingURL=test-factory.service.js.map