import {fromFetch} from 'rxjs/internal/observable/dom/fetch';
import {environment} from '../../environments/environment';
import {map, Observable, of, throwError} from 'rxjs';
import {fromPromise} from 'rxjs/internal/observable/innerFrom';

export interface QueryParams {
  [key: string]: any
}

export type Method = "GET" | "POST" | "PATCH" | "PUT" | "DELETE"

export default class HttpService {
  private baseUrl: string;

  constructor(protected basePath = "") {
    this.baseUrl = new URL(basePath, environment.baseUrl).toString()
  }

  get headers(): any {

    let headers = new Headers({
      'content-type': `application/json;charset=UTF-8`
    })

    const jwt = localStorage.getItem("jwt")
    if (jwt) headers.set('authorization', `Bearer ${localStorage.getItem("jwt")}`)

    return headers
  }

  handleResponse = async (response: Response) => {
    if (response.status == 201) {
      return of({})
    } else if (response.status < 400) {
      return fromPromise(response.json())
    } else {
      console.error("Error in handling request", response)
      let data = await response.text()
      try {
        data = JSON.parse(data);
      } catch (ignored) {
        // ignore
      }
      const error = {
        status: response.status,
        data
      }
      console.log(error)
      return throwError(() => error)
    }
  }

  queryString(query?: QueryParams) {
    if (!query) return ""
    return Object.entries(query)
      .flatMap(([key, value]) => [value].flat().map(v => [key, v]))
      .map(it => it.join("="))
      .join("&");
  }

  performCall(method: Method, url: string, query?: QueryParams, body?: any) {
    // @ts-ignore
    return fromFetch(new URL(url, this.baseUrl).toString() + this.queryString(query), {
      method: method as string,
      headers: this.headers,
      body: body ? JSON.stringify(body) : undefined
    }).pipe(map(this.handleResponse))
  }


  get(url: string, query?: QueryParams): Observable<Promise<Observable<{}> | Observable<any> | Observable<never>>> {
    return this.performCall("GET", url, query)
  }

  post(url: string, body?: any, query?: QueryParams): Observable<Promise<Observable<{}> | Observable<any> | Observable<never>>> {
    return this.performCall("POST", url, query, body)
  }

  patch(url: string, body?: any, query?: QueryParams): Observable<Promise<Observable<{}> | Observable<any> | Observable<never>>> {
    return this.performCall("POST", url, query, body)
  }

  put(url: string, body?: any, query?: QueryParams): Observable<Promise<Observable<{}> | Observable<any> | Observable<never>>> {
    return this.performCall("POST", url, query, body)
  }

  delete(url: string, query?: QueryParams): Observable<Promise<Observable<{}> | Observable<any> | Observable<never>>> {
    return this.performCall("POST", url, query)
  }
}
