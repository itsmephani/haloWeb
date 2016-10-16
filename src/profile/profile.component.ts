import {APP_CONSTANTS} from '../constants/app-constants';
import {App} from '../app/app.component';
import {Component} from '@angular/core';
import {IUser} from '../models/iuser';
import {RestService} from '../services/rest-service';


@Component({
  selector: 'profile',
  templateUrl: 'profile.html',
  providers: [RestService]
})
export class Profile {
  userProfile: IUser|void;
  editMode: boolean = false;

  constructor(private restService: RestService) {
    this.userProfile = App.currentUser;
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

}
