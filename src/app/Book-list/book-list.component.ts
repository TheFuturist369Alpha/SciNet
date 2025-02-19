import { Component, NgModule, OnInit } from '@angular/core';
import { Book } from '../Entities/Book/book';
import { ServiceService } from '../Services/BookService/service.service';
import { CommonModule, NgFor } from '@angular/common';
import { Subject } from '../Entities/Subject/subject';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'book-list',
  imports: [NgFor,CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
//public Books:Book[]=[new Book(2,"ksk", "ks", 1, "ks", true,new Date(),new Subject(2,"ks"))];
public Books:Book[]=[];
public catNum:number=0;

constructor(private service:ServiceService, public route:ActivatedRoute){
}
  
 ngOnInit(): void{
  this.route.paramMap.subscribe(()=>{this.loadData();});
  
}

loadData():void{

let hasId: boolean =this.route.snapshot.paramMap.has('id');

if(hasId){
  this.catNum=+this.route.snapshot.paramMap.get("id")!;
  this.service.getService(this.catNum).subscribe(data=>{this.Books=data;});
  
}
else{
  this.service.getService().subscribe(data=>{this.Books=data;});
}



  
}

}
