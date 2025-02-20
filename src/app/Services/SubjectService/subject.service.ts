import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import{Subject} from '../../Entities/Subject/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  private baseUrl:string="http://localhost:8080/subjectapi";
  constructor(private client:HttpClient) { }


public getSubjects():Observable<Subject[]>{
 return this.client.get<Subject[]>(`${this.baseUrl}/getsubjects`);

}

}
