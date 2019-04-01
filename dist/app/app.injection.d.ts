import { InjectionToken } from "@rxdi/core";
export declare const COMMAND_PARSER: InjectionToken<string>;
export declare const REACTIVE_JSON: InjectionToken<string>;
export declare const PACKAGE_JSON: InjectionToken<string>;
export declare type COMMANDS = 'list' | 'add' | 'scan' | 'checkout';
export declare type MAIN_COMMANDS = '--status' | '--help' | '';
