import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { UserModal } from '../modals/user.modal';
import { HttpErrorResponse } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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

  accountHolderlist: any[];

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
    this.getAccountHolders();
    //Get Regions
    this.api.getRegions().subscribe(
      (data: any) => {
        this.regions = data.regionRequest;
      }
    );

    //Get Verticals
    this.api.getVerticals().subscribe(
      (data: any) => {
        this.verticals = data.verticalsRequests;
      });

    this.getCompanyList();

  }

  getCompanyList() {
    //Get Company List
    this.api.companyList().subscribe((data: any) => {
      console.log(data);
      this.companyList = data.customerRequest;
    });
  }

  getAccountHolders() {
    this.api.getUsersForAccountHolder().subscribe((data: any) => {
     this.accountHolderlist = data.list;
     console.log(this.accountHolderlist)
    })
  }
  //Add new Company
  addNewComapny() {
    this.id = 0;
    this.errorMessage = "";
    this.modalWindowData = {};
    this.modalWindowData.status = this.statusList[0].status;
    this.display = true;
    this.dailogTitle = 'Add New Company';
    this.statusForNew = true; //modalWindowData.status
  }

  //Edit Company
  editCompany(id) {
    this.statusForNew = false;
    this.id = id;
    this.errorMessage = "";
    this.display = true;
    this.dailogTitle = 'Edit Company';
    this.companyList.filter(data => {
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
        this.api.createCompany({ ...data, createdBy, status }).subscribe((data: any) => {
          if (data.status === "00") {
            this.display = false;
            Swal.fire(
              'Success!',
              'Company Details Inserted successfully!',
              'success'
            );
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
          if (data.status === "00") {
            this.display = false;
            Swal.fire(
              'Success!',
              'Company Details Updated successfully!',
              'success'
            );
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


  vewcompanyContact(id) {
    this.router.navigate(['/company-contact', id]);
  }

  viewComapny(id) {
    this.router.navigate(['/company-details-view', id]);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
