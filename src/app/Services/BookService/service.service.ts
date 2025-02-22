import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../Entities/Book/book';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl1:string="http://localhost:8080";
  

  constructor(private httpClient:HttpClient) { }

  public  getListService():Observable<Book[]>;
  public getListService(catNum:number):Observable<Book[]>;
  
  

  
   getListService(catNum?:number):Observable<Book[]>{
    if(catNum!==null && catNum!==undefined){
    return this.httpClient.get<Book[]>(`${this.baseUrl1}/bookapi/getbooksbysubjectid?id=${catNum}`);
   }

    return this.httpClient.get<Book[]>(`${this.baseUrl1}/bookapi/getbooks`);
   }


   getSearchService(data:string):Observable<Book[]>{
    return this.httpClient.get<Response>(`${this.baseUrl1}/books/search/findByNameContaining?name=${data}`)
    .pipe(map(data=>data._embedded.books));
   }


   getBookService(id:number):Observable<Book>{
    return this.httpClient.get<Book>(`${this.baseUrl1}/bookapi/getbook?id=${id}`);
   }
  

  
}

interface Response{
    _embedded:{
      books:Book[]
    }
}
