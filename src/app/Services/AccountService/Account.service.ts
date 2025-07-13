import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/env';
import { User } from '../../Entities/User/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  baseUrl:string=environment.sciNetBase;
  
  register(value:User):Observable<any>{
    let param=new HttpParams();
    param=param.append("useCookies", true);
    return this.http.post<User>(`${this.baseUrl}/account/register`,value);
  }

  login(value:User):Observable<any>{
    return this.http.post<User>(`${this.baseUrl}/account/login`, value);
  }


}
