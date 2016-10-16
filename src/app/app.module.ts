import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { App } from './app.component';
import { Chat } from '../chat/chat.component';
import { Login } from '../login/login.component';
import { Post } from '../post/post.component';
import { Profile } from '../profile/profile.component';
import { Search } from '../search/search.component';
import { Tabs } from '../tabs/tabs.component';

@NgModule({
  declarations: [
    App,
    Chat,
    Login,
    Post,
    Profile,
    Search,
    Tabs
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [App]
})
export class AppModule { }
