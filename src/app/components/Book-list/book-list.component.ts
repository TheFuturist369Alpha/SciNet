import { Component, NgModule, OnInit } from '@angular/core';
import { Book } from '../../Entities/Book/book';
import { ServiceService } from '../../Services/BookService/service.service';
import { CommonModule, NgFor } from '@angular/common';
import { Subject } from '../../Entities/Subject/subject';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Cart } from '../../Entities/Cart/cart';
import { CartService } from '../../Services/CartService/cart.service';

@Component({
  selector: 'book-list',
  imports: [NgFor,CommonModule,RouterModule,NgbModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
//public Books:Book[]=[new Book(2,"ksk", "ks", 1, "ks", true,new Date(),new Subject(2,"ks"))];
public Books:Book[]=[];
public selectedBooks:Book[]=[];
public catNum:number=0;
public useSearch:boolean=false;
public pageNum:number=1;
public pageSize:number=8;
public totalElements=0;
private previousCat:number=0;

constructor(private service:ServiceService, public route:ActivatedRoute, private cartService:CartService){
}




  
 ngOnInit(): void{
  this.route.paramMap.subscribe(()=>{this.loadData();});
  
}



public loadData():void{
  this.useSearch=this.route.snapshot.paramMap.has("keyword");
  if(this.useSearch){
    this.fromSearch();
  }
  else{
this.fromList();
  }
  
}


private fromList():void{
  let hasId: boolean =this.route.snapshot.paramMap.has('id');

  if(hasId){
    this.catNum=+this.route.snapshot.paramMap.get("id")!;
    this.service.getBooksPaginated(this.pageNum-1, this.pageSize, this.catNum)
    .subscribe(data=>{this.pageNum=data.page.number+1
                     this.pageSize=data.page.size;
                     this.Books=data._embedded.books;
                     this.totalElements=data.page.totalElements;
    });
    
  }
  else{
    this.service.getBooksPaginated(this.pageNum-1, this.pageSize).subscribe(data=>{
      this.pageNum=data.page.number+1
                     this.pageSize=data.page.size;
                     this.Books=data._embedded.books;
                     this.totalElements=data.page.totalElements;
    });
  }

if(this.catNum!=this.previousCat){
  this.pageNum=1;
  this.previousCat=this.catNum;
}

}

private fromSearch():void{

   let paramValue:string=this.route.snapshot.paramMap.get("keyword")!;
   this.service.getSearchService(paramValue).subscribe(data=>{this.Books=data;});



}

public updatePageSize(value: string):void{
this.pageSize=+value;
this.pageNum=1;
this.loadData();
}


public addToCart(book:Book):void{

  let cart:Cart=new Cart(book);
  this.cartService.addToCart(cart);

 console.log(`Added ${book.name} to cart`);
}

}
