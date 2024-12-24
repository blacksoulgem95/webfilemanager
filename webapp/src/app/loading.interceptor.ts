import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { tap } from 'rxjs';
import { inject } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { v7 as uuid } from 'uuid';


export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  const reqId = uuid()
  req.headers.set('X-REQ-ID', reqId)
  loading.setLoading(reqId, true)

  return next(req).pipe(
    tap(event => {
      switch (event.type) {
        case HttpEventType.Response:
          loading.setLoading(reqId, false)
      }
    })
  )
};
