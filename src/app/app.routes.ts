import { Routes } from '@angular/router';
import { BookListComponent } from './components/Book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

export const routes: Routes = [
    {path:"category/:id", component: BookListComponent},
    {path:"book/:id", component: BookDetailComponent},
    {path:"category", component:BookListComponent},
    {path:"books", component:BookListComponent},
    {path:"search/:keyword", component:BookListComponent},
    {path:"", redirectTo:"/books", pathMatch:"full"},
    {path:"**", redirectTo:"/books", pathMatch:"full"}
];
