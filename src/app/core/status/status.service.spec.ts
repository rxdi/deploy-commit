import "jest";
import { Container, createTestBed } from "@rxdi/core";
import { StatusService } from "./status.service";

describe("Status Service", () => {
  beforeAll(async () => {
    await createTestBed({
      imports: [],
      providers: [StatusService]
    }).toPromise();
  });

  it("should be defined", done => {
    expect(Container.has(StatusService)).toBeTruthy();
    done();
  });
});
