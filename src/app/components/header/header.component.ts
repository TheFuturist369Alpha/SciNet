import { Component } from '@angular/core';
import { CartStatusComponent } from '../cart-status/cart-status.component';
import { AccountButtonsComponent } from '../account-buttons/account-buttons.component';

@Component({
  selector: 'app-header',
  imports: [CartStatusComponent, AccountButtonsComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
