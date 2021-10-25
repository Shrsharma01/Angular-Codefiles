import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { UserModModule } from '../user-mod/user-mod.module';
import { UserService } from '../shared/user.service';
import { ReferService } from '../shared/refer.service';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

 
@NgModule({
  declarations: [
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    UserModModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:[
    AdminPageComponent
  ],
  providers: [UserService, ReferService]
})
export class AdminModModule { }
