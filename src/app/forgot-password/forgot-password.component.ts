import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2'
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styles: []
})
export class ForgotPasswordComponent implements OnInit {

  checkUser: boolean = false;
  errorMessage: string = "";
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  onSubmit(data) {
    this.errorMessage = "";
    this.api.forgotPassword(data).subscribe((data: any) => {
      // console.log(data);
      if (data.status === "0") {
        this.checkUser = !this.checkUser;
      } else {
        this.errorMessage = data.statusMessage;
      }
    }, (error: HttpErrorResponse) => {
      Swal.fire({
        title: 'Error!',
        text: error.statusText,
        icon: 'error',
        confirmButtonText: 'Try Again'
      })
    })
  }

}
