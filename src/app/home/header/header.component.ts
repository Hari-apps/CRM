import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;
  showCompany: boolean = false;
  roleType: string;
  userId: any;
  constructor(private router: Router) {
    if (localStorage.getItem('roleType') === "SUPER_ADMIN") {
      this.showCompany = true;
    }
  }

  ngOnInit() {
    this.roleType = localStorage.getItem('roleType');
    this.userName = localStorage.getItem('userName');
    this.userId = localStorage.getItem('userId'); 
    
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  redirectHome() {
    if (localStorage.getItem('isLoggedIn') === "true") {
      if (this.roleType === 'SUPER_ADMIN') {
        this.router.navigate(['/admin'])
      } else {
        this.router.navigate(['/company-management'])
      }
    } else {
      this.router.navigate(['/login']);
    }

  }

  gotoProfile() {
    this.router.navigate(['/admin-form', this.userId]);

  }

  gotoSettings() {
    this.router.navigate(['/settings']);

  }

  
}
