import { Observable } from "rxjs";
import { DocumentTypes } from "../api-introspection/documentTypes";
export declare class GraphService {
    request<T>(query: DocumentTypes, variables?: any): Observable<T>;
}
