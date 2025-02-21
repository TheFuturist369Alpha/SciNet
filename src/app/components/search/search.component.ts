import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  {
public constructor(private router:Router){}

public doSearch(data:string):void{

  if(data==""){
    this.router.navigateByUrl("/books");
  }
else{
  this.router.navigateByUrl("/search/"+data);
}
}

}
