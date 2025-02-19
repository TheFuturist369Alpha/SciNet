import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../Entities/Book/book';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  
  constructor(private httpClient:HttpClient) { }

  public getService(baseurl:string):Observable<Book[]>{
   return this.httpClient.get<Book[]>("http://localhost:8080/bookapi/getbooks");
  }

  
}

interface Response{
    books:Book[];
}
