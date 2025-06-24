import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Cart } from '../../../Entities/Cart/cart';
import { CartService } from '../../../Services/CartService/cart.service';
import { CommonModule, NgFor } from '@angular/common';
import { CartItemComponentComponent } from "../../cart-item-component/cart-item-component.component";
import { OrderSummaryComponent } from "../../order-summary/order-summary.component";

@Component({
  selector: 'app-cartdetail',
  imports: [NgFor, CartItemComponentComponent, CommonModule, RouterModule, CartItemComponentComponent, OrderSummaryComponent],
  templateUrl: './cartdetail.component.html',
  styleUrl: './cartdetail.component.css'
})
export class CartdetailComponent implements OnInit{

  public cartItems:Cart[]=[];

constructor(private router:ActivatedRoute, private service:CartService){

}

ngOnInit(): void {
  this.router.paramMap.subscribe(()=>{this.cartItems=this.service.getCart();});
}







}
