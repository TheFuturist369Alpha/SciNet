import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatCard } from '@angular/material/card';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { AccountService } from '../../Services/AccountService/Account.service';
import { User } from '../../Entities/User/user';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatCard,
    MatFormField,
    MatInput,
    MatLabel,
    MatButton
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  
public form!:FormGroup
public successful:boolean=false;
  constructor(private service:AccountService, private router:Router, private formBuilder:FormBuilder){}

  ngOnInit(): void {
   this.form=this.formBuilder.group({
    email:new FormControl(""),
    password:new FormControl("")
  })
  }
  

  login():void{
    let user:User=new User();
    user.email=this.form.value.email;
    user.password=this.form.value.password;
    this.service.login(user).subscribe(data=>{
     if(data!=null && data!=undefined)
      this.service.user=data;
      this.router.navigateByUrl("/books")
    })
  }

  
}
