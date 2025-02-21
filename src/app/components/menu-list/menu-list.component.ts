import { Component, OnInit } from '@angular/core';
import { Subject } from '../../Entities/Subject/subject';
import { SubjectService } from '../../Services/SubjectService/subject.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-menu-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnInit {
public subjects:Subject[]=[];

constructor(private service:SubjectService){}

ngOnInit(): void {
  this.service.getSubjects().subscribe(data=>{
    console.log(data);
    this.subjects=data;});
}




}
