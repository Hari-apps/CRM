import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";
import { ApiService } from "../api.service";

@Component({
  selector: "app-roles",
  templateUrl: "./roles.component.html",
  styleUrls: []
})
export class RolesComponent implements OnInit {
  @ViewChild("modalForm", { static: false }) form: NgForm;

  display: boolean = false;

  displayStatusModal: boolean = false;

  dailogTitle: string;

  modalWindowData: any = {};

  dataToStatus: any = {};

  userName: string;

  RoleList: any[];

  errorMessage: string = "";

  id: number;

  statusClass: string = "";

  features: any = {};

  cols: any[] = [
    { field: "roleType", header: "Role Type" },
    { field: "roleName", header: "Role Name" },
    { field: "description", header: "Description" },
    { field: "status", header: "Status" }
  ];

  statusForNew: boolean;
  userRoles: any = [];
  featureList: any = {};

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    this.userName = window.localStorage.getItem("userName");
    this.getRoles();
    this.getRolesList();
    this.getFeatureList();
  }

  getFeatureList() {
    this.featureList = JSON.parse(localStorage.getItem("featureList"));
  }

  getRoles() {
    this.api.getRoles().subscribe((data: any) => {
      if (data.status === "0") {
        this.userRoles = data.roleTypes;
      } else {
        this.errorMessage = data.statusMessage;
      }
    });
  }

  getRolesList() {
    //Get Company List
    this.api.getAllRoleList().subscribe((data: any) => {
      this.RoleList = data.roleList;

    });
  }

  //Add new Company
  addNewRole() {
    this.id = 0;
    this.errorMessage = "";
    this.modalWindowData = {};
    this.features = {};
    this.display = true;
    this.dailogTitle = "Add New Role";
    this.statusForNew = true; //modalWindowData.status
  }

  //Edit Company
  editRole(id) {
    this.features = {};
    this.statusForNew = false;
    this.id = id;
    this.errorMessage = "";
    this.display = true;
    this.dailogTitle = "Edit Role";
    this.RoleList.filter((data: any) => {
      if (data.roleId === id) {
        this.modalWindowData = data;
        this.features = data.featureList;
      }
    });
  }

  onHideModalWindow() {
    this.display = false;
  }

  onSubmit(data) {
    this.errorMessage = "";

    if (this.id === 0) {
      this.api.createRole(data).subscribe((data: any) => {
        if (data.status === "0") {
          this.display = false;
          Swal.fire("Success!", "New Role is Created successfully!", "success");

          this.getRolesList();
        } else {
          this.errorMessage = data.statusMessage;
        }
      });
    } else {
      let fullData = { ...data, roleId: this.id };

      this.api.updateRole(fullData).subscribe((data: any) => {
        if (data.status === "0") {
          this.display = false;
          this.getRolesList();
          Swal.fire(
            "Success!",
            "Role has been Updated successfully!",
            "success"
          );
        } else {
          this.errorMessage = data.statusMessage;
        }
      });
    }
  }

 

  showStatusModel(data) {
    this.dailogTitle = "Role Status";
    this.displayStatusModal = true;
    this.dataToStatus = data;
  }

  roleStatus(data) {
    this.api.updateRole(data).subscribe((data: any) => {
    });
  }
}
