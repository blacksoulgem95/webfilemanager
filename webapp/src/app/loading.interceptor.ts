import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { inject } from '@angular/core';
import { LoadingService } from './services/loading.service';
import {v7 as uuid} from "uuid";


export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  const reqId = uuid()
  req.headers.set('X-REQ-ID', reqId)
  loading.setLoading(reqId, true)

  const data = next(req)

  data.pipe(catchError(err => {
    loading.setLoading(reqId, false)
    return err
  })).pipe(map(data => {
    loading.setLoading(reqId, false)
    return data
  }))

  return data;
};
