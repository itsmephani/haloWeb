import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {App} from '../app/app.component';
import {IUser} from '../models/iuser';
import {RestService} from '../services/rest-service';
import {Search} from '../search/search.component';


@Component({
  selector: 'chat',
  templateUrl: 'chat.html',
  providers: [RestService]
})
export class Chat {
  public chatrooms: Array<any> = [];
  public friendships: Array<any> = [];
  public currentUser: IUser|void;

  constructor(private restService: RestService, private router: Router) {
    this.currentUser = App.currentUser;
    this.getAllFriends();
    // this.getAllChatrooms();
  }

  getAllFriends() {
    this.restService.all('friendships?scope=having_user', {}, {}).
        subscribe(response => {
          this.friendships = response.json()['data'];
        });
  }

  // getAllChatrooms() {
  //   this.restService.all('chatrooms?scope=having_user', {}, {}).
  //       subscribe(response => {
  //         this.chatrooms.push(response.json()['data']);
  //       });
  // }

  createChatRoom (friend) {
    let friend_id = App.currentUser['id'] == friend['user_id'] ? friend['friend_id'] : friend['user_id']
    let chatroom = {
      user_id: App.currentUser['id'],
      friend_id: friend_id
    };
    this.restService.create('chatrooms', {chatroom: chatroom}, {}).
        subscribe(response => {
          let chatroom = response.json()['data'];
          this.router.navigate(['/chat/' + chatroom.id + '/messages']);
        });
  }
}
