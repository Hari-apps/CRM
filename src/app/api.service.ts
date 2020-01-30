import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseURL: string = "http://192.168.5.163:9085/user-service/license/user/1/0";

  


  login(credentials): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.baseURL}/login`, credentials);

  }

  createUser(data) {
    console.log(data);
    return this.http.post(`${this.baseURL}/createUser`, data);
  }

  updateUser(data:any, id) {  
    return this.http.put(`${this.baseURL}/updateProfile`, {data,id});

  }

  userStatus(data){ 
    return this.http.post(`${this.baseURL}/updateStatus/`,data);
    
  }

  userList() {
    return this.http.get(`${this.baseURL}/findAllUsers`); 
  }

// for future search
  // userList() {
  //   return this.http.post(`${this.baseURL}/getProfile`, {}); 
  // }
  getRegions() {
    return this.http.get('http://192.168.5.163:9083/core-service/crm/core/1/0/getRegions');
  }

  getVerticals() {
    return this.http.get('http://192.168.5.163:9083/core-service/crm/core/1/0/getVerticals');
  }

  getRoles() {
    return this.http.get('http://192.168.5.163:9085/user-service/license/user/1/0/getRolesToMap');
  }

}
