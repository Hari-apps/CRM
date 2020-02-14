import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";
import { HttpErrorResponse } from "@angular/common/http";
import Swal from "sweetalert2";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: "app-company-details-view",
  templateUrl: "./company-details-view.component.html",
  styles: []
})
export class CompanyDetailsViewComponent implements OnInit {
  userName: string;
  companyDetails: any = {};
  displayAddComment: boolean = false;
  cols: any;
  newCommentData: any = {};
  companyId: number;
  data: any[];
  constructor(private api: ApiService, private route: ActivatedRoute) {
    this.route.params.subscribe((params: Params) => {
      this.companyId = +params["id"];
    });
  }

  ngOnInit() {
    this.getCompanyDetails();
    this.getCompanyList();
    this.userName = localStorage.getItem("userName");
    this.cols = [
      { field: "comment", header: "Comment" },
      { field: "createdBy", header: "Created By" },
      { field: "createDate", header: "Time" },
      { field: "status", header: "Status" }
    ];
  }

  getCompanyList() {
    this.api.getCompanyInteractionData(this.companyId).subscribe(
      (data: any) => {
        this.data = data.companyInteractionRequests;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  creatComment(data) {
    this.addNewComment = data;

    this.addNewComment = {
      ...data,
      companyId: this.companyId,
      createdBy: this.userName
    };
    this.api.createComment(this.addNewComment).subscribe((data: any) => {
      if ((data.status = "00")) {
        this.displayAddComment = false;
        this.getCompanyList();
        Swal.fire("Success!", "Comment Added successfully!", "success");
      } else {
        Swal.fire({
          title: "Error!",
          text: data.statusMessage,
          icon: "error",
          confirmButtonText: "Try Again"
        });
      }
    });
  }

  getCompanyDetails() {
    this.api.getCompanyData(this.companyId).subscribe((data: any) => {
      this.companyDetails = data.customerRequest[0];
    });
  }
  addNewComment() {
    this.displayAddComment = true;
  }
}
