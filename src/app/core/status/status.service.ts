import { Injectable } from "@rxdi/core";
import { GraphService } from "../graph/graph.service";
import { IQuery } from "../api-introspection";

@Injectable()
export class StatusService {
  constructor(private graphService: GraphService) {}

  requestStatus() {
    return this.graphService.request<IQuery>(
      "statusQuery.graphql"
    );
  }
}
