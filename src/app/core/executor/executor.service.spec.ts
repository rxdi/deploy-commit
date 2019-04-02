import "jest";
import { Container, createTestBed } from "@rxdi/core";
import { ExecutorService } from "./executor.service";
import { createFakeInjectable } from "../test-factory/test-factory.service";

describe("Executor Service", () => {
  beforeAll(async () => {
    await createTestBed({
      imports: [],
      providers: [
        ExecutorService,
        ...createFakeInjectable()
      ]
    }).toPromise();
  });

  it("should be defined", done => {
    expect(Container.has(ExecutorService)).toBeTruthy();
    done();
  });
});
