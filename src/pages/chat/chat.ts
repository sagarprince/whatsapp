// Import Angular Core Controllers.
import { Component, ViewChild, ElementRef } from '@angular/core';

// Import Ionic Controllers.
import { IonicPage, Nav, NavController, NavParams } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import { AfoListObservable, AfoObjectObservable, AngularFireOfflineDatabase } from 'angularfire2-offline/database';


@IonicPage({
  name: 'chat-page'
})

@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class Chat {

  @ViewChild('conversationContainer') _conversationContainer: ElementRef;

  // messages: FirebaseListObservable<any[]>;
  messages: AfoListObservable<any[]>;

  allMessages: Array<any> = [];

  message: string = '';

  fullName: string = '';

  mobileNumber: number;

  user: FirebaseObjectObservable<any>;

  constructor(private storage: Storage, 
  public navCtrl: NavController, 
  public navParams: NavParams,
  private firebaseDb: AngularFireDatabase,
  private offlineFirebaseDatabase: AngularFireOfflineDatabase,
  private _nav: Nav) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Chat');
    this.storage.get('userDetails').then((data: any) => {
      if (data !== null) {

        this.fullName = data.fullName;
        this.mobileNumber = data.mobileNumber;

        this.user = this.firebaseDb.object('/users/'+this.mobileNumber);

        this.user.set({
          name: this.fullName,
          state: 'online'
        });

        this.user.$ref.onDisconnect().update({
          state: 'offline'
        });
      }
    });

    // this.messages = this.firebaseDb.list('/group/messages', {
    //   query: {
    //     orderByChild: 'time'
    //   }
    // });

    // this.messages.subscribe((allMessages) => {
    //   this.allMessages = allMessages;
    //   this.scrollToBottom();
    // });

    this.messages = this.offlineFirebaseDatabase.list('/group/messages', {
      query: {
        orderByChild: 'time'
      }
    });

    this.messages.subscribe((allMessages) => {
      this.allMessages = allMessages;
      this.scrollToBottom();
    });
    
  }

  sendMessage() {  
    if (this.message !== '') {
      let timestamp = new Date().getTime();

      this.messages.push({
        text: this.message,
        mobileNumber: this.mobileNumber,
        name: this.fullName,
        time: timestamp,
        sent: false
      }).then((data) => {
        setTimeout(()=> {
          data.update({
            sent: true
          });
        }, 900);
      }).catch((error) => {
        console.log(error);
      });

      this.message = '';
      this.scrollToBottom();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      this._conversationContainer.nativeElement.scrollTop = this._conversationContainer.nativeElement.scrollHeight;
    }, 200);    
  }

  gotoOnlineUsers() {
    this._nav.push(
      'online-users-page', 
      {
        mobileNumber: this.mobileNumber
      },
      {
        animate: true,
        animation: 'ios-transition',
        direction: 'forward'
      }
    );
  }

}
