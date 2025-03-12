import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from '../../../Entities/Cart/cart';
import { CartService } from '../../../Services/CartService/cart.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-cartdetail',
  imports: [NgFor, CommonModule],
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
  this.loadTotal();
}

loadTotal():void{
this.service.totalPrice.subscribe(data=>{
  this.totalPrice=data;
});

this.itemQuantity=this.cartItems.length;

this.cartItems=this.service.books;
}

}
