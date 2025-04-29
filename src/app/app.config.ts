import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Route, Routes, withDebugTracing } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { ServiceService } from './Services/BookService/service.service';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SubjectService } from './Services/SubjectService/subject.service';
import { CartService } from './Services/CartService/cart.service';
import { CheckOutService } from './Services/CheckOutService/check-out.service';
import { CountryStateService } from './Services/CountryStateService/country-state.service';
import { PurchaseService } from './Services/PurchaseService/purchase.service';
import { OKTA_AUTH, OKTA_CONFIG, OktaAuthModule, OktaAuthStateService} from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import thisAppConfig from './config/this-app-config';


const okt=new OktaAuth(thisAppConfig.oidc);



export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideClientHydration(withEventReplay()), provideHttpClient(withFetch()), ServiceService, SubjectService, CartService, 
    OktaAuthStateService, CheckOutService, CountryStateService, PurchaseService, { provide: OKTA_CONFIG, useValue: {oktaAuth: okt} },
    {provide: OKTA_AUTH, useValue:okt}
  ]
};
