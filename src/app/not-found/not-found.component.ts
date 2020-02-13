import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
  <app-header></app-header>
  <div class="not-found">
      <img src="assets/images/404.jpg" alt="404 not found"><app-footer></app-footer>
  </div>
  `,
  styles: []
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
