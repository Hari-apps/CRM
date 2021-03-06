import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './authentication/auth.guard';
import { CompanyDetailsViewComponent } from './company-details-view/company-details-view.component';
import { HomeComponent } from './home/home.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { CompanyContactComponent } from './company-contact/company-contact.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RolesComponent } from './roles/roles.component';
import { SettingsComponent } from './settings/settings.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'company-management',
    component: CompanyManagementComponent, 

  },
  {
    path: 'company-contact/:id',
    component: CompanyContactComponent 
  },
  {
    path: 'user-form',
    component: AdminFormComponent
  },
  {
    path: 'user-form/:id',
    component: AdminFormComponent
  },
  {
    path: 'company-details-view/:id',
    component: CompanyDetailsViewComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {

    path: 'roles',
    component: RolesComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  }, 
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
