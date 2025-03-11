import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../../Services/BookService/service.service';
import { Book } from '../../Entities/Book/book';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../Services/CartService/cart.service';
import { Cart } from '../../Entities/Cart/cart';

@Component({
  selector: 'app-book-detail',
  imports: [],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.css'
})
export class BookDetailComponent implements OnInit {

 
  public book!:Book;
  constructor(private service:ServiceService, private router:ActivatedRoute, 
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
    this.cartService.addToCart(new Cart(book));
  }


}
