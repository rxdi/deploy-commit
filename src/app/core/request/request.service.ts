import { Injectable } from '@rxdi/core';
import { from, Observable } from 'rxjs';
import request from 'graphql-request';
import { importQuery } from '../api-introspection/graphql-helpers';
import { DocumentTypes } from '../api-introspection/documentTypes';

@Injectable()
export class RequestService {

  request<T>(query: DocumentTypes, variables: any = {}): Observable<T> {
    return from(request<T>('http://localhost:9000/graphql', importQuery(query), variables));
  }

}
