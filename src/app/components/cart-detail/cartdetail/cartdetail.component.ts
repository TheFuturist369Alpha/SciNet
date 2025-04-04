import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Cart } from '../../../Entities/Cart/cart';
import { CartService } from '../../../Services/CartService/cart.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-cartdetail',
  imports: [NgFor, CommonModule, RouterModule],
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

inc(item:Cart){
  item.quantity++;
  item.disableBtn=false;
}
dec(item:Cart){
  if(item.quantity > 1){
  item.quantity--;
item.disableBtn=false;
  }
else{}

}

updateTotal(item:Cart):void{
this.loadTotal();
item.disableBtn=true;
}

deleteItem(item:Cart){
let i:number=this.cartItems.findIndex((c)=>c===item);
this.cartItems.splice(i,1);
this.loadTotal();

}

}
