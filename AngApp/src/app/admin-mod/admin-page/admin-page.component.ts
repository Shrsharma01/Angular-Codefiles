import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Refer } from 'src/app/shared/refer.model';
import { ReferService } from 'src/app/shared/refer.service';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  userData : any;

  formData = this.refService.refForms;

  key: boolean;

  form: NgForm ;

  x: any;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  userInfodata:User[];

  constructor(private route: Router, public service: UserService,public refService:ReferService,private observer: BreakpointObserver) { }

  
  ngOnInit(): void {

    this.refService.getList();

    this.service.getUserList().subscribe(
      res => {
        this.userInfodata = (res as User[]);

      },  
      err => {
        console.log(err);
      }
    );

    this.service.getUserProfile().subscribe(
      res => {
        this.userData = res;

      }, 
      err => {
        console.log(err);
      }
    );
  }

  handleAdd()
  {
    this.route.navigate(["/register"]);
  }

  handleLogout()
  { 
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.route.navigate(['/user/login']);
  }
 
  resetform( form : NgForm)
  {
    form.form.reset();
    this.formData = new Refer();
  }
  
  handleUpdate(record: Refer)
  {
    if(confirm("Are you sure you wanna approve!"))
    {
      console.log(record);
      this.x = record.id;
    }
  }

  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
}
