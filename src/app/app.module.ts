import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule }   from '@angular/router';

import { App } from './app.component';
import { Chat } from '../chat/chat.component';
import { Login } from '../login/login.component';
import { Messages } from '../messages/messages.component';
import { Post } from '../post/post.component';
import { Profile } from '../profile/profile.component';
import { Search } from '../search/search.component';
import { Tabs } from '../tabs/tabs.component';

@NgModule({
  declarations: [
    App,
    Chat,
    Login,
    Messages,
    Post,
    Profile,
    Search,
    Tabs
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot([
      { path: '',  component: App },
      { path: 'chat', component: Chat},
      { path: 'chat/:chatroomId/messages', component: Messages},
      { path: 'feed', component: Post},
      { path: 'login', component: Login},
      { path: 'chat', component: Chat},
      { path: 'profile', component: Profile },
      { path: 'users/:id', component: Profile },
         
    ])
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
