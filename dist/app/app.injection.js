"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
exports.COMMAND_PARSER = new core_1.InjectionToken("rxdi-commiter-command-parser");
exports.REACTIVE_JSON = new core_1.InjectionToken("rxdi-commiter-reactive-json");
exports.PACKAGE_JSON = new core_1.InjectionToken("rxdi-commiter-package-json");
var COMMANDS;
(function (COMMANDS) {
    COMMANDS["status"] = "status";
    COMMANDS["add"] = "add";
    COMMANDS["scan"] = "scan";
    COMMANDS["checkout"] = "checkout";
    COMMANDS["commit"] = "commit";
    COMMANDS["push"] = "push";
})(COMMANDS = exports.COMMANDS || (exports.COMMANDS = {}));
//# sourceMappingURL=app.injection.js.map