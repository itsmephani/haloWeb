import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {IUser} from '../models/iuser';
import {App} from '../app/app.component';
import {Tabs} from '../tabs/tabs.component';
import {LoginService} from './login.service';


@Component({
  selector: 'login',
  templateUrl: 'login.html',
  providers: [LoginService]
})
export class Login implements OnInit{
  private user: IUser;
  private userAction: string = 'login';
  private myApp: any = App;
  private nav: any;
  
  constructor(private loginService: LoginService, private router: Router) {
    this.initUser();
  }
  
  ngOnInit() {
        
  }
  
  initUser() {
    this.user = {name: ''};
  }
  
  setCurrentUser(user: IUser) {
    this.myApp.currentUser = user;
    localStorage.setItem('currentUser', JSON.stringify(user));    
  }
  
  login() {
    this.loginService.login({user: this.user}).
      subscribe(response => {
        this.setCurrentUser(response.json()['data']);
        this.initUser();
        this.navigateToFeed();
      }, (error) => this.error(error));
  }
  
  signUp() {
    this.loginService.signUp({user: this.user}).
      subscribe(response => {
        this.setCurrentUser(response.json()['data']);
        this.initUser();
        this.navigateToFeed();
      });
  }

  error(errorSummary) {
    let errors = errorSummary.json().errors;
    alert('There is some problem, please try again with correct credentials' + errors);
  }

  navigateToFeed() {
    this.router.navigate(['/feed']);
  }
}
