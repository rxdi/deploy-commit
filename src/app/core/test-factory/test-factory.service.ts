import { Injectable  } from "@rxdi/core";
import { REACTIVE_JSON, PACKAGE_JSON, COMMAND_PARSER } from "../../app.injection";
export const createFakeInjectables = () => [
  {
    provide: REACTIVE_JSON,
    useFactory: () => ({})
  },
  {
    provide: PACKAGE_JSON,
    useFactory: () => ({})
  },
  {
    provide: COMMAND_PARSER,
    useFactory: () => process.argv.slice(2)
  },
];
@Injectable()
export class TestFactoryService {
  createFakeInjectables() {
      return createFakeInjectables();
  }
}
