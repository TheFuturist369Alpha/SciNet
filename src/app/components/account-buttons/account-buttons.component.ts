import { Component, NgModule } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { AccountService } from '../../Services/AccountService/Account.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-account-buttons',
  imports: [MatButton, CommonModule, RouterModule],
  templateUrl: './account-buttons.component.html',
  styleUrl: './account-buttons.component.css'
})
export class AccountButtonsComponent {

  constructor(public service:AccountService){}
  public logout(){
    this.service.user=null;
  }


}
