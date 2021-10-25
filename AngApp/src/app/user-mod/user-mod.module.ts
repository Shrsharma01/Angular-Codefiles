import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import { UserService } from '../shared/user.service';
import { ReferFormComponent } from './refer-form/refer-form.component';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { ReferService } from '../shared/refer.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    UserPageComponent,
    ReferFormComponent
  ], 
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule, 
    MaterialModule
  ],
  exports:[
    UserPageComponent,
    ReferFormComponent
  ],
  providers: [UserService, ReferService]
}) 
export class UserModModule { }
