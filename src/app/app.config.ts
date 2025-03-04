import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),provideAnimationsAsync(),
    provideAnimations(), // Required for ngx-toastr
    provideToastr({
      positionClass: 'toast-top-right', // Position at top-right
      timeOut: 3000, // Auto-dismiss after 3 seconds
      progressBar: true, // Show progress bar
      closeButton: true, // Allow closing
    }),

  ]
};


