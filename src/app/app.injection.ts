import { InjectionToken } from "@rxdi/core";

export const COMMAND_PARSER = new InjectionToken<string>(
  "rxdi-commiter-command-parser"
);
export const REACTIVE_JSON = new InjectionToken<string>(
  "rxdi-commiter-reactive-json"
);
export const PACKAGE_JSON = new InjectionToken<string>(
  "rxdi-commiter-package-json"
);

export interface REACTIVE_JSON {
  main: string;
  name: string;
}


export interface PACKAGE_JSON extends REACTIVE_JSON {}


export type COMMAND_PARSER = string[];


export enum COMMANDS {
  status = "status",
  add = "add",
  scan = "scan",
  checkout = "checkout",
  commit = "commit",
  push = "push"
}
export type MAIN_COMMANDS = "--status" | "--help" | " ";
