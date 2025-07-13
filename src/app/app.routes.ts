import { Routes } from '@angular/router';
import { BookListComponent } from './components/Book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { CartdetailComponent } from './components/cart-detail/cartdetail/cartdetail.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG } from '@okta/okta-angular';
import {OktaAuth} from '@okta/okta-auth-js';
import thisAppConfig from './config/this-app-config';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
//import { LoginComponent } from './components/login/login.component';

const oktaConf=thisAppConfig.oidc;
const okAuth=new OktaAuth(oktaConf);
export const routes: Routes = [
   // {path:"login/callback", component: OktaCallbackComponent},
    //{path:"login", component: LoginComponent},
    {path:"category/:id", component: BookListComponent},
    {path:"account/login", component: LoginComponent},
    {path:"account/register", component: RegisterComponent},
    {path:"book/:id", component: BookDetailComponent},
    {path: "checkout", component: CheckOutComponent},
    {path:"category", component:BookListComponent},
    {path:"cart-details", component:CartdetailComponent},
    {path:"books", component:BookListComponent},
    {path:"search/:keyword", component:BookListComponent},
    {path:"", redirectTo:"/books", pathMatch:"full"},
    {path:"**", redirectTo:"/books", pathMatch:"full"}
];
