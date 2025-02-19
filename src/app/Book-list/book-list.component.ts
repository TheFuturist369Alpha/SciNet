import { Component, NgModule, OnInit } from '@angular/core';
import { Book } from '../Entities/Book/book';
import { ServiceService } from '../Services/BookService/service.service';
import { CommonModule, NgFor } from '@angular/common';
import { Subject } from '../Entities/Subject/subject';

@Component({
  selector: 'book-list',
  imports: [NgFor,CommonModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent implements OnInit {
//public Books:Book[]=[new Book(2,"ksk", "ks", 1, "ks", true,new Date(),new Subject(2,"ks"))];
public Books:Book[]=[];
private baseUrl:string="http://localhost:8080/bookapi/getbooks";

constructor(private service:ServiceService){
}
  
 ngOnInit(): void{
  this.service.getService(this.baseUrl).subscribe(data=>{this.Books=data;});
}

}
