import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {APP_CONSTANTS} from '../constants/app-constants';
import {App} from '../app/app.component';
import {IUser} from '../models/iuser';
import {IPost} from '../models/ipost';
import {RestService} from '../services/rest-service';


@Component({
  selector: 'profile',
  templateUrl: 'profile.html',
  providers: [RestService]
})
export class Profile {
  id: string;
  userProfile: IUser|void;
  editMode: boolean = false;
  post: IPost;
  isCurrentUserProfile: boolean = false;
  private sub: any;

  constructor(private route: ActivatedRoute, private restService: RestService,
      private router: Router) {
    this.post = {content: ''};
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = params['id'];
       if (this.id && (this.id != App.currentUser['id'])) {
        this.isCurrentUserProfile = false;
        this.restService.get('users/' + this.id, {}, {}).
          subscribe(response => {
            this.userProfile = response.json()['data'];
          });
       } else {
          this.userProfile = App.currentUser;
          this.isCurrentUserProfile = true;
       }
    });
  }
  
  updateProfile() {
    let xhr:XMLHttpRequest = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            let userProfile = response.data;
            this.userProfile = userProfile;
            localStorage.setItem('currentUser', JSON.stringify(userProfile));
            App.currentUser = this.userProfile;
            this.editMode = false;
          }
      }
    };

    let url = APP_CONSTANTS['BASE_URL'] + 'users';
    xhr.open('PUT', url, true);
    xhr.setRequestHeader('Authorization', 'Token token=' + App.currentUser['access_token']);
    xhr.send(this.createFormData());
  }

  createFormData(): FormData {
    let formData = new FormData();
    formData.append('user[name]', this.userProfile['name']);
    formData.append('user[avatar]', document.getElementById('avatar')['files'][0]);
    return formData;
  }

  avatarUrl(): string {
    let url = this.userProfile['avatar']['url'];
    if ( url && url.indexOf('http') == -1 ) {
      url = APP_CONSTANTS['HOST_URL'] + url;
    }
    return url;
  }

  postOnProfile() {
    if (!this.isCurrentUserProfile) {
      this.post['poster_id'] = App.currentUser['id'];
    }
    this.post['user_id'] = this.userProfile['id'];
    this.restService.create('posts', {post: this.post}, {}).
      subscribe(response => {
        this.post = {content: ''};
        alert('Posted succesfully, please check in the feed');
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
