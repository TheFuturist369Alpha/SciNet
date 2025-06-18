import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from '../../Entities/Book/book';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/env';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private baseUrl1:string=environment.sciNetBase;
  

  constructor(private httpClient:HttpClient) { }
  
   getListService(catNum?:number):Observable<Book[]>{
    return this.httpClient.get<Book[]>(`${this.baseUrl1}/bookapi/getbooks`);
   }

   getListBySubject(ids:number[]):Observable<Book[]>{
      let params=new HttpParams();
      ids.forEach(id=>params=params.append("id",id));
    return this.httpClient.get<Book[]>(`${this.baseUrl1}/bookapi/getbooksbysubjectid`,{params});
   
   }


   getSearchService(data:string):Observable<Book[]>{
    return this.httpClient.get<Response>(`${this.baseUrl1}/books/search/findByNameContaining?name=${data}`)
    .pipe(map(data=>data._embedded.books));
   }


   getBookService(id:number):Observable<Book>{
    return this.httpClient.get<Book>(`${this.baseUrl1}/bookapi/getbook?id=${id}`);
   }
    


   getBooksPaginated(pageNum:number, size:number, catId?:number):Observable<BooksPaginated>{


    let url:string="";
    if(catId==null || catId==undefined){
        url=`${this.baseUrl1}/books?size=${size}&page=${pageNum}`;
    }
    
    else{
     url=`${this.baseUrl1}/books/search/byId?id=${catId}&size=${size}&page=${pageNum}`;
    }

    return this.httpClient.get<BooksPaginated>(url);

   }

   

   }
  
  

  


interface Response{
    _embedded:{
      books:Book[]
    }
}


interface BooksPaginated{
      _embedded:{
        books:Book[];
      };

      page:{
        size:number;
        totalElements:number;
        totalPages:number;
        number:number;
      };
}
