import { Injectable } from '@angular/core';
import { Book } from '../../Entities/Book/book';
import { Cart } from '../../Entities/Cart/cart';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
public books:Cart[]=[];
public totalQuant:Subject<number>=new Subject<number>();
public totalPrice:Subject<number>=new Subject<number>();

  constructor() { }

  public addToCart(book:Cart){
    let exists:boolean=false;
    let bk:Cart=this.books.find(temp=>temp.id===book.id)!;

        if(bk!=null && bk!=undefined){
          bk.quantity++;
        }
        else{
          this.books.push(book);

        }
    
  this.computeTotal();
    
  }

  public computeTotal():void{
    let totalQuantity=0;
    let totalPrice=0;
    for(let b of this.books){
        totalPrice+=b.price*b.quantity;
        totalQuantity+=b.quantity;
    }

      this.totalPrice.next(totalPrice);
      this.totalQuant.next(totalQuantity);
    
    //console.log(`Total:price${totalPrice}`);
  }
}
