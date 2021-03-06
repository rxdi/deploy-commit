"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const rxjs_1 = require("rxjs");
const ora = require("ora");
let SpinnerService = class SpinnerService {
    start(text) {
        return rxjs_1.of((this.spinner = ora(text).start()));
    }
    stop(symbol = "", text = "") {
        return rxjs_1.of(this.spinner.stopAndPersist({ symbol, text }));
    }
    stopAndPersist(symbol = "", text = "") {
        return this.spinner.stopAndPersist({ symbol, text });
    }
};
SpinnerService = __decorate([
    core_1.Injectable()
], SpinnerService);
exports.SpinnerService = SpinnerService;
//# sourceMappingURL=spinner.service.js.map