import { Routes } from '@angular/router';
import { BookListComponent } from './Book-list/book-list.component';

export const routes: Routes = [
    {path:"category/:id", component: BookListComponent},
    {path:"category", component:BookListComponent},
    {path:"books", component:BookListComponent},
    {path:"", redirectTo:"/books", pathMatch:"full"},
    {path:"**", redirectTo:"/books", pathMatch:"full"}
];
