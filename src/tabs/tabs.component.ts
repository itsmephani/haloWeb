import {Component} from '@angular/core';
import { ActivatedRoute, Router, RouterState }   from '@angular/router';

import {Post} from '../post/post.component';
import {Chat} from '../chat/chat.component';
import {Profile} from '../profile/profile.component';


@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class Tabs {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tabs: any = [
    { title: 'Feed', icon: 'pulse', path: 'feed' },
    { title: 'Chat', icon: 'chatbubbles', path: 'chat'  },
    { title: 'Profile', icon: 'person', path: 'profile'  }
  ];

  constructor(router: Router) {
    const state: RouterState = router.routerState;
    const root: ActivatedRoute = state.root;
    console.log(router.url);
  }

  isActiveTab(path): boolean {
    return window['location']['pathname']['includes'](path);
  }

  
}
