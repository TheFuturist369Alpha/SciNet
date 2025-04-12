import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../../Entities/Purchase/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl:string="http://localhost:8080/checkout";

  constructor(private client:HttpClient) {


   }

 public purchase(p:Purchase):Observable<any>{
  return this.client.post<Purchase>(`${this.baseUrl}/purchase/${p}`, p);
 }

}
