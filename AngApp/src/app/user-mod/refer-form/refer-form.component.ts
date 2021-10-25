import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { Refer } from 'src/app/shared/refer.model';
import { ReferService } from 'src/app/shared/refer.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-refer-form',
  templateUrl: './refer-form.component.html',
  styleUrls: ['./refer-form.component.css']
})
export class ReferFormComponent implements OnInit {

  constructor(public refService: ReferService,private service: UserService, private route: Router,  private observer: BreakpointObserver, private toastr: ToastrService) { }

  formData = this.refService.refForms;
  updateInfo: boolean = false;

  userData : any;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  ngOnInit(): void {

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

  handleReferral(form: NgForm)
  {
    if(form.invalid)
    {
      this.toastr.error("Form Is Invalid.","Error!!");
      return;
    }
    else{
      // this.formData.status = "Approve";
      console.log(form);
      this.insertData(form);
      this.toastr.success("New Referral Submitted","Done!!");
    }

    
  }

  insertData(form: NgForm)
  {
    this.refService.postReferralDetail().subscribe(
      res => {
        this.resetform(form);  
        this.refService.getList();
        this.toastr.success("Form Submission Successful","Done!!");
        // location.reload();
      },
      err => {
        if(err.status == '409')
        {
          this.toastr.warning("Duplicate ID","Oops!!")
        }
        console.log(err);
      }
    );

  }

  resetform( form : NgForm)
  {
    form.form.reset();
    this.formData = new Refer();
  }

  updateForm(record: Refer, id:string)
  {
    this.formData = Object.assign({}, record ); 
  }

  updateData(form: NgForm, id: string)
  {
    this.refService.putReferralDetail().subscribe(
      (res : any) => {
        this.resetform(form);
        this.refService.getList();
        alert(" Update Succesful!!");
      },
      err => {
        console.log(err);
      }
    );
  }

  handleDel(id:number)
  {
    if(confirm("Are you sure you wanna delete the record!"))
    {
      this.refService.delReferralDetail(id).subscribe(
        res => {
          this.refService.getList();
          alert("Deleted Successfuly!!")
        },
        err => {
          console.log(err);
        }
      );
    }
    
  }

  handleDash()
  {
    this.route.navigate(['/userpage']) 
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
