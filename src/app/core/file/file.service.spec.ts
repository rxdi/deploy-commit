import "jest";
import { Container, createTestBed } from "@rxdi/core";
import { FileService } from "./file.service";

describe("File Service", () => {
  beforeAll(async () => {
    await createTestBed({
      imports: [],
      providers: [FileService]
    }).toPromise();
  });

  it("should be defined", done => {
    expect(Container.has(FileService)).toBeTruthy();
    done();
  });
});
