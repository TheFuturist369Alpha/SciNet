import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{Subject} from '../../Entities/Subject/subject';
import { environment } from '../../../environments/env';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseUrl:string= environment.sciNetBase+"/subjectapi";
  constructor(private client:HttpClient) { }


public getSubjects():Observable<Subject[]>{
 return this.client.get<Subject[]>(`${this.baseUrl}/getsubjects`);

}

}
