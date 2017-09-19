// Import Angular Core Controllers.
import { Component } from '@angular/core';

// Import Ionic Controllers.
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Import Angular Reactive Form Controllers.
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Storage } from '@ionic/storage';

@IonicPage({
  name: 'login-page'
})

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  login: FormGroup;

  constructor(private formBuilder: FormBuilder, 
  public navCtrl: NavController, 
  public navParams: NavParams, 
  private storage: Storage) {

    this.login = this.formBuilder.group({
      mobileNumber: new FormControl('', [Validators.required]),
      fullName: new FormControl('', [Validators.required])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }

  onLogin({ value, valid }: { value: any, valid: boolean }) {
    if (valid) {
      this.storage.set('userDetails', value);
      this.navCtrl.setRoot('chat-page');
    }
  }

}
