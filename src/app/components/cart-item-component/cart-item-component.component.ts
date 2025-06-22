import { Component, Inject, Input, OnInit } from '@angular/core';
import { Book } from '../../Entities/Book/book';
import { ServiceService } from '../../Services/BookService/service.service';
import { OrderItem } from '../../Entities/Order_Item/order-item';
import { Cart } from '../../Entities/Cart/cart';
import { Router, RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Services/CartService/cart.service';

@Component({
  selector: 'app-cart-item-component',
  imports: [RouterModule, MatIcon, CommonModule],
  templateUrl: './cart-item-component.component.html',
  styleUrl: './cart-item-component.component.css'
})
export class CartItemComponentComponent implements OnInit{

  @Input() public bookId:number=0;
  public order!:Cart;
  constructor(private bservice:ServiceService, private cserve:CartService, private route:Router ){}

ngOnInit(): void {
  this.bservice.getBookService(this.bookId).subscribe(cbook=>{
    let hld=this.cserve.getCart().find((c)=>c.id===this.bookId)
    if(!(hld==null)){
    this.order=hld;
    }
    
  });
}

inc(item:Cart){
  item.quantity+=1;
  item.disableBtn=false;
  this.cserve.persistItems();
}
dec(item:Cart){
  if(item.quantity > 1){
  item.quantity--;
  this.cserve.persistItems();
item.disableBtn=false;
  }


}

updateTotal(item:Cart):void{
item.disableBtn=true;
}

deleteItem(item?:Cart){
let i:number=this.cserve.getCart().findIndex((c)=>c.id===item?.id);
this.cserve.getCart().splice(i,1);
this.route.navigateByUrl("/cart-details")
this.cserve.persistItems();
//load cart deteail with url


}

}
