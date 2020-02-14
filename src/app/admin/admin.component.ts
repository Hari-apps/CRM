import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { ApiService } from "../api.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styles: []
})
export class AdminComponent implements OnInit {
  @ViewChild("modalForm", { static: false }) form: NgForm;

  displayStatusModal: boolean = false;

  display: boolean = false;

  dailogTitle: string;

  modalWindowData: any = {};

  userName: string;

  regions: any[];

  userRoles: any[];

  userList: any[];

  errorMessage: string = "";

  id: number;

  dataToStatus: any = {};

  featureList: any[];

  cols: any[] = [
    { field: "userId", header: "User ID " },
    { field: "userName", header: "Name" },
    { field: "roleName", header: "Role" },
    { field: "countryName", header: "Region" }
  ];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.userName = window.localStorage.getItem("userName");
    this.getUserList();
    this.getFeatureList();
  }

  getFeatureList() {
    this.api.getFeatureList().subscribe((data: any) => {
      if (data.status === "0") {
        this.featureList = data.featureList;
      } else {
        this.errorMessage = data.statusMessage;
      }
      // console.log("featureList", this.featureList);
    });
  }

  getUserList() {
    this.api.userList().subscribe((data: any) => {
      this.userList = data.userList; 
    });
  }

  addNewUser() {
    this.router.navigate(["/user-form"]);
  }

  editUser(id) {
    this.router.navigate(["/user-form", id]);
  }

  showStatusModel(data) {
    // console.log(data);
    this.displayStatusModal = true;
    this.dataToStatus = {
      entityId: data.userId,
      status: data.status,
      roleType: data.userType,
      reason: ""
    };
  }

  userStatus(data) {
    // console.log(data);
    this.api.userStatus(data).subscribe((data: any) => {
      if (data.status === "0") {
        this.getUserList();
        Swal.fire(
          "Success!",
          "Status has been Updated successfully!",
          "success"
        );
        this.displayStatusModal = false;
      } else {
        this.errorMessage = data.statusMessage;
      }
    });
  }

  onHideModalWindow() {
    this.display = false;
    this.displayStatusModal = false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}
