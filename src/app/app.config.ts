import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import { provideToastr } from 'ngx-toastr';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { routes } from './app.routes';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimationsAsync(), 
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-center', 
      preventDuplicates: true, 
      closeButton: true, 
    }),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(environment.firebase)), // ✅ Firebase Initialization
      provideFirestore(() => getFirestore())
    ),
  ]
};
