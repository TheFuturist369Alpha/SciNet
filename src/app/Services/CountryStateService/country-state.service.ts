import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from '../../Entities/Country/country';
import { State } from '../../Entities/State/state';
import { environment } from '../../../environments/env';

@Injectable({
  providedIn: 'root'
})
export class CountryStateService {

  constructor(private client:HttpClient) { }

  public getCountries():Observable<Country[]>{

    return this.client.get<GetResponseCountries>(environment.sciNetBase+"/countries").pipe(map(data=>data._embedded.countries));
  }

  public getStates(code:string):Observable<State[]>{
    return this.client.get<GetResponseStates>(`${environment.sciNetBase}/states/search/findByCountryCode?code=${code}`).pipe(map(data=>data._embedded.states));
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
