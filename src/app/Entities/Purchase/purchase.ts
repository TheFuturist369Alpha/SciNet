import { Order } from "../Order/order";
import { OrderItem } from "../Order_Item/order-item";
import { User } from "../User/user";

export class Purchase {

    user!:User;
    order!:Order;
    items:OrderItem[]=[];
}
