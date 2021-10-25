import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private service: UserService, private route: Router, private toastr: ToastrService) { }

  formModel={
    Username : '',
    Password : '' 
  }
  formSubmit: boolean = false;
  ngOnInit(): void {
    if(sessionStorage.getItem('token') != null && sessionStorage.getItem('role') != "admin123")
    {
      this.route.navigate(['/userpage']);
    }
    else if(sessionStorage.getItem('token') != null && sessionStorage.getItem('role') == "admin123")
    {
      this.route.navigate(['/adminpage']);
    }
  }

  handleLogin(form: NgForm)
  {
    this.service.login(form.value).subscribe(
      (res: any) => 
      {
        sessionStorage.setItem('token', res.token);
        sessionStorage.setItem('role',form.value.Username);
        if ((sessionStorage.getItem('role')) == 'admin123')
        {
          // alert("Login Successful!");
          this.toastr.success("Login Successful","Welcome!!");
        this.route.navigateByUrl('/adminpage');
        }
        else{
          // alert("Login Successful!");
          this.toastr.success("Login Successful","Welcome!!");
          this.route.navigateByUrl('/userpage');
        }
        
      },
      err => 
      {
        if (err.status == 400)
          // alert('Incorrect username or password.');
          this.toastr.error("Incorrect username or password","Error!!");
        else
          console.log(err);
      });
  }

}
