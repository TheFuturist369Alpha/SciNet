import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BookListComponent } from './components/Book-list/book-list.component';
import { MenuListComponent } from "./components/menu-list/menu-list.component";
import { SearchComponent } from "./components/search/search.component";
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
//import { LoginButtonComponent } from './components/login-button/login-button.component';

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, MenuListComponent, SearchComponent,
     CartStatusComponent, UserProfileComponent /*LoginButtonComponent*/],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SciNet_Face';
}
