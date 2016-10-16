import {Component} from '@angular/core';
import {Post} from '../post/post.component';
import {Chat} from '../chat/chat.component';
import {Profile} from '../profile/profile.component';


@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class Tabs {
  activeTab: string = 'post';
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tabs: any = [
    { title: 'Feed', icon: 'pulse', selector: 'post' },
    { title: 'Chat', icon: 'chatbubbles', selector: 'chat'  },
    { title: 'Profile', icon: 'person', selector: 'profile'  }
  ];

  isActiveTab(selector): boolean {
    return selector == this.activeTab;
  }

  setActiveTab(selector) {
    this.activeTab = selector;
  }

  
}
