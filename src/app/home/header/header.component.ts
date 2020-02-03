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
  constructor(private router: Router) {
      if(localStorage.getItem('roleType') === "SUPER_ADMIN"){
        this.showCompany = true;
      }
   }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
