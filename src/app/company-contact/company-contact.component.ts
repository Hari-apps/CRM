import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';

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

  companyDetails: any = {};


  cols: any[] = [
    { field: 'contactName', header: 'Contact Person' },
    { field: 'designation', header: 'Designation' },
    { field: 'emailAddress', header: 'Email' },
    { field: 'location', header: 'Location' },
    { field: 'mobileNumber', header: 'Mobile' },
    { field: 'officeNumber', header: 'Office Number' },
  ];
  

  constructor(private api: ApiService, private router: Router,private route:ActivatedRoute) {
    this.route.params.subscribe((params:Params)=>{
      this.companyId = +params['id'];
    });
   }

  ngOnInit() {
    this.userName = window.localStorage.getItem('userName');
    this.getCompanyDetails();
    this.getCompanyContactList();

  }
  getCompanyDetails() {
    this.api.getCompanyData(this.companyId).subscribe((data: any) => {
      this.companyDetails = data.customerRequest[0];
      console.log(this.companyDetails);
    });
  }u
  getCompanyContactList() {
    //Get Company List
    let data = {
      "companyId":this.companyId
    };
    this.api.companyContactList(data).subscribe((data: any) => {
      this.companyContactList = data.companyContactList;
    });
  }

  //Add new Company
  addNewComapnyContact() {
    this.id = 0;
    this.errorMessage = "";
    this.modalWindowData = {};   
    this.display = true;
    this.dailogTitle = 'Add New Contact';
  }

  //Edit Company
  editCompany(id) {  
    this.id = id;
    this.errorMessage = "";
    this.display = true;
    this.dailogTitle = 'Edit Contact';
    this.companyContactList.filter(data => {
      if (data.companyContactId === id) {
        this.modalWindowData = data;
      }
    });
  }

  showStatusModel(data) {
    this.displayStatusModal = true;
    this.dailogTitle ="Change Status";
    this.dataToStatus = {
      companyContactId: data.companyContactId,
      contactName: data.contactName,
      designation: data.designation,
      status: data.status,
      reason: ''
    }
  }

  companyContactStatus(data) {
    console.log(data);
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
    this.displayStatusModal = false;
  }


  onSubmit() {
    this.errorMessage = "";
    if (this.form.control.valid) {
      if (this.id == 0) {
        let data = this.form.control.value;
        let createdBy = this.userName;
        let companyId = this.companyId;
        this.api.createCompanyContact({ ...data, companyId, createdBy }).subscribe((data: any) => {
          if (data.status === "00") {
            this.display = false;
            Swal.fire(
              'Success!',
              'Company Details Inserted successfully!',
              'success'
            );
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
          if (data.status === "00") {
            this.display = false;
            Swal.fire(
              'Success!',
              'Company Contact Details Updated successfully!',
              'success'
            );
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

  goBack(){
    this.router.navigate(['/company-management'])
  }

}
