import { Component, NgModule, OnInit } from '@angular/core';
import { Book } from '../../Entities/Book/book';
import { ServiceService } from '../../Services/BookService/service.service';
import { CommonModule, NgFor } from '@angular/common';
import { Subject } from '../../Entities/Subject/subject';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Cart } from '../../Entities/Cart/cart';
import { CartService } from '../../Services/CartService/cart.service';
import {MatCard, MatCardActions, MatCardContent} from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MenuListComponent } from '../menu-list/menu-list.component';
import { FormsModule} from '@angular/forms';
import { SearchComponent } from "../search/search.component";

@Component({
  selector: 'book-list',
  imports: [NgFor, CommonModule, RouterModule, NgbModule, MatCard,
    MatCardContent, MatButton, MatPaginator, MatTooltip, MatCardActions, MatIcon, FormsModule, SearchComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
//public Books:Book[]=[new Book(2,"ksk", "ks", 1, "ks", true,new Date(),new Subject(2,"ks"))];
public Books:Book[]=[];
public selectedBooks:Book[]=[];
public catNum:number=0;
public useSearch:boolean=false;
public pageNum:number=0;
public pageSize:number=10;
public pageSizeOptions:number[]=[10, 20, 30]
public totalElements=0;
private previousCat:number=0;
public bookNums:number[]=[];
public keyword:string="";

constructor(private service:ServiceService, public route:ActivatedRoute, private cartService:CartService, 
  private dialogue:MatDialog){
}




  
 ngOnInit(): void{
  this.route.paramMap.subscribe(()=>{ this.loadData();});
  
}



public loadData():void{
  this.useSearch=this.route.snapshot.paramMap.has("keyword");
  console.log(this.useSearch)
  console.log('Param keys:', this.route.snapshot.paramMap.keys);
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
    this.service.getBooksPaginated(this.pageNum, this.pageSize, this.catNum)
    .subscribe(data=>{this.pageNum=data.page.number+1;
                     this.pageSize=data.page.size;
                     this.Books=data._embedded.books;
                     this.totalElements=data.page.totalElements;
    });
    
  }
  else{
    this.service.getBooksPaginated(this.pageNum, this.pageSize).subscribe(data=>{
      this.pageNum=data.page.number;
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

public fromSearch():void{
  const param:string|null=this.route.snapshot.paramMap.get("keyword");
  console.log(param);
  if(param!=null)
   this.service.getSearchService(param).subscribe(data=>{this.Books=data;});
  this.pageNum=0;

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

public openDialog(){
  const dialogRef=this.dialogue.open(MenuListComponent,{
    maxWidth:"90vw",
    width:"370px",
    height:"400px",
    data:{
      bookNums:this.bookNums
    }
    
   
  });

  dialogRef.afterClosed().subscribe({
    next:result=>{
      if(result && result.selectedSubjects){
        this.pageNum=0;
        this.bookNums=result.selectedSubjects;
      }
      this.service.getListBySubject(this.bookNums).subscribe(data=>{this.Books=data;})
    }
  });
}
handlePaginator(event:PageEvent){
  this.pageNum=event.pageIndex;
  this.pageSize=event.pageSize;
  this.fromList();

}



}
