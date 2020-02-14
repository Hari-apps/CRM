import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {

  @ViewChild('masterForm', { static: false }) form: NgForm;
  formData: any = {};
  errorMessage: string = '';
  passwordREG: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/;
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  onSubmit(data) {
    this.errorMessage = "";
    let userName = localStorage.getItem('userName');
    let isPasswordChecked: boolean = false;
    if (this.checkPassword(data)) {
      isPasswordChecked = true;
      if (isPasswordChecked) {
        this.api.changePassword({ userName: userName, currentPassword: data.currentPassword, newPassword: data.newPassword }).subscribe((data: any) => {
          // console.log(data);
          if (data.status === "0") {
            this.form.reset();
            Swal.fire(
              'Success!',
              'Status has been Updated successfully!',
              'success'
            );
          } else {
            this.errorMessage = data.statusMessage;
          }
        })
      } 
    } else {
      this.errorMessage = "New Password Must contain{One Upper Case, One Lower Case, One Number, One Speacial Character, and Between 8, 18}"
    }


  }

  checkPassword(data) {
    if (data.newPassword === data.confirmPassword) {
      return this.passwordREG.test(data.newPassword);
     }else {
      this.errorMessage = "New Password is not Matched!"
    }
  }

}
