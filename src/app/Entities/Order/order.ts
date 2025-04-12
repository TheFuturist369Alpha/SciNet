import { Address } from "../Address/address";
import { User } from "../User/user";

export class Order {
    tracking_Code:string="";
    total_Price:number=0;
    total_quantity:number=0;
    user!:User;
    address!:Address;
    status:string="";


}
