import { Injectable } from "@rxdi/core";
import { COMMAND_PARSER, REACTIVE_JSON } from "../../app.injection";
export const createFakeInjectable = () => [
  {
    provide: COMMAND_PARSER,
    useValue: {}
  },
  {
    provide: REACTIVE_JSON,
    useValue: {}
  }
];
@Injectable()
export class TestFactoryService {
  createFakeInjectable() {
      return createFakeInjectable();
  }
}
