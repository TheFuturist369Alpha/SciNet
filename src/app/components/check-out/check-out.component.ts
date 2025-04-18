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
import { PurchaseService } from '../../Services/PurchaseService/purchase.service';
import { Purchase } from '../../Entities/Purchase/purchase';
import { User } from '../../Entities/User/user';
import { OrderItem } from '../../Entities/Order_Item/order-item';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from '../../Entities/Order/order';

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
  private cService:CheckOutService, private csService:CountryStateService, private pservice:PurchaseService, 
      private router:Router){}

  get firstName(){ return this.formGroup.get("customer.firstName"); }
  get lastName(){ return this.formGroup.get("customer.lastName"); }
  get email(){ return this.formGroup.get("customer.email"); }
  get password(){ return this.formGroup.get("customer.password"); }
  get street(){ return this.formGroup.get("shippingAddress.street"); }
  get state(){ return this.formGroup.get("shippingAddress.state"); }
  get country(){ return this.formGroup.get("shippingAddress.country"); }
  get zipCode(){ return this.formGroup.get("shippingAddress.zipCode"); }
  get cardType(){ return this.formGroup.get("creditCard.cardType"); }
  get cardHolder(){ return this.formGroup.get("creditCard.cardHolder"); }
  get cardNumber(){ return this.formGroup.get("creditCard.cardNumber"); }
  get securityCode(){ return this.formGroup.get("creditCard.securityCode"); }
  get expiryMonth(){ return this.formGroup.get("creditCard.expiryMonth"); }
  get expiryYear(){ return this.formGroup.get("creditCard.expiryYear"); }

ngOnInit(): void {
  this.formGroup=this.builder.group({
    customer:this.builder.group({
      firstName:new FormControl("", [Validators.required, Validators.minLength(2), CustomValidotors.checkOnlyWhitespace]),
      lastName:new FormControl("", [Validators.required, Validators.minLength(2), CustomValidotors.checkOnlyWhitespace]),
      email:new FormControl("", [Validators.required,
         Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),CustomValidotors.checkOnlyWhitespace],
        ),
        password:new FormControl("", [Validators.required,CustomValidotors.checkOnlyWhitespace, Validators.minLength(8)],
         )
    }),

    shippingAddress:this.builder.group({
      street:new FormControl("", [Validators.required, Validators.minLength(3), CustomValidotors.checkOnlyWhitespace]),
      state:new FormControl("", [Validators.required]),
      country:new FormControl("", [Validators.required]),
      zipCode:new FormControl("", [Validators.required, Validators.minLength(3), CustomValidotors.checkOnlyWhitespace])

      
    }),

    creditCard:this.builder.group({
      cardType:new FormControl("", [Validators.required]),
      cardHolder:new FormControl("", [Validators.required, Validators.minLength(3), CustomValidotors.checkOnlyWhitespace]),
      cardNumber:new FormControl("", [Validators.required, Validators.minLength(16), Validators.maxLength(16), Validators.pattern("^[0-9]+$"),CustomValidotors.checkOnlyWhitespace]),
      securityCode:new FormControl("", [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern("^[0-9]+$"), CustomValidotors.checkOnlyWhitespace]),
      expiryMonth:new FormControl("", [Validators.required]),
      expiryYear:new FormControl("", [Validators.required])
    })
  });
  
  this.getCountryState();
  this.populateMonthsAndYears(new Date().getMonth()+1);
  this.reviewOrder();
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

makeOrder():void{
if(this.formGroup.invalid){
  this.formGroup.markAllAsTouched();
  console.log("Form invalid");
  console.log(this.formGroup.errors);
  return;
  }

  console.log("make order called; not inside pusrchase service.");
  let purchase=new Purchase();
  purchase.user.firstName= this.formGroup.get("customer")?.value.firstName;
  purchase.user.lastName= this.formGroup.get("customer")?.value.lastName;
  purchase.user.email= this.formGroup.get("customer")?.value.email;
  purchase.user.password= this.formGroup.get("customer")?.value.password;
  purchase.user.image="blablah";
  purchase.order.total_quantity=this.totalQuantity;
  purchase.order.total_Price=this.totalPrice;
  purchase.order.status="ORDER MADE. TRANSACTION IN PROGRESS.";
  purchase.order.address.city=this.formGroup.get("shippingAddress")?.value.state;
  purchase.order.address.street=this.formGroup.get("shippingAddress")?.value.street;
  purchase.order.address.country=this.formGroup.get("shippingAddress")?.value.country;
  purchase.order.address.zip_code=this.formGroup.get("shippingAddress")?.value.zipCode;
let i=0;
  for( let cart of this.books){
      purchase.items[i]=new OrderItem(cart);
      i++;
  }
  
  this.pservice.purchase(purchase).subscribe({
    next:data=>{
      console.log("Make order called");
      alert(`Order tracking code:${data}`);
      this.resetForm();
    },
    error:err=>{
   alert(`ERROR: ${err.message}`);
    }
  });
}

private resetForm():void{
  this.service.books=[];
  this.service.totalPrice.next(0);
  this.service.totalQuant.next(0);
  this.formGroup.reset();
  this.router.navigateByUrl("/books");

}





}
