import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('conversationContainer') _conversationContainer: ElementRef;

  messages: Array<any> = [];

  message: string = '';

  constructor(public navCtrl: NavController) {
    this.messages = [
      {
        text: "What happend last night?",
        me: true,
        sent: true,
        viewed: true,
        time: "10:33 PM"
      },
      {
        text: "You were drunk",
        me: false,
        time: "11:33 PM"
      },
      {
        text: "No I wasn't",
        me: true,
        sent: true,
        viewed: false,
        time: "10:33 PM"
      }
    ]
  }

  sendMessage() {  
    if (this.message !== '') {
      this.messages.push({
        text: this.message,
        me: true,
        sent: true,
        viewed: false,
        time: "10:50 PM"
      });
      this.message = '';
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    this._conversationContainer.nativeElement.scrollTop = this._conversationContainer.nativeElement.scrollHeight;
  }

}
