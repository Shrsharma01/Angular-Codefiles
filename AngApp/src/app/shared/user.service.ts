import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  formControls : any;
  
  constructor(private fb: FormBuilder, private http: HttpClient) { }
  readonly BaseURL = 'http://localhost:52870/api';
  readonly baseURL = 'http://localhost:52870/api/UserProfile';

  userInfodata:User[];

  formModel = this.fb.group(
  {
    Username : ['',[ Validators.required]], 
    Email : ['', [Validators.required, Validators.email]],
    FullName : ['', [Validators.required]],
    Password  : ['', [Validators.required, Validators.minLength(4)]]
  });
   
  register() {
    var body = 
    {
      Username: this.formModel.value.Username,
      Email: this.formModel.value.Email,
      FullName: this.formModel.value.FullName,
      Password: this.formModel.value.Password
    };
    return this.http.post(this.BaseURL + '/ApplicationUser/Register', body);
  }

  login(formData)
  {
    return this.http.post(this.BaseURL + '/ApplicationUser/Login', formData);
  } 
  
  getUserProfile()
  {
    // var tokenHeader = new HttpHeaders({'Authorization':`Bearer` + sessionStorage.getItem('token')});
    let token = "Bearer "+sessionStorage.getItem('token');
    let header = new HttpHeaders({ 
            "Content-Type": "application/json",
            "Authorization": token
    });
    return this.http.get(this.BaseURL + '/UserProfile', {headers: header});
  }

  getUserList()
  {
    let token = "Bearer "+sessionStorage.getItem('token');
    let header = new HttpHeaders({ 
            "Content-Type": "application/json",
            "Authorization": token
    });
    return this.http.get(this.baseURL,{headers: header});
  }
}
