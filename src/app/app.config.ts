import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Route, Routes, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ServiceService } from './Services/BookService/service.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SubjectService } from './Services/SubjectService/subject.service';
import { CartService } from './Services/CartService/cart.service';
import { CheckOutService } from './Services/CheckOutService/check-out.service';





export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideClientHydration(withEventReplay()), provideHttpClient(withFetch()), ServiceService, SubjectService, CartService, CheckOutService]
};
