import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { ApiService } from '../api.service';
import { Router, Params } from '@angular/router';
import { UserModal } from '../modals/user.modal';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-contact',
  templateUrl: './company-contact.component.html',
  styles: []
})
export class CompanyContactComponent implements OnInit {

  @ViewChild('modalForm', { static: false }) form: NgForm;

  display: boolean = false;

  displayStatusModal: boolean = false;

  dailogTitle: string;

  modalWindowData: any = {};


  userName: string;

  regions: any[];

  verticals: any[];

  companyContactList: any[];

  errorMessage: string = "";

  id: number;

  companyId:any;

  statusClass: string = "";
  
  dataToStatus: any = {};

  cols: any[] = [
    { field: 'contactName', header: 'Contact Person' },
    { field: 'designation', header: 'Designation' },
    { field: 'emailAddress', header: 'Email' },
    { field: 'location', header: 'Location' },
    { field: 'mobileNumber', header: 'Mobile' },
    { field: 'officeNumber', header: 'Office Number' },
    // { field: 'additionalInfo', header: 'Additional Info' },
  ];

  

  constructor(private api: ApiService, private router: Router,private route:ActivatedRoute) {

    this.route.params.subscribe((params:Params)=>{
      this.companyId = +params['id'];
      console.log("companyid",this.companyId);
    });

   }

  ngOnInit() {
    this.userName = window.localStorage.getItem('userName');
    this.getCompanyContactList();

  }

  getCompanyContactList() {
    //Get Company List
    let data = {
      "companyId":this.companyId
    };
    this.api.companyContactList(data).subscribe((data: any) => {
      this.companyContactList = data.companyContactList;
      console.log(data);
    });
  }

  //Add new Company
  addNewComapnyContact() {
    this.id = 0;
    this.errorMessage = "";
    this.modalWindowData = {};
    
    console.log(this.companyContactList);
    this.display = true;
    this.dailogTitle = 'Add DB';
    // this.statusListData = this.statusListAdd;
   
    console.log("add data", this.modalWindowData);
  }

  //Edit Company
  editCompany(id) {
   
    this.id = id;
    this.errorMessage = "";
    this.display = true;
    this.dailogTitle = 'Edit DB';
    console.log("selected id", id);
    this.companyContactList.filter(data => {
      console.log(data);
      if (data.companyContactId === id) {
        this.modalWindowData = data;
        console.log("Edit Contact Modal Data",this.modalWindowData);
      }
    })
  }

  showStatusModel(data) {
    console.log("selected Data",data);
    this.displayStatusModal = true;
    this.dataToStatus = {
      companyContactId: data.companyContactId,
      contactName: data.contactName,
      status: data.status,
      reason: ''
    }
  }


  companyContactStatus(data) {

    this.api.companyContactChangeStatus(data).subscribe((data: any) => {
      if (data.status === '0') {
        this.getCompanyContactList();
        Swal.fire(
          'Success!',
          'Status Changed successfully!',
          'success'
        );
        this.displayStatusModal = false;
      }
    });
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
        let companyId = this.companyId;
        console.log("forData", data);
        this.api.createCompanyContact({ ...data, companyId, createdBy }).subscribe((data: any) => {
          console.log(data);
          if (data.status === "00") {
            this.display = false;
            Swal.fire(
              'Success!',
              'Company Details Inserted successfully!',
              'success'
            );
            console.log(data.statusMessage);
            this.getCompanyContactList();
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
        let companyContactId = this.id;
        let companyId = this.companyId;
        let status = this.modalWindowData.status;
        this.api.updateCompanyContact({ ...data, modifiedBy, companyContactId,companyId,status }).subscribe((data: any) => {
          console.log(data);
          if (data.status === "00") {
            this.display = false;
            Swal.fire(
              'Success!',
              'Company Contact Details Updated successfully!',
              'success'
            );
            console.log(data.statusMessage);
            this.getCompanyContactList();
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

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
