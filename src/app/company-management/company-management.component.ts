import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { UserModal } from '../modals/user.modal';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-company-management',
  templateUrl: './company-management.component.html',
  styles: []
})
export class CompanyManagementComponent implements OnInit {

  @ViewChild('modalForm', { static: false }) form: NgForm;

  display: boolean = false;

  dailogTitle: string;

  modalWindowData: any = {};


  userName: string;

  regions: any[];

  verticals: any[];

  companyList: any[];

  errorMessage: string = "";

  id: number;

  statusClass: string = "";
  
  cols: any[] = [
    { field: 'companyName', header: 'Company Name' },
    { field: 'regionName', header: 'Region' },
    { field: 'location', header: 'Location' },
    { field: 'verticalName', header: 'Vertical' },
    // { field: '', header: 'SOW' },
    // { field: '', header: 'MSA' },
    // { field: '', header: 'Value' },
  ];

  statusListData: any = [];
  statusList: any = [{ "status": "New" }, { "status": "DB Create" }, { "status": "Cold" }, { "status": "Warm" }, { "status": "Hot" }, { "status": "Closed" }];

  statusForNew: boolean;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.userName = window.localStorage.getItem('userName');

    //Get Regions
    this.api.getRegions().subscribe(
      (data: any) => {
        console.log(data);

        this.regions = data.regionRequest;
      }
    );

    //Get Verticals
    this.api.getVerticals().subscribe(
      (data: any) => {
        console.log("verticals", data);
        this.verticals = data.verticalsRequests;
      });

    this.getCompanyList();

  }

  getCompanyList() {
    //Get Company List
    this.api.companyList().subscribe((data: any) => {
      this.companyList = data.customerRequest;
      console.log(data);
    });
  }

  //Add new Company
  addNewComapny() {
    this.id = 0;
    this.errorMessage = "";
    this.modalWindowData = {};
    this.modalWindowData.status = this.statusList[0].status;
    console.log(this.companyList);
    this.display = true;
    this.dailogTitle = 'Add New Company';
    // this.statusListData = this.statusListAdd;
    this.statusForNew = true; //modalWindowData.status
    console.log("add data", this.modalWindowData);
  }

  //Edit Company
  editCompany(id) {
    this.statusForNew = false;
    this.id = id;
    this.errorMessage = "";
    this.display = true;
    this.dailogTitle = 'Edit Company';
    console.log("selected id", id);
    this.companyList.filter(data => {
      console.log(data);
      if (data.companyId === id) {
        this.modalWindowData = data;
      }
    })
  }

  
  onHideModalWindow() {
    this.display = false;
  }

  onSubmit() {
    this.errorMessage = "";
    if (this.form.control.valid) {
      if (this.id == 0) {
        let data = this.form.control.value;
        let createdBy = this.userName;
        let status = this.modalWindowData.status;
        console.log("forData", data);
        this.api.createCompany({ ...data, createdBy, status }).subscribe((data: any) => {
          console.log(data);
          if (data.status === "00") {
            this.display = false;
            Swal.fire(
              'Success!',
              'Company Details Inserted successfully!',
              'success'
            );
            console.log(data.statusMessage);
            this.getCompanyList();
          } else {
            this.errorMessage = data.statusMessage;
          }
        });
        (error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error!',
            text: error.statusText,
            icon: 'error',
            confirmButtonText: 'Try Again'
          })
        }

      } else {
        let data = this.form.control.value;
        let modifiedBy = this.userName;
        let companyId = this.id;
        this.api.updateCompany({ ...data, modifiedBy, companyId }).subscribe((data: any) => {
          console.log(data);
          if (data.status === "00") {
            this.display = false;
            Swal.fire(
              'Success!',
              'Company Details Updated successfully!',
              'success'
            );
            console.log(data.statusMessage);
            this.getCompanyList();
          } else {
            this.errorMessage = data.statusMessage;
          }
        });

        (error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error!',
            text: error.statusText,
            icon: 'error',
            confirmButtonText: 'Try Again'
          })
        }

      }
    }
  }


  vewcompanyContact(id){
    console.log(id);
    this.router.navigate(['/company-contact',id]);
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
