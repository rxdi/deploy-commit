import { InjectionToken } from "@rxdi/core";
export declare const COMMAND_PARSER: InjectionToken<string>;
export declare const REACTIVE_JSON: InjectionToken<string>;
export declare const PACKAGE_JSON: InjectionToken<string>;
export interface REACTIVE_JSON {
    main: string;
    name: string;
}
export interface PACKAGE_JSON extends REACTIVE_JSON {
}
export declare type COMMAND_PARSER = string[];
export declare enum COMMANDS {
    status = "status",
    add = "add",
    scan = "scan",
    checkout = "checkout",
    commit = "commit",
    push = "push"
}
export declare type MAIN_COMMANDS = "--status" | "--help" | " ";
