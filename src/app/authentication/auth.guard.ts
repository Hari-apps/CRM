import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot
} from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(state, next);
    if (
      localStorage.getItem("isLoggedIn") === "true" &&
      localStorage.getItem("roleType") === "SUPER_ADMIN"
    ) {
      return true;
    } 


    if( localStorage.getItem("isLoggedIn") === "true" ){
      this.router.navigate(["/company-management"]); 
      }else{
        this.router.navigate(["/login"]);
      }
    return false;
  }
}
