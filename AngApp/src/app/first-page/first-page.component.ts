import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit {

  constructor(private route: Router) { }

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

}
