import { Component, OnInit, ViewChild, SimpleChange, OnChanges } from '@angular/core';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styles: []
})
export class AdminFormComponent implements OnInit {
  @ViewChild('masterForm', { static: false }) form: NgForm;

  userName: string;
  formData: any = {};
  readonly: boolean = false;
  countries: any[];
  stateList: any[];
  cityList: any[];
  errorMessage: string = '';
  userRoles: any;
  activeRoles: any;
  userId: number;
  isSaved: boolean = false;
  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params: Params) => {
      this.userId = +params['id'];

      if (!this.userId) {
        this.userId = 0;
      }
    });
  }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
    this.getRoles();
    this.getCountries();
    if (this.userId !== 0) {
      this.getUser();
      this.readonly = true;
    }
  }

  getUser() {
    let data = { userId: this.userId }
    this.api.getUserById(data).subscribe((data: any) => { 
      if (data.status === "0") {
        this.formData = data.userList[0];
        this.formData.country = +data.userList[0].country;
        this.formData.state = +data.userList[0].state;
        this.formData.city = +data.userList[0].city;
        this.setStateValues();
        this.setCityValues();
        this.setRoleNames();

      }
    });
  }

  getRoles() {
    this.api.getRoles().subscribe(
      (data: any) => {
        if (data.status === "0") {
          this.userRoles = data.roleTypes;
        } else {
          this.errorMessage = data.statusMessage;
        }
      }
    );
  }

  setRoleNames() {
    this.activeRoles = [];
    var roleType = { roleType: this.formData.roleType };
    this.api.getActiveRoles(roleType).subscribe((data: any) => {
      if (data.status === "0") {
        this.activeRoles = data.roleList; 
      }
    })
  }
  getCountries() {
    this.api.getCountryList().subscribe(
      (data: any) => {
        if (data.status == "0") {
          this.countries = data.countryList;
        } else {
          this.errorMessage = data.statusMessage;
        }
      }
    );
  }

  setStateValues() {
    let countryId = { countryId: this.formData.country };
    this.api.getStateList(countryId).subscribe((data: any) => {
      if (data.status === '0') {
        this.stateList = data.stateList;
      } else {
        this.errorMessage = data.statusMessage;
      }
    })
  }

  setCityValues() {
    let stateId = { stateId: this.formData.state };

    this.api.getCityList(stateId).subscribe((data: any) => {
      if (data.status === "0") {
        this.cityList = data.cityList;
      } else {
        this.errorMessage = data.statusMessage;
      }
    })
  }

  onSubmit(data, action) { 
    this.errorMessage = "";
    if (data) {
      if (this.userId == 0) {
        this.api.createUser(data).subscribe((data: any) => {
          if (data.status === '0') {
            this.form.reset();
            Swal.fire(
              'Success!',
              'New User Created successfully!',
              'success'
            );
            this.isSaved = true;

          } else {
            this.errorMessage = data.statusMessage;
            this.isSaved = false;
          }

          if (action === 2 && this.isSaved) {
            this.router.navigate(['/admin'])
          }
        });
      } else {
        this.api.updateUser(data).subscribe((data: any) => {
          if (data.status === '0') {
            Swal.fire(
              'Success!',
              'User Updated successfully!',
              'success'
            );

            this.isSaved = true;

          } else {
            Swal.fire({
              title: 'Error!',
              text: data.statusMessage,
              icon: 'error',
              confirmButtonText: 'Try Again'
            });
            this.isSaved = false;

          }
          if (action === 2 && this.isSaved) {
            this.router.navigate(['/admin'])
          }
        });
      }
    }
  }

  action(data: any, action: number) {
    if (action === 0) {
      this.router.navigate(['/admin']);
    } else if (action == 1) {
      this.onSubmit(data, action);
    } else if (action == 2) {
      this.onSubmit(data, action);
    }
  }


  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}
