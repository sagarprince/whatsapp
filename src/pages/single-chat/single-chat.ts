// Import Angular Core Controllers.
import { Component, ViewChild, ElementRef } from '@angular/core';

// Import Ionic Controllers.
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { AfoListObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';

@IonicPage({
  name: 'single-chat-page'
})

@Component({
  selector: 'page-single-chat',
  templateUrl: 'single-chat.html',
})
export class SingleChat {

  @ViewChild('conversationContainer') _conversationContainer: ElementRef;

  messages: AfoListObservable<any[]>;

  toMessages:  AfoListObservable<any[]>;

  allMessages: Array<any> = [];

  message: string = '';

  fullName: string = '';

  mobileNumber: number;

  toMobileNumber: number;

  toName: string = '';

  constructor(private storage: Storage, 
  public navCtrl: NavController, 
  public navParams: NavParams,
  private offlineFirebaseDatabase: AngularFireOfflineDatabase) {

    this.toMobileNumber = navParams.get('toMobileNumber');
    this.toName = navParams.get('toName');

    console.log(this.toMobileNumber);
    console.log(this.toName);
  }

  ionViewDidLoad() {  
    this.storage.get('userDetails').then((data: any) => {
      if (data !== null) {
        console.log(data);
        this.fullName = data.fullName;
        this.mobileNumber = data.mobileNumber;

        let singleChatNodeFrom = this.mobileNumber + '-' + this.toMobileNumber;
        this.messages = this.offlineFirebaseDatabase.list('/' + singleChatNodeFrom + '/messages');
        this.messages.subscribe((allMessages) => {
          this.allMessages = allMessages;
          this.allMessages.forEach((message) => {           
            if (message.mobileNumber !== this.mobileNumber && message.sent === false) {
              console.log(message);
              console.log('from ----');
              this.messages.update(message.$key, {
                sent: true
              });
            }            
          });
          this.scrollToBottom();
        });

        let singleChatNodeTo = this.toMobileNumber + '-' + this.mobileNumber;
        this.toMessages = this.offlineFirebaseDatabase.list('/' + singleChatNodeTo + '/messages');
        this.toMessages.subscribe((allMessages) => {
          allMessages.forEach((message) => {
            if (message.mobileNumber !== this.mobileNumber && message.sent === false) {
              console.log('to ----');
              this.toMessages.update(message.$key, {
                sent: true
              });
            }            
          });
        });

      }
    });
  }

  sendMessage() {  
    if (this.message !== '') {
      let timestamp = new Date().getTime();

      let messagePayload = {
        text: this.message,
        mobileNumber: this.mobileNumber,
        name: this.fullName,
        time: timestamp,
        sent: false
      };

      this.messages.push(messagePayload);
      this.toMessages.push(messagePayload);

      this.message = '';
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this._conversationContainer.nativeElement.scrollTop = this._conversationContainer.nativeElement.scrollHeight;
    }, 200);    
  }

}
