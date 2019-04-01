import { Observable } from 'rxjs';
export declare class RequestService {
    request<T>(query: string, variables?: any): Observable<T>;
}
