import { DatePipe } from '@angular/common';
import {Subject} from '../Subject/subject';
import { User } from '../User/user';

export class Book {
    public id:number=0; public name:string=""; public description:string="";
    public price:number=0; public image_url:string=""; public available:boolean=false;
    public date_launched:string=""; public subject:Subject=new Subject(); public user:User=new User(); public selected:boolean=false;

                
}
