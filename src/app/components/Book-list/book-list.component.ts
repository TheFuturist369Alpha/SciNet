import { Component, NgModule, OnInit } from '@angular/core';
import { Book } from '../../Entities/Book/book';
import { ServiceService } from '../../Services/BookService/service.service';
import { CommonModule, NgFor } from '@angular/common';
import { Subject } from '../../Entities/Subject/subject';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'book-list',
  imports: [NgFor,CommonModule,RouterModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
//public Books:Book[]=[new Book(2,"ksk", "ks", 1, "ks", true,new Date(),new Subject(2,"ks"))];
public Books:Book[]=[];
private catNum:number=0;
private useSearch:boolean=false;

constructor(private service:ServiceService, public route:ActivatedRoute){
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
    this.service.getListService(this.catNum).subscribe(data=>{this.Books=data;});
    
  }
  else{
    this.service.getListService().subscribe(data=>{this.Books=data;});
  }
}

private fromSearch():void{

   let paramValue:string=this.route.snapshot.paramMap.get("keyword")!;
   this.service.getSearchService(paramValue).subscribe(data=>{this.Books=data;});



}

}
