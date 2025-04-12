import { Book } from "../Book/book";
import { Cart } from "../Cart/cart";
import { Order } from "../Order/order";

export class OrderItem {
    quantity:number=0;
    book!:Book;
    Order!:Order;

    constructor(cart:Cart){
        this.quantity=cart.quantity;
        this.book.id=cart.id;
        

    }
}
