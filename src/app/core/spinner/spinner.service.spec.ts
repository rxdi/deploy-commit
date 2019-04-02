import "jest";
import { Container, createTestBed } from "@rxdi/core";
import { SpinnerService } from "./spinner.service";

describe("Spinner Service", () => {
  beforeAll(async () => {
    await createTestBed({
      imports: [],
      providers: [SpinnerService]
    }).toPromise();
  });

  it("should be defined", done => {
    expect(Container.has(SpinnerService)).toBeTruthy();
    done();
  });
});
