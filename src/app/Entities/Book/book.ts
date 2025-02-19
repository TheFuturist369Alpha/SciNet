import { DatePipe } from '@angular/common';
import {Subject} from '../Subject/subject';

export class Book {
    constructor(public id:number, public name:string, public description:string,
                public price:number, public image_url:string, public available:boolean,
                public date_launched:string, public subject:Subject ){
                    
                }

                public dateToString:string="";
}
