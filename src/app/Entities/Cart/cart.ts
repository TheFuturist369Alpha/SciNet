import { Book } from "../Book/book";

export class Cart {

    public id:number=0;
    public name:string="";
    public image_url="";
    public price:number=0;
    public quantity:number=1;
    public disableBtn:boolean=false;

    constructor(book:Book){
        this.id=book.id;
        this.name=book.name;
        this.image_url=book.image_url;
        this.price=book.price;

    
    }


}
