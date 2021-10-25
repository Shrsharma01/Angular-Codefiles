import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  
  constructor(private route: Router) {
    
    
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(sessionStorage.getItem('token') != null && sessionStorage.getItem('role') == "admin123")
      return true;
    else{
      alert("Login as a Admin First!!");
      this.route.navigate(["/user/login"]);
      return false;
    }
  }
  
}
