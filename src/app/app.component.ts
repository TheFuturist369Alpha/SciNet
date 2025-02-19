import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BookListComponent } from './Book-list/book-list.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BookListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SciNet_Face';
}
