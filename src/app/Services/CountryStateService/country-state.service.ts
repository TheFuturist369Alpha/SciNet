import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../../Entities/Country/country';
import { State } from '../../Entities/State/state';

@Injectable({
  providedIn: 'root'
})
export class CountryStateService {

  constructor(private client:HttpClient) { }

  public getCountries():Observable<Country[]>{

    return this.client.get<GetResponseCountries>("http://localhost:8080/countries").pipe(map(data=>data._embedded.countries));
  }

  public getStates(code:string):Observable<State[]>{
    return this.client.get<GetResponseStates>(`http://localhost:8080/states/search/findByCountryCode?code=${code}`).pipe(map(data=>data._embedded.states));
  }


}

interface GetResponseCountries{
   _embedded:{
    countries:Country[]
  }
}

interface GetResponseStates{
  _embedded:{
   states:State[]
 }
}
