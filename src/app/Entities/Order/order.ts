import { Address } from "../Address/address";
import { Cart } from "../Cart/cart";
import { User } from "../User/user";

export class Order {
    tracking_Code:string="";
    total_Price:number=0;
    total_quantity:number=0;
    address:Address=new Address();
    status:string="";

   


}
