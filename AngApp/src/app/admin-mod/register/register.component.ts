import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { delay } from 'rxjs/operators';
import { NotifierService } from 'src/app/shared/notifier.service';
import { ReferService } from 'src/app/shared/refer.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  constructor(public service: UserService, private route: Router,public notifService: NotifierService, private toastr: ToastrService, private observer: BreakpointObserver, public refService: ReferService) { }

  formControl : any;
  formSubmit : boolean = false;
  userData : any;

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  ngOnInit(): void {

    this.service.formModel.reset();
    this.formControl = this.service.formModel.controls;

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


  handleRegister()
  {
    this.service.register().subscribe(
      (res:any) =>{
        this.formSubmit = true;
        if(this.service.formModel.invalid)
        {
          // alert("invalid form");
          this.toastr.warning("Invalid Form","Error")
          return;
        }
        else 
        {
          if(res.succeeded == false)
          {
            res.errors.forEach((ele:any) => {
              switch(ele.code)
              {
                case 'DuplicateUserName':
                  // alert('Username is already taken');
                  // this.toastr.error("Username is already taken","Error")
                  this.notifService.showNotif("User already taken","OK");
                  break;
    
                default:
                  // alert(ele.description);
                  this.toastr.error(ele.description,"Error")
                  break; 
              }
              
            });
          }
          else{
            this.toastr.success("New User Created","Registration Successful!!")
            this.route.navigate(["/user/login"]);
          }
        }

      },
      err => {
        this.formSubmit = false;
        if(this.service.formModel.invalid)
        {
          alert("invalid form");
          return;

        }
      }
    );
  }

  handleLogout()
  {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    this.route.navigate(['/user/login']);
  }

  handleDash()
  {
    this.route.navigate(['/adminpage']) 
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

