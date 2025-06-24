import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Router } from 'express';
import { CartService } from '../../Services/CartService/cart.service';

@Component({
  selector: 'app-order-summary',
  imports: [MatButton, RouterModule, MatFormField, MatLabel, MatInput],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
 public totalPrice:number=0;
  public itemQuantity:number=0;

constructor(private router:ActivatedRoute, private service:CartService){

}

ngOnInit(): void {
  this.loadTotal();
}

loadTotal():void{
this.service.totalPrice.subscribe(data=>{this.totalPrice=data});
this.service.totalQuant.subscribe(data=>{this.itemQuantity=data});


}
}
