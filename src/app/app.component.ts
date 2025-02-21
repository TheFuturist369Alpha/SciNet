import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { BookListComponent } from './components/Book-list/book-list.component';
import { MenuListComponent } from "./components/menu-list/menu-list.component";
import { SearchComponent } from "./components/search/search.component";

@Component({
  selector: 'app-root',
  imports: [RouterModule, RouterOutlet, BookListComponent, MenuListComponent, MenuListComponent, SearchComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SciNet_Face';
}
