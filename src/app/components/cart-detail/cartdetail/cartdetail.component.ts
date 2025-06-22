import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Cart } from '../../../Entities/Cart/cart';
import { CartService } from '../../../Services/CartService/cart.service';
import { CommonModule, NgFor } from '@angular/common';
import { CartItemComponentComponent } from "../../cart-item-component/cart-item-component.component";

@Component({
  selector: 'app-cartdetail',
  imports: [NgFor, CartItemComponentComponent,CommonModule, RouterModule, CartItemComponentComponent],
  templateUrl: './cartdetail.component.html',
  styleUrl: './cartdetail.component.css'
})
export class CartdetailComponent implements OnInit{

  public cartItems:Cart[]=[];
  public totalPrice:number=0;
  public itemQuantity:number=0;

constructor(private router:ActivatedRoute, private service:CartService){

}

ngOnInit(): void {
  this.router.paramMap.subscribe(()=>{this.loadTotal()});
}

loadTotal():void{
this.service.totalPrice.subscribe(data=>{this.totalPrice=data});

this.service.totalQuant.subscribe(data=>{this.itemQuantity=data});

this.cartItems=this.service.books;

this.service.computeTotal();

}





}
