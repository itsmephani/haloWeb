import {Component} from '@angular/core';

@Component({
  selector: 'chat',
  templateUrl: 'chat.html',
})
export class Chat {

  constructor() {
    console.log(window['ActionCable']);

  }
}
