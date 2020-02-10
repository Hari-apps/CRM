import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  // getUserById(data) {
  //   return this.http.post(`${this.baseURL}/getProfile`, data);
  // }

  getUserById(data) {
    return this.http.post('http://192.168.5.163:9085/user-service/license/user/1/0/getUserById', data);
  }
  getRegions() {
    return this.http.get('http://192.168.5.163:9083/core-service/crm/core/1/0/getRegions');
  }


  getVerticals() {
    return this.http.get('http://192.168.5.163:9083/core-service/crm/core/1/0/getVerticals');
  }

  getRoles() {
    return this.http.get('http://192.168.5.163:9085/user-service/license/user/1/0/getRoleType');
    // return this.http.post('http://192.168.5.163:9085/user-service/license/user/1/0/getRoles');

  }

  getActiveRoles(data) {
    return this.http.post('http://192.168.5.163:9085/user-service/license/user/1/0/getActiveRoles', data);
  }

  getCountryList() {
    return this.http.get('http://192.168.5.163:9083/core-service/license/core/1/0/getCountryList');
  }

  getStateList(data) {
    return this.http.post('http://192.168.5.163:9083/core-service/license/core/1/0/getStatesByCountryId', data)
  }


  //Apis for Company and Contact

  baseComapnyManagemtURL: string = "http://192.168.5.163:9083/core-service/crm/core/1/0";

  companyList() {
    return this.http.get(`${this.baseComapnyManagemtURL}/getCompanyslist`);
  }


  createCompany(data) {
    return this.http.post(`${this.baseComapnyManagemtURL}/createCompany`, data);
  }


  updateCompany(data) {
    return this.http.post(`${this.baseComapnyManagemtURL}/editCompany`, data);
  }


  //API's for Company Contact

  companyContactList(data) {
    return this.http.post(`${this.baseComapnyManagemtURL}/getCompanyContacts `, data);
  }

  createCompanyContact(data) {
    return this.http.post(`${this.baseComapnyManagemtURL}/createCompanyContact`, data);
  }

  updateCompanyContact(data) {
    return this.http.post(`${this.baseComapnyManagemtURL}/editCompanyContact`, data);
  }

  companyDetailView() {
    return this.http.get(`${this.baseComapnyManagemtURL}/getAllCompanyInteraction`);
  }


  companyContactChangeStatus(data) {
    return this.http.post(`${this.baseComapnyManagemtURL}/changeStatus`, data);
  }

  getCityList(data) {
    return this.http.post('http://192.168.5.163:9083/core-service/license/core/1/0/getCitiesByStateId', data);
  }
  // company Detail View

  getCompanyData(id) {
    return this.http.post('http://192.168.5.163:9083/core-service/crm/core/1/0/getCompanys', { id })
  }

  getCompanyCommentList() {
    return this.http.get('http://192.168.5.163:9083/core-service/crm/core/1/0/getAllCompanyInteraction');

  }

  createComment(data) {
    return this.http.post('http://192.168.5.163:9083/core-service/crm/core/1/0/createCompanyInteraction', data);
  }

  getCompanyInteractionData(id) {
    return this.http.post('http://192.168.5.163:9083/core-service/crm/core/1/0/searchCompanyInteractions', { "companyId": id });
  }


  //Account Holder API

  getUsersForAccountHolder() {
    return this.http.get('http://192.168.2.217:9085/user-service/license/user/1/0/showAccountHolder');
  }

  //Forgot password

  forgotPassword(data) {
    return this.http.post(`${this.baseURL}/forgotPassword`, data)
  }

  getAllRoleList() {
    return this.http.post(`${this.baseURL}/getRoles`, {});
  }

  resetPassword(data) {
    return this.http.post(`${this.baseURL}/resetPassword`, data)
  }

  changePassword(data) {
    return this.http.post(`${this.baseURL}/changePassword`, data)
  }

}
