import { Component } from '@angular/core';

import { IUser } from '../models/iuser';
import { Login } from '../login/login.component';
import { Tabs } from '../tabs/tabs.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class App {
  static currentUser: IUser|void =
    localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')) : undefined;

  /**
   * If user loggedIn take him to posts page, 
   * else show login page.
   */
  currentUser: IUser|void = App.currentUser;
}
