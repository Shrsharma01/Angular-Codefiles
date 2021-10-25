import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './admin-mod/admin-page/admin-page.component';
import { ErrPageComponent } from './err-page/err-page.component';
import { FirstPageComponent } from './first-page/first-page.component';
import { AdminGuard } from './shared/admin.guard';
import { UserGuard } from './shared/user.guard';
import { ReferFormComponent } from './user-mod/refer-form/refer-form.component';
import { UserPageComponent } from './user-mod/user-page/user-page.component';
import { LogInComponent } from './user/log-in/log-in.component';
import { RegisterComponent } from './admin-mod/register/register.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path:'',redirectTo:'/firstpage',pathMatch:'full'
  },
  {
    path: 'user', component: UserComponent,
    
    children:
    [
      { path: 'login', component: LogInComponent }
    ]
  },

  { 
    path: 'register', component: RegisterComponent, canActivate:[AdminGuard] 
  },
  
  {
    path:'firstpage', component: FirstPageComponent
  },
  {
    path: 'adminpage', component: AdminPageComponent, canActivate:[AdminGuard]
  },
  {
    path: 'userpage', component: UserPageComponent, canActivate:[UserGuard]
  },
  {
    path: 'formpage', component: ReferFormComponent, canActivate:[UserGuard]
  },
  
  {
    path: '**', component: ErrPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
