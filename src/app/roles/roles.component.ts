import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { UserModal } from '../modals/user.modal';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: []
})
export class RolesComponent implements OnInit {

  @ViewChild('modalForm', { static: false }) form: NgForm;

  display: boolean = false;

  dailogTitle: string;

  modalWindowData: any = {};

  userName: string;

  RoleList: any[];

  errorMessage: string = "";

  id: number;

  statusClass: string = "";
  
  cols: any[] = [
    { field: 'roleType', header: 'Role Type' },
    { field: 'roleName', header: 'Role Name' },
    { field: 'description', header: 'Description' },
    { field: 'status', header: 'Status' },
  ];

  statusForNew: boolean;

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.userName = window.localStorage.getItem('userName');
    this.getRolesList();
  }

  getRolesList() {
    //Get Company List
    this.api.getAllRoleList().subscribe((data: any) => {
      this.RoleList = data.roleList;
      console.log("RoleList",this.RoleList);
    });
  }

  //Add new Company
  addNewRole() {
    this.id = 0;
    this.errorMessage = "";
    this.modalWindowData = {};
    this.display = true;
    this.dailogTitle = 'Add New Role';
    this.statusForNew = true; //modalWindowData.status
  }

  //Edit Company
  editRole(id) {
    this.statusForNew = false;
    this.id = id;
    this.errorMessage = "";
    this.display = true;
    this.dailogTitle = 'Edit Role';
    this.RoleList.filter(data => {
      if (data.roleId === id) {
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
        

      } else {


      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

}
