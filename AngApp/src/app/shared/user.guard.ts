import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  
  constructor(private route: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(sessionStorage.getItem('token') != null && sessionStorage.getItem('role') != "admin123")
      return true;
    else{
      alert("Login as a User First!!");
      this.route.navigate(["/user/login"]);
      return false;
    }
  }
  
}
