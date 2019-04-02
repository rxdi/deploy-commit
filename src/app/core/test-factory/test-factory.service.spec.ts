import "jest";
import { Container, createTestBed } from "@rxdi/core";
import { TestFactoryService } from "./test-factory.service";

describe("TestFactory Service", () => {
  beforeAll(async () => {
    await createTestBed({
      imports: [],
      providers: [TestFactoryService]
    }).toPromise();
  });

  it("should be defined", done => {
    expect(Container.has(TestFactoryService)).toBeTruthy();
    done();
  });
});
