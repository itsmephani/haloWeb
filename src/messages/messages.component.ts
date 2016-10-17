import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {App} from '../app/app.component';
import {APP_CONSTANTS} from '../constants/app-constants';
import {IUser} from '../models/iuser';
import {Search} from '../search/search.component';
import {RestService} from '../services/rest-service';

@Component({
  selector: 'messages',
  templateUrl: 'messages.html',
  providers: [RestService]
})
export class Messages {
  chatroomId: string;
  sub: any;
  messages: Array<any> = [];
  message: any;
  currentUser: IUser|void;

  constructor(private route: ActivatedRoute, private restService: RestService,
      private router: Router) {
    this.message = {message: ''};
    this.currentUser = App.currentUser;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       if (params['chatroomId']) {
         this.chatroomId = params['chatroomId'];
         this.getMessages();
         this.subscribeToMessagesOfChatroom();
       }
    });
  }

  getMessages() {
    this.restService.all('chatrooms/' + this.chatroomId + '/messages', {}).
      subscribe(response => {
        this.messages = response.json()['data'];
      });
  }

  subscribeToMessagesOfChatroom() {
    var app = app || {};
    var ActionCable = window['ActionCable'];
    app.cable = ActionCable.createConsumer(APP_CONSTANTS['ACTION_CABLE_BASE_URL']);
    app.cable.subscriptions.create({
        channel:'MessagesChannel',
        chatroom_id: this.chatroomId
      }, {
        received: function(data) {
          this.message = {message: ''};
          this.messages = this.messages || [];
          this.messages.push(data)
        }.bind(this)
      });
  }

  sendMessage() {
    this.message['chatroom_id'] = this.chatroomId;
    this.restService.create('chatrooms/' + this.chatroomId + '/messages', {message: this.message}).
      subscribe(response => {
        this.message = {message: ''}; 
        //this.messages.push(response.json()['data']);
      });
  }
}
