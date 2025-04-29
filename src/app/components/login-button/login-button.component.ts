import { NgIf } from '@angular/common';
import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import  * as OktA  from '@okta/okta-auth-js';

const okauth=OktA.OktaAuth;

@Component({
  selector: 'app-login-button',
  imports: [NgIf, RouterModule],
  templateUrl: './login-button.component.html',
  styleUrl: './login-button.component.css'
})
export class LoginButtonComponent implements OnInit{
 int:number=1;
  fullName:string="";
  authenticated:boolean=false;

constructor(private authService:OktaAuthStateService, @Inject(OKTA_AUTH) private okAuth:InstanceType<typeof okauth> ){


}

ngOnInit(): void {
  this.authService.authState$.subscribe((result)=>{
    this.authenticated=result.isAuthenticated!
    this.getUserDetails();
  });
}

getUserDetails(){
  if(this.authenticated){
    this.okAuth.getUser().then(
      (res: any)=>{
        this.fullName=res.name as string
      }
    )
  }
}

logout(){
  this.okAuth.signOut();
}

}
