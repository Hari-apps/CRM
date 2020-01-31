import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {

  @ViewChild('modalForm', { static: false }) form: NgForm;

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

  cols: any[] = [
    { field: 'userId', header: 'User ID ' },
    { field: 'userName', header: 'Name' },
    { field: 'userRoleName', header: 'Role' },
    { field: 'countryName', header: 'Region' }

  ]

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.userName = window.localStorage.getItem('userName');
    this.getUserList();
    this.getRoles();
    this.getRegions();

  }

  getUserList() {
    this.api.userList().subscribe((data: any) => {
      this.userList = data.userList;
      console.log(data);
    });
  }

  getRoles() {
    this.api.getRoles().subscribe(
      (data: any) => {
        console.log(data);
        this.userRoles = data.roleList;
      }
    );
  }

  getRegions() {
    this.api.getRegions().subscribe(
      (data: any) => {
        console.log(data);

        this.regions = data.regionRequest;
      }
    );
  }

  addNewUser() {
    this.errorMessage = "";
    this.id = 0;
    this.modalWindowData = {};
    console.log(this.userList);
    this.display = true;
    this.dailogTitle = 'Add New User';
    console.log(this.modalWindowData);
  }

  editUser(data) {
    this.display = true;
    this.dailogTitle = 'Edit user';
    console.log(data);
    this.modalWindowData = data;
    this.modalWindowData.country = +data.country;
    // this.id = data.userId;

    // this.userList.filter(data => {
    //   if (data.userId === id) {
    //     this.modalWindowData = data;
    //     this.modalWindowData.country = +data.country;

    //     console.log(this.modalWindowData);
    //   }
    // })
  }

  showStatusModel(data) {
    console.log(data);
    this.displayStatusModal = true;
    this.dataToStatus = {
      entityId: data.userId,
      status: data.status,
      entityType: data.userRoleName,
      reason: ''
    }
  }

  userStatus(data) {

    this.api.userStatus(data).subscribe((data: any) => {
      if (data.status === '0') {
        this.getUserList();
        Swal.fire(
          'Success!',
          'Status has been Updated successfully!',
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
        this.api.createUser(this.form.control.value).subscribe((data: any) => {
          console.log(data);
          if (data.status === '0') {
            this.display = false;
            Swal.fire(
              'Success!',
              'New User Created successfully!',
              'success'
            );

            this.getUserList();
          } else {
            this.errorMessage = data.statusMessage;
          }
        });
      } else {
        this.api.updateUser(this.form.control.value, this.id).subscribe((data: any) => {
          console.log(data);
          if (data.status === '0') {
            this.getUserList();
            this.display = false;
            Swal.fire(
              'Success!',
              'User Updated successfully!',
              'success'
            );
          } else {
            Swal.fire({
              title: 'Error!',
              text: data.statusMessage,
              icon: 'error',
              confirmButtonText: 'Try Again'
            })
          }
        });
      }
    }
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
