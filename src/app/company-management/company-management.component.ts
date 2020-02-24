import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { ApiService } from "../api.service";

@Component({
  selector: "app-company-management",
  templateUrl: "./company-management.component.html",
  styles: []
})
export class CompanyManagementComponent implements OnInit {
  @ViewChild("modalForm", { static: false }) form: NgForm;

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

  featureList: any = {};

  cols: any[] = [
    { field: "companyName", header: "Company Name" },
    { field: "regionName", header: "Region" },
    { field: "location", header: "Location" },
    { field: "verticalName", header: "Vertical" },
    { field: "status", header: "Status" }

    // { field: '', header: 'SOW' },
    // { field: '', header: 'MSA' },
    // { field: '', header: 'Value' },
  ];

  statusListData: any = [];
  statusList: any = [{ status: "Cold" }, { status: "Warm" }, { status: "Hot" }];

  statusForNew: boolean;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.userName = window.localStorage.getItem("userName");
    this.getAccountHolders();
    //Get Regions
    this.api.getRegions().subscribe((data: any) => {
      this.regions = data.regionRequest;
    });

    //Get Verticals
    this.api.getVerticals().subscribe((data: any) => {
      this.verticals = data.verticalsRequests;
    });

    this.getCompanyList();
    this.getFeatureList();
  }

  getFeatureList() {
    this.featureList = JSON.parse(localStorage.getItem("featureList"));
  }

  getCompanyList() {
    //Get Company List
    this.api.companyList().subscribe((data: any) => {
      this.companyList = data.customerRequest;
    });
  }

  getAccountHolders() {
    this.api.userList().subscribe((data: any) => {
      this.accountHolderlist = data.userList;
    });
  }
  //Add new Company
  addNewComapny() {
    this.id = 0;
    this.errorMessage = "";
    this.modalWindowData = {};
    // this.modalWindowData.status = this.statusList[0].status;
    this.modalWindowData.status = "Cold";

    this.display = true;
    this.dailogTitle = "Add New Company";
    this.statusForNew = true; //modalWindowData.status
  }

  //Edit Company
  editCompany(id) {
    this.statusForNew = false;
    this.id = id;
    this.errorMessage = "";
    this.display = true;
    this.dailogTitle = "Edit Company";
    this.companyList.filter((data: any) => {
      if (data.companyId === id) {
        this.modalWindowData = data;
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
        let status = this.modalWindowData.status;
        this.api
          .createCompany({ ...data, createdBy, status })
          .subscribe((data: any) => {
            if (data.status === "00") {
              this.display = false;
              Swal.fire(
                "Success!",
                "Company Details Inserted successfully!",
                "success"
              );
              this.getCompanyList();
            } else {
              this.errorMessage = data.statusMessage;
            }
          });
        (error: HttpErrorResponse) => {
          Swal.fire({
            title: "Error!",
            text: error.statusText,
            icon: "error",
            confirmButtonText: "Try Again"
          });
        };
      } else {
        let data = this.form.control.value;
        let modifiedBy = this.userName;
        let companyId = this.id;
        this.api
          .updateCompany({ ...data, modifiedBy, companyId })
          .subscribe((data: any) => {
            if (data.status === "00") {
              this.display = false;
              Swal.fire(
                "Success!",
                "Company Details Updated successfully!",
                "success"
              );
              this.getCompanyList();
            } else {
              this.errorMessage = data.statusMessage;
            }
          });

        (error: HttpErrorResponse) => {
          Swal.fire({
            title: "Error!",
            text: error.statusText,
            icon: "error",
            confirmButtonText: "Try Again"
          });
        };
      }
    }
  }

  vewcompanyContact(id) {
    this.router.navigate(["/company-contact", id]);
  }

  viewComapny(id) {
    this.router.navigate(["/company-details-view", id]);
  }
}
