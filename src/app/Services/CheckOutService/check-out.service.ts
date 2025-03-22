import { Injectable } from '@angular/core';
import {of, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
public years:number[]=[];
public months:number[]=[];
  constructor() { }

  public getCreditCardYears():Observable<number[]>{
    let startYear:number=new Date().getFullYear();
    for(let i:number=startYear; i<=(startYear+10); i+=1 ){
      this.years.push(i);
    }
    return of(this.years);
  }

  public getCreditCardMonths(){
    let startMonth:number=(new Date().getMonth()+1);
    for(let i=startMonth; i<=12; i+=1){
      this.months.push(i);
    }
    return of(this.months);
  }


}
