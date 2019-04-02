import { Module } from "@rxdi/core";
import {
  COMMAND_PARSER,
  REACTIVE_JSON,
  PACKAGE_JSON,
  COMMANDS
} from "./app.injection";
import { CoreModule } from "./core/core.module";
import { FileService } from "./core/file/file.service";
import { ExecutorService } from "./core/executor/executor.service";

@Module({
  imports: [CoreModule],
  providers: [
    {
      provide: COMMAND_PARSER,
      useFactory: () => process.argv.slice(2)
    },
    {
      provide: REACTIVE_JSON,
      deps: [FileService],
      useFactory: (fileService: FileService) => fileService.readReactiveJson()
    },
    {
      provide: PACKAGE_JSON,
      deps: [FileService],
      useFactory: (fileService: FileService) => fileService.readPackageJson()
    },
    {
      provide: "Executor",
      deps: [COMMAND_PARSER, ExecutorService],
      lazy: true,
      useFactory: (commandParser: COMMANDS[], executor: ExecutorService) =>
        executor.execute(commandParser[0])
    }
  ]
})
export class AppModule {}
