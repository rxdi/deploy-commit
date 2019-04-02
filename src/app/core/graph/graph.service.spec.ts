import "jest";
import { Container, createTestBed } from "@rxdi/core";
import { GraphService } from "./graph.service";

describe("Graph Service", () => {
  beforeAll(async () => {
    await createTestBed({
      imports: [],
      providers: [GraphService]
    }).toPromise();
  });

  it("should be defined", done => {
    expect(Container.has(GraphService)).toBeTruthy();
    done();
  });
});
