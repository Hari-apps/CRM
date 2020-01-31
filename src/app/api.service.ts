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
    return this.http.post(`${this.baseURL}/createUser`, data);
  }

  updateUser(data) { 
    return this.http.post(`${this.baseURL}/updateProfile`, data);

  }

  userStatus(data) {
    return this.http.post(`${this.baseURL}/updateStatus/`, data);

  }

  userList() {
    return this.http.get(`${this.baseURL}/findAllUsers`);
  }

  getUserById(data) {
    return this.http.post(`${this.baseURL}/getProfile`, data); 
  }

  getRegions() {
    return this.http.get('http://192.168.5.163:9083/core-service/crm/core/1/0/getRegions');
  }

  getVerticals() {
    return this.http.get('http://192.168.5.163:9083/core-service/crm/core/1/0/getVerticals');
  }

  getRoles() {
    return this.http.get('http://192.168.5.163:9085/user-service/license/user/1/0/getRolesToMap');
  }
  getCountryList() {
    return this.http.get('http://192.168.5.163:9083/core-service/license/core/1/0/getCountryList');
  }

  getStateList(data) { 
    return this.http.post('http://192.168.5.163:9083/core-service/license/core/1/0/getStatesByCountryId', data)
  }

  getCityList(data){
    return this.http.post('http://192.168.5.163:9083/core-service/license/core/1/0/getCitiesByStateId', data);
  }
  // company Detail View

  getCompanyData(id) {
    return this.http.post('http://192.168.5.163:9083/core-service/crm/core/1/0/getCompanys', { id })
  }

  getCompanyCommentList() {
    return this.http.get('http://192.168.2.217:9083/core-service/crm/core/1/0/getAllCompanyInteraction');

  }

  createComment(data) {
    return this.http.post('http://192.168.2.217:9083/core-service/crm/core/1/0/createCompanyInteraction', data)
  }

}
