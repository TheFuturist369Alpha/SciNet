import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [FormsModule, MatIcon],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  {
  public keyword:string=""
public constructor(private router:Router ){}

public doSearch():void{

  if(this.keyword==""){
    this.router.navigateByUrl("/books");
  }
else{
  this.router.navigateByUrl("/search/"+this.keyword);
  
  
}
}

}
