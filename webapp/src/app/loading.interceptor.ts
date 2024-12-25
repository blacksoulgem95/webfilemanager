import { HttpEventType, HttpInterceptorFn } from '@angular/common/http';
import { catchError, tap } from 'rxjs';
import { inject } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { v7 as uuid } from 'uuid';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(LoadingService);
  const reqId = uuid();
  req.headers.set('X-REQ-ID', reqId);
  loading.setLoading(reqId, true);

  let data = next(req).pipe(
    tap((event) => {
      console.log('intercept', event);
      switch (event.type) {
        case HttpEventType.Response:
          loading.setLoading(reqId, false);
      }
    }),
  );

  data.pipe(
    catchError((err) => {
      loading.setLoading(reqId, false);
      return err;
    }),
  );

  return data;
};
