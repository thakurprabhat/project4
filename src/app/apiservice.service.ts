import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiserviceService {

  subject$ = new Subject<any>()
  baseURL: string = "https://reqres.in/api/";

  constructor(private http: HttpClient) { }


  addRecord(data:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(data);
    return this.http.post(this.baseURL + 'users', body,{'headers':headers})
  }

  deleteRecord(id:number) {
    // id ="416"
    return this.http.delete(this.baseURL + 'users/'+ id);
  }

  updateData(data:any) {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(data);
    return this.http.put(this.baseURL + 'users/'+"183", body,{'headers':headers})
  }

  fetchUserById(id:number) {
    return this.http.get(this.baseURL + 'users/'+ id);
  }

  getRecordByPagination(PageNo:number) {
    const params = new HttpParams().set('page', PageNo);
    return this.http.get<any>(this.baseURL + 'users/',{params})
  }
}
