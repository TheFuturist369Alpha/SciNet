import { Component, inject, OnInit } from '@angular/core';
import { Subject } from '../../Entities/Subject/subject';
import { SubjectService } from '../../Services/SubjectService/subject.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatDivider} from '@angular/material/divider';
import {MatSelectionList, MatListOption} from '@angular/material/list';
import {MatCheckbox} from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-menu-list',
  imports: [CommonModule, FormsModule, RouterModule, MatDivider, MatSelectionList, MatListOption, MatCheckbox, MatDialogContent],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css'
})
export class MenuListComponent implements OnInit {
public subjects:Subject[]=[];
public sub:Subject[][]=[[],[]];
private dialogRef=inject(MatDialogRef<MenuListComponent>);
data=inject(MAT_DIALOG_DATA);
bookNums:number[]=this.data.bookNums
selectedMap: { [key: number]: boolean } = {};

constructor(private service:SubjectService){}

ngOnInit(): void {
  this.service.getSubjects().subscribe(data=>{
    console.log(data);
    this.subjects=data; 

    let i:number=0; let j:number=0; let k:number=0;
    
    while(k<this.subjects.length){
      
      this.sub[j++][i]=this.subjects[k];
      if(k==this.subjects.length-1)
        break;
      else
      this.sub[j--][i]=this.subjects[++k];
      i+=1; k++;
    }
    console.log(this.sub);
    }
  );
    
  }


  applyFilter(){
    const selectedSubjectIds = Object.entries(this.selectedMap)
    .filter(([_, checked]) => checked)
    .map(([id, _]) => +id);
  this.dialogRef.close({
    bookNums:this.bookNums,
    selectedSubjects:selectedSubjectIds
  })

 
}
}





