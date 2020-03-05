import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  @ViewChild('loginForm', { static: false }) form: NgForm;

  constructor(private api: ApiService, private router: Router) {
   
  }
  ngOnInit() {
    if (localStorage.getItem('roleType') === "SUPER_ADMIN") {
      this.router.navigate(['/admin']);
    } else if (localStorage.getItem('roleType') === "SALES_MANAGER" || localStorage.getItem('roleType') === "SALES_EXECUTIVE") {
      this.router.navigate(['/company-management']);
    }
  }

  onSubmit(data) {
    this.api.login(data)
      .subscribe(
        (data: any) => {
          if (data.status === "0") {
            if (data.userType === 'SUPER_ADMIN') {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/company-management']);
            }
            Swal.fire(
              'Success!',
              'You are logged in successfully!',
              'success'
            );
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userName', this.form.value.userName);
            localStorage.setItem('roleType', data.userType);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('userRoleName',data.userRoleName);
            localStorage.setItem('featureList', JSON.stringify(data.featureList[0].featureName));


          } else {
            Swal.fire({
              title: 'Error!',
              text: data.statusMessage,
              icon: 'error',
              confirmButtonText: 'Try Again'
            })
          }

        },

        (error: HttpErrorResponse) => {
          Swal.fire({
            title: 'Error!',
            text: error.statusText,
            icon: 'error',
            confirmButtonText: 'Try Again'
          })
        }
      )

  }

}
