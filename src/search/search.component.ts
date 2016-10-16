import { App } from '../app/app.component';
import { APP_CONSTANTS } from '../constants/app-constants';
import { Component } from '@angular/core';
import { IUser } from '../models/iuser';
import { RestService } from '../services/rest-service';

@Component({
  selector: 'search',
  templateUrl: 'search.html',
  providers: [RestService]
})
export class Search {
  private keyword: string;
  public results: Array<any> = [];
  private showResults: boolean = false;
  private currentUser: IUser|void;

  constructor(private restService: RestService) {
    this.currentUser = App.currentUser;
  }

  searchUser() {
    if (!this.keyword) {
      this.showResults = false;
    } else if (this.keyword.length > 2) {
      let url = 'users?scope=search&q=' + this.keyword;
      this.restService.all(url, {}, {})
        .subscribe(response => {
          this.showResults = true;
          this.results = response.json()['data'];
        });
    }
  }

  avatarUrl(user): string|null|undefined {
    let url = user.avatar ? user.avatar.url : '';
    if (url && url.indexOf('http') == -1) {
      url = APP_CONSTANTS['HOST_URL'] + url;;
    }
    return url;
  }

  addFriend(user) {
    if(user.id !== this.currentUser['id']) {
      this.restService.create('friendships', {friend_id: user.id}, {}).
        subscribe(response => {
          user['is_friend'] = true;
        });
    }
  }

}
