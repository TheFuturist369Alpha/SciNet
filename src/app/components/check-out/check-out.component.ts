import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-check-out',
  imports: [ReactiveFormsModule],
  templateUrl: './check-out.component.html',
  styleUrl: './check-out.component.css'
})
export class CheckOutComponent implements OnInit {
formGroup!:FormGroup;
constructor(private builder:FormBuilder){}

ngOnInit(): void {
  this.formGroup=this.builder.group({
    customer:this.builder.group({
      firstName:[''],
      lastName:[''],
      email:['']
    })
  })
}

}
