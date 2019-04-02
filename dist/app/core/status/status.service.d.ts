import { GraphService } from "../graph/graph.service";
import { IQuery } from "../api-introspection";
export declare class StatusService {
    private graphService;
    constructor(graphService: GraphService);
    requestStatus(): import("rxjs/internal/Observable").Observable<IQuery>;
}
