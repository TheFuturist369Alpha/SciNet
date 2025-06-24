import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../Services/BookService/service.service';
import { Book } from '../../Entities/Book/book';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Services/CartService/cart.service';
import { Cart } from '../../Entities/Cart/cart';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDivider } from '@angular/material/divider';
import { MatCard, MatCardActions } from '@angular/material/card';

@Component({
  selector: 'app-book-detail',
  imports: [CommonModule, MatButton,MatCard, MatCardActions, MatIcon, MatFormField, MatInput, MatLabel, MatDivider],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {

 
  public book!:Book;
  constructor(private service:ServiceService, private route:Router,private router:ActivatedRoute, 
    private cartService:CartService){}

  ngOnInit(): void {
    this.router.paramMap.subscribe(()=>{this.loadBook()});
    
  }

  loadBook():void{
    let num:number=0;
    if(this.router.snapshot.paramMap.has("id")){
      num=+this.router.snapshot.paramMap.get("id")!;
      this.service.getBookService(num).subscribe(data=>{this.book=data; console.log(this.book.id)});
    }
  }

  public addToCart(book:Book):void{
    this.book.selected=true;
    this.cartService.addToCart(new Cart(book));
  }

  public redirectToCartDetails(){
        this.route.navigateByUrl("/cart-details");
    }

}
