import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/env';
import { User } from '../../Entities/User/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http:HttpClient) { }

  baseUrl:string=environment.sciNetBase;
  public user!:User | null;
  
  register(value:User):Observable<any>{
    let param=new HttpParams();
    param=param.append("useCookies", true);
    return this.http.post<User>(`${this.baseUrl}/account/register`,value);
  }

  //how to get user entity from response entity
  login(value:User):Observable<any>{
    let param=new HttpParams();
    param=param.append("useCookies", true);
    return this.http.post<User>(`${this.baseUrl}/account/login`, value, /*{param, withCredentials:true}*/);
  }


}
