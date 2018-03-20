import { Location } from '@angular/common';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private auth: AuthService, private location: Location, private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((val) => {
      this.isLoggedIn = this.auth.isLoggedIn();
      
    });
  }


  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
    location.replace('/login');
  }
}
