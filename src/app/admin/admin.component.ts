import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2'
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { UserModal } from '../modals/user.modal';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit {

  @ViewChild('modalForm', { static: false }) form: NgForm;

  display: boolean = false;

  dailogTitle: string;

  modalWindowData: any = {};


  userName: string;

  regions: any[];

  userRoles: any[];

  userList: any[];

  errorMessage: string = "";

  id: number;

  cols: any[] = [
    { field: 'userId', header: 'User ID ' },
    { field: 'userName', header: 'Name' },
    { field: 'userRoleName', header: 'Role' },
    { field: 'countryName', header: 'Region' }

  ]

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
    this.userName = window.localStorage.getItem('userName');

    this.api.getRegions().subscribe(
      (data: any) => {
        console.log(data);

        this.regions = data.regionRequest;
      }
    );

    this.api.getRoles().subscribe(
      (data: any) => {
        console.log(data);
        this.userRoles = data.roleList;
      }
    );


    this.api.userList().subscribe((data: any) => {
      this.userList = data.userList;
      console.log(data)
    });

  }

  getRole(id) {
    let roleType;
    this.userRoles.filter(data => {
      if (data.roleId === id) {
        roleType = data.roleType;
      }
    });
    return roleType;
  }

  addNewUser() {
    this.id = 0;
    this.modalWindowData = {};
    console.log(this.userList);
    this.display = true;
    this.dailogTitle = 'Add New User';
    console.log(this.modalWindowData);
  }

  editUser(id) {
    this.id = id;
    this.display = true;
    this.dailogTitle = 'Edit user';
    console.log(id);
    this.userList.filter(data => {
      if (data.userId === id) {
        this.modalWindowData = data;
        this.modalWindowData.country = +data.country;
      }
    })
  }

  deleteUser(id) {
    console.log(id);
    // const index: number = this.users.indexOf(id);
    // console.log(index);
    // if (index !== -1) {
    //   console.log(this.users.splice(index, 1));
    // }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        this.api.deleteUser(id).subscribe((data: any) => {
          if (data.status === 0) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        });



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
        this.api.createUser(this.form.control.value).subscribe((data: any) => {
          if (data.status === 0) {
            console.log(data.statusMessage);
          } else {
            this.errorMessage = data.statusMessage;
          }
        });
      } else {
        this.api.updateUser(this.form.control.value, this.id).subscribe(data => console.log(data));
      }
    }








  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
