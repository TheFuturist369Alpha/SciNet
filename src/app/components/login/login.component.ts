import { Component, Inject, OnInit } from '@angular/core';
import {OKTA_AUTH} from '@okta/okta-angular';
import * as OktaAuthNS from '@okta/okta-auth-js';
import {OktaAuth} from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import thisAppConfig from '../../config/this-app-config';

const OktA=OktaAuthNS.OktaAuth;
const OktS=OktaAuthNS.OktaSignIn;
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  oktaSignin:any;

  constructor(@Inject(OKTA_AUTH) private oktaAuth:InstanceType<typeof OktA>){
    this.oktaSignin=new OktaSignIn({
      logo: 'assets/images/logo.png',
      baseUrl: thisAppConfig.oidc.issuer.split("/oauth2/default")[0],
      clientId:thisAppConfig.oidc.client,
      redirectUri:thisAppConfig.oidc.redirectUri,
      authParams:{
        pkce:true,
        issuer:thisAppConfig.oidc.issuer,
        scopes:thisAppConfig.oidc.scopes
      }
    });
  }

  ngOnInit(): void {
    this.oktaSignin.remove();
    this.oktaSignin.renderEl({
      el:"#okta-signin-widg"},
      (response:any)=>{
        if(response.status==="SUCCESS"){
          this.oktaAuth.signInWithRedirect()
        }
      },
      (error:any)=>{
        console.log(error);
      }
    )
  }

}
