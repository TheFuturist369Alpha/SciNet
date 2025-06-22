import { Injectable, OnDestroy } from '@angular/core';
import { Book } from '../../Entities/Book/book';
import { Cart } from '../../Entities/Cart/cart';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
public books:Cart[]=[];
public totalQuant:BehaviorSubject<number>=new BehaviorSubject<number>(0);
public totalPrice:BehaviorSubject<number>=new BehaviorSubject<number>(0);

  constructor() {
    let data=null;
if (typeof window !== "undefined") 
      data=JSON.parse(sessionStorage.getItem('books')!);

      if(data!=null)
        this.books=data;
      this.computeTotal();
      


      
   }

   public getCart():Cart[]{
    return this.books;
   }

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
     this.persistItems();
    //console.log(`Total:price${totalPrice}`);
  }

  public persistItems():void{
    if (typeof window !== "undefined") 
    sessionStorage.setItem('books', JSON.stringify(this.books));
  }

  
}
