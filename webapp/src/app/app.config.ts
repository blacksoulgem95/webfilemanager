import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { LoadingInterceptor } from './loading.interceptor';
import {
  ApiModule,
  Configuration,
  ConfigurationParameters,
} from './services/integration';
import { environment } from '../environments/environment';
import { ICON_BASE_PATH_FOR_ASSETS } from 'ngx-xp-icons';

export const appConfig: ApplicationConfig = {
  providers: [
    {provide: ICON_BASE_PATH_FOR_ASSETS, useValue: environment.baseUrl},
    provideHttpClient(withInterceptors([LoadingInterceptor])),
    importProvidersFrom(
      ApiModule.forRoot(() => {
        const configuration: ConfigurationParameters = {
          basePath: environment.baseUrl,
        };

        return new Configuration(configuration);
      }),
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ],
};
