import { Component, NgModule, OnInit } from '@angular/core';
import { CartService } from '../../Services/CartService/cart.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-status',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-status.component.html',
  styleUrl: './cart-status.component.css'
})
export class CartStatusComponent implements OnInit {

  public totalPrice:number=0;
  public totalQuantity:number=0
    constructor(private service:CartService, private router:Router){
  
    }

    ngOnInit(): void {
      this.getCartDetails(); 
    }

    public getCartDetails():void{
      this.service.totalPrice.subscribe(data=>{this.totalPrice=data});
      this.service.totalQuant.subscribe(data=>{this.totalQuantity=data});
    }

    public redirectToCartDetails(){
        this.router.navigateByUrl("/cart-details");
    }
}
