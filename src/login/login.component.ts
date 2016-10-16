import {Component, OnInit} from '@angular/core';
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
  
  constructor(private loginService: LoginService) {
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
      }, (error) => this.error(error));
  }
  
  signUp() {
    this.loginService.signUp({user: this.user}).
      subscribe(response => {
        this.setCurrentUser(response.json()['data']);
        this.initUser();
      });
  }

  error(errorSummary) {
    let errors = errorSummary.json().errors;
  }
}
