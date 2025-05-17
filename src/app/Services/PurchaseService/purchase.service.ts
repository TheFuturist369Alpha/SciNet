import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../../Entities/Purchase/purchase';
import { Observable , map} from 'rxjs';
import { PurchaceResponse } from '../../Entities/Purchase_Response/purchace-response';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl:string="https://localhost:8400/api/checkout";

  constructor(private client:HttpClient) {


   }

 public purchase(p:Purchase):Observable<string>{
  console.log(p.order.total_price);
  return this.client.post<PurchaceResponse>(`${this.baseUrl}/purchase`, p).pipe(map(data=>data.order_tracking_number));
 }

}
