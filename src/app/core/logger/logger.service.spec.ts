import "jest";
import { Container, createTestBed } from "@rxdi/core";
import { LoggerService } from "./logger.service";

describe("Logger Service", () => {
  beforeAll(async () => {
    await createTestBed({
      imports: [],
      providers: [LoggerService]
    }).toPromise();
  });

  it("should be defined", done => {
    expect(Container.has(LoggerService)).toBeTruthy();
    done();
  });
});
