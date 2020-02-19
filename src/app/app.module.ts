import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { LoginComponent } from './login/login.component';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { NotFoundComponent } from './not-found/not-found.component';
import { DialogModule } from 'primeng/dialog';
import { LoaderComponent } from './loader/loader.component';
import { LoaderInterceptorService } from './services/loader-interceptor.service';
import { CompanyDetailsViewComponent } from './company-details-view/company-details-view.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { CompanyManagementComponent } from './company-management/company-management.component';
import { CompanyContactComponent } from './company-contact/company-contact.component';
import { AdminFormComponent } from './admin-form/admin-form.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RolesComponent } from './roles/roles.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SettingsComponent } from './settings/settings.component';
import {PasswordModule} from 'primeng/password';
import {KeyFilterModule} from 'primeng/keyfilter';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    NotFoundComponent,
    LoaderComponent,
    CompanyDetailsViewComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CompanyManagementComponent,
    CompanyContactComponent,
    AdminFormComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RolesComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AutoCompleteModule,
    TableModule,
    ButtonModule,
    TooltipModule,
    DialogModule,
    CheckboxModule,
    InputSwitchModule,
    PasswordModule,
    KeyFilterModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
