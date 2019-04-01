import { InjectionToken } from "@rxdi/core";

export const COMMAND_PARSER = new InjectionToken<string>('rxdi-commiter-command-parser');
export const REACTIVE_JSON = new InjectionToken<string>('rxdi-commiter-reactive-json');
export const PACKAGE_JSON = new InjectionToken<string>('rxdi-commiter-package-json');

export type COMMANDS = 'status' | 'add' | 'scan' | 'checkout';

export type MAIN_COMMANDS = 
| '--status'
| '--help'
| ''



;