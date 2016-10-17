import { Component, OnInit } from '@angular/core';
import { Router }   from '@angular/router';

import { IUser } from '../models/iuser';
import { Login } from '../login/login.component';
import { Tabs } from '../tabs/tabs.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App implements OnInit {
  static currentUser: IUser|void =
    localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : undefined;
  isUserLoggedIn: boolean = false;
  
  /**
   * If user loggedIn take him to posts page, 
   * else show login page.
   */
  currentUser: IUser|void = App.currentUser;

  constructor(private router: Router) {
    this.isUserLoggedIn = !!App.currentUser;
  }

  ngOnInit() {
    if (!App.currentUser && !window['location']['pathname'].includes('login')) {
      //this.router.navigateByUrl('/feed');
      window.location.assign('/login');
    } else if (App.currentUser && 
        (window['location']['pathname'].includes('login') || window['location']['pathname'] == '/')) {
      //this.router.navigateByUrl('/login');
      window.location.assign('/feed');
    }
  }

  logout() {
    App.currentUser = undefined;
    localStorage.removeItem('currentUser');
    window.location.assign('/login');
  }

}
