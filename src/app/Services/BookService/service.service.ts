import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../Entities/Book/book';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl:string="http://localhost:8080/bookapi/getbooks";
  private catUrl:string="http://localhost:8080/bookapi/getbooksbysubjectid";

  constructor(private httpClient:HttpClient) { }

  public  getService():Observable<Book[]>;
  public getService(catNum:number):Observable<Book[]>;
  
  

  
   getService(catNum?:number):Observable<Book[]>{
    if(catNum!==null && catNum!==undefined){
    return this.httpClient.get<Book[]>(`${this.catUrl}?id=${catNum}`);
   }

    return this.httpClient.get<Book[]>(this.baseUrl);
   }
  

  
}

interface Response{
    books:Book[];
}
