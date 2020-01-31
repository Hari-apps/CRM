import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-company-details-view',
  templateUrl: './company-details-view.component.html',
  styles: []
})
export class CompanyDetailsViewComponent implements OnInit {
  userName: string;
  displayAddComment: boolean = false;
  cols: any;
  companyId:number;
  data: any[];
  //  [
  //   { comment: 'DB Created', addedBy: 'Rohit', time: new Date().toLocaleDateString(), status: 'DB Create' },
  //   { comment: 'Activated to New', addedBy: 'Kohli', time: new Date().toLocaleDateString(), status: 'New' },
  // { comment: 'Changed to Cold!', addedBy: 'Rohit', time: new Date().toLocaleDateString(), status: 'Cold' },
  // { comment: 'Keep Getting Warmed', addedBy: 'Bumrah', time: new Date().toLocaleDateString(), status: 'Warm' },
  // { comment: 'Deal Getting Heated!', addedBy: 'Shami', time: new Date().toLocaleDateString(), status: 'Hot' }];

  constructor(private api: ApiService, private router: Router,private route:ActivatedRoute) { 

    this.route.params.subscribe((params:Params)=>{
      this.companyId = +params['id'];
      console.log("companyid",this.companyId);
    });

  }

  ngOnInit() {
    this.cols = [{ field: 'comment', header: 'Comment' }, { field: 'addedBy', header: 'Added By' }, { field: 'time', header: 'Time' }, { field: 'status', header: 'Status' },]

    this.api.companyDetailView().subscribe((data: any) => {
     // this.companyContactList = data.companyContactList;
      console.log(data);
    });

  }

  addNewComment() {
    this.displayAddComment = true;
  }

}
