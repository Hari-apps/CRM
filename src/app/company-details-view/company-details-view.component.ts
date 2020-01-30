import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-details-view',
  templateUrl: './company-details-view.component.html',
  styles: []
})
export class CompanyDetailsViewComponent implements OnInit {
  userName: string;
  displayAddComment: boolean = false;
  cols: any;

  data: any[] = [
    { comment: 'DB Created', addedBy: 'Rohit', time: new Date().toLocaleDateString(), status: 'DB Create' },
    { comment: 'Activated to New', addedBy: 'Kohli', time: new Date().toLocaleDateString(), status: 'New' },
  { comment: 'Changed to Cold!', addedBy: 'Rohit', time: new Date().toLocaleDateString(), status: 'Cold' },
  { comment: 'Keep Getting Warmed', addedBy: 'Bumrah', time: new Date().toLocaleDateString(), status: 'Warm' },
  { comment: 'Deal Getting Heated!', addedBy: 'Shami', time: new Date().toLocaleDateString(), status: 'Hot' }];
  constructor() { }

  ngOnInit() {
    // localStorage.getItem('userName');
    this.userName = 'Gamma';

    this.cols = [{ field: 'comment', header: 'Comment' }, { field: 'addedBy', header: 'Added By' }, { field: 'time', header: 'Time' }, { field: 'status', header: 'Status' },]
  }

  addNewComment() {
    this.displayAddComment = true;
  }

}
