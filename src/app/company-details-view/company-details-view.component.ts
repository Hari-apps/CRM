import { HttpErrorResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import Swal from "sweetalert2";
import { ApiService } from "../api.service";

@Component({
  selector: "app-company-details-view",
  templateUrl: "./company-details-view.component.html",
  styles: []
})
export class CompanyDetailsViewComponent implements OnInit {
  userName: string;
  companyDetails: any = {};
  display: boolean = false;
  cols: any;
  modalWindowData: any = {};
  companyId: number;
  data: any[];
  constructor(private api: ApiService, private route: ActivatedRoute, private router:Router) {
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
      { field: "createdBy", header: "Commented By" },
      { field: "createDate", header: "Time" },
      { field: "status", header: "Status" }
    ];
  }

  getCompanyList() {
    this.api.getCompanyInteractionData(this.companyId).subscribe(
      (data: any) => {
        this.data = data.companyInteractionRequests;
        console.log(this.data);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }
  onSubmit(data) {
    this.modalWindowData = data;

    this.modalWindowData = {
      ...data,
      companyId: this.companyId,
      createdBy: this.userName
    };
    this.api.createComment(this.modalWindowData).subscribe((data: any) => {
      if ((data.status = "00")) {
        this.display = false;
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
      console.log(this.companyDetails);
    });
  }

  
  addNewComment() {
    this.display = true;
     
  }

  goBack(){
    this.router.navigate(['/company-management'])
  }

  onHideModalWindow() {
    this.display = false; 
  }
}
