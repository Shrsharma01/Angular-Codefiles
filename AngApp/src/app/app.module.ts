import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './admin-mod/register/register.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { UserService } from './shared/user.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FirstPageComponent } from './first-page/first-page.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { ErrPageComponent } from './err-page/err-page.component';
import { ReferService } from './shared/refer.service';
import { CommonModule } from '@angular/common';
import { AdminModModule } from './admin-mod/admin-mod.module';
import { UserModModule } from './user-mod/user-mod.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SearchPipeModule } from 'ng2-search-filter';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegisterComponent,
    FirstPageComponent,
    LogInComponent,
    ErrPageComponent
  ],
  
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminModModule,
    UserModModule,
    BrowserAnimationsModule,
    MaterialModule,
    ToastrModule.forRoot({
      timeOut: 1000,
        progressBar : true,
        positionClass: 'toast-top-center'
      }),
      Ng2SearchPipeModule
  ],
  providers: [UserService, ReferService],
  bootstrap: [AppComponent]
})
export class AppModule { }
