import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../../Entities/Purchase/purchase';
import { Observable , map} from 'rxjs';
import { PurchaceResponse } from '../../Entities/Purchase_Response/purchace-response';
import { environment } from '../../../environments/env';
import { PaymentInfoDTO } from '../../DTOs/payment-info-dto';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService {
  private baseUrl:string=environment.sciNetBase+"/checkout";
  private paymentIntent:string=this.baseUrl+"/payment_intent";

  constructor(private client:HttpClient) {


   }

 public purchase(p:Purchase):Observable<string>{
  console.log(p.order.total_price);
  return this.client.post<PurchaceResponse>(`${this.baseUrl}/purchase`, p).pipe(map(data=>data.order_tracking_number));
 }

 public createPaymentIntent(paymentInfo:PaymentInfoDTO):Observable<any>{
 
  return this.client.post<PaymentInfoDTO>(this.paymentIntent,paymentInfo);
 }

}
