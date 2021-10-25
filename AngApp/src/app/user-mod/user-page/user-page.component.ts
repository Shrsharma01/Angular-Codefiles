import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Refer } from 'src/app/shared/refer.model';
import { ReferService } from 'src/app/shared/refer.service';
import { UserService } from 'src/app/shared/user.service';
import { delay } from 'rxjs/operators';
import { NotifierService } from 'src/app/shared/notifier.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit { 

  userData : any;

  formData = this.refService.refForms;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  candName : any;

  constructor(private route: Router, private service: UserService, public refService:ReferService, private observer: BreakpointObserver,public notifService: NotifierService, private toastr: ToastrService) { }

  ngOnInit() : void {

    this.refService.getList();

    this.service.getUserProfile().subscribe(
      res => {
        this.userData = res; 

      },
      err => {
        console.log(err);
      }
    );
  }

  handleLogout()
  {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.route.navigate(['/user/login']);
  }

  handleRefer()
  {
    this.route.navigate(['/formpage']);
  }
  
  resetform( form : NgForm)
  {
    form.form.reset(); 
    this.formData = new Refer();
  }

  handleDel(id:number)
  {
    if(confirm("Are you sure you wanna delete the record!"))
    {
      this.refService.delReferralDetail(id).subscribe(
        res => {
          this.refService.getList();
          this.toastr.success("Record Delete Successful.","Done!!")
        },
        err => {
          console.log(err);
        }
      );
    }
    
  }

  // searchData()
  // {
  //   if(this.candName == "")
  //   {
  //     this.ngOnInit();
  //   }
  //   else{
  //     this.userData = this.userData.filter(res => {
  //       return res.candName.toLocaleLowerCase().match(this.candName.toLocaleLowerCase());
  //     })
  //   }
  // }

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
