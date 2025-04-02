import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../Services/CartService/cart.service';
import { Book } from '../../Entities/Book/book';
import { Cart } from '../../Entities/Cart/cart';
import { CommonModule, NgFor } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CheckOutService } from '../../Services/CheckOutService/check-out.service';
import { Country } from '../../Entities/Country/country';
import { CountryStateService } from '../../Services/CountryStateService/country-state.service';
import { State } from '../../Entities/State/state';
import { CustomValidotors } from '../../Utils/custom-validators';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule, CommonModule, NgbModule, NgFor],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit {
  public totalQuantity:number=0;
  public totalPrice:number=0;
  public books:Cart[]=[];
  public years:number[]=[];
  public months:number[]=[];
  public countries:Country[]=[];
  public states:State[]=[];
  
formGroup!:FormGroup;
constructor(private builder:FormBuilder, private service:CartService, 
  private cService:CheckOutService, private csService:CountryStateService){}

  get firstName(){ return this.formGroup.get("customer.firstName"); }
  get lastName(){ return this.formGroup.get("customer.lastName"); }
  get email(){ return this.formGroup.get("customer.email"); }

ngOnInit(): void {
  this.formGroup=this.builder.group({
    customer:this.builder.group({
      firstName:new FormControl("", [Validators.required, Validators.minLength(2), CustomValidotors.checkOnlyWhitespace]),
      lastName:new FormControl("", [Validators.required, Validators.minLength(2), CustomValidotors.checkOnlyWhitespace]),
      email:new FormControl("", [Validators.required,
         Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2-4}$"),CustomValidotors.checkOnlyWhitespace])
    }),

    shippingAddress:this.builder.group({
      street:[''],
      state:[''],
      country:[''],
      zipCode:['']

      
    }),

    creditCard:this.builder.group({
      cardType:[''],
      cardHolder:[''],
      cardNumber:[''],
      securityCode:[''],
      expiryMonth:[''],
      expiryYear:['']
    })
  });
  
  this.getCountryState();
  this.populateMonthsAndYears(new Date().getMonth()+1);
  this.reviewOrder();
}

onSubmit(){

}

reviewOrder():void{
this.service.totalPrice.subscribe(data=>{
  this.totalPrice=data;
});
this.service.totalQuant.subscribe(data=>{
  this.totalQuantity=data;
}
);
this.books=this.service.books;
}

populateMonthsAndYears(strt:number){
  this.cService.getCreditCardMonths(strt).subscribe(data=>{
    this.months=data;
    console.log(`Months:${JSON.stringify(data)}`);
  });

  this.cService.getCreditCardYears().subscribe(data=>{
    this.years=data;
    console.log(`Years:${JSON.stringify(data)}`);
  });

}

handleMonthsYears(){
  let currentYear:number=new Date().getFullYear();
  let selectedYear:number=Number(this.formGroup.get("creditCard")?.value.expiryYear);
  if(currentYear===selectedYear){
    
    this.populateMonthsAndYears(new Date().getMonth()+1);
  }
  else{
    this.populateMonthsAndYears(1);
  }

}

getCountryState():void{
this.csService.getCountries().subscribe(data=>{
  this.countries=data;
})
}

setState():void{
let code:string= this.formGroup.get("shippingAddress")?.value.country;
this.csService.getStates(code).subscribe(data=>{this.states=data});

}



}
