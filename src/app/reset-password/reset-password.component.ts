import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styles: []
})
export class ResetPasswordComponent implements OnInit {
  checkPassword: boolean = false;

  errorMessage: string = "";

  emailToken: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    let url = window.location.href;

    this.emailToken = url.substr(42);

  }


  onSubmit(data) {
    // console.log(data.newPassword);
    // console.log(data.confirmPassword);
    let dataToApi = { newPassword: data.newPassword, emailToken: this.emailToken }
    if (data.newPassword === data.confirmPassword) {
      this.api.resetPassword(dataToApi).subscribe((data: any) => {
        if (data.status === "0") {
          this.checkPassword = true;
        } else {
          this.errorMessage = data.statusMessage;
        }
      })
    } else {
      this.errorMessage = "Password is not Matched!"
    }
  }

}
