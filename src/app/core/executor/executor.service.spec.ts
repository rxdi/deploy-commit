import "jest";
import { Container, createTestBed } from "@rxdi/core";
import { ExecutorService } from "./executor.service";
import { createFakeInjectables } from "../test-factory/test-factory.service";

describe("Executor Service", () => {
  beforeAll(async () => {
    await createTestBed({
      providers: [
        ExecutorService,
        ...createFakeInjectables()
      ]
    }).toPromise();
  });

  it("should be defined", done => {
    expect(Container.has(ExecutorService)).toBeTruthy();
    done();
  });
});
