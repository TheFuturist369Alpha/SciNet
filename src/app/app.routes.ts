import { Routes } from '@angular/router';
import { BookListComponent } from './components/Book-list/book-list.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { CartdetailComponent } from './components/cart-detail/cartdetail/cartdetail.component';
import { CheckOutComponent } from './components/check-out/check-out.component';

export const routes: Routes = [
    {path:"category/:id", component: BookListComponent},
    {path:"book/:id", component: BookDetailComponent},
    {path: "checkout", component: CheckOutComponent},
    {path:"category", component:BookListComponent},
    {path:"cart-details", component:CartdetailComponent},
    {path:"books", component:BookListComponent},
    {path:"search/:keyword", component:BookListComponent},
    {path:"", redirectTo:"/books", pathMatch:"full"},
    {path:"**", redirectTo:"/books", pathMatch:"full"}
];
