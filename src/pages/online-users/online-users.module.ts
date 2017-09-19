import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnlineUsers } from './online-users';

@NgModule({
  declarations: [
    OnlineUsers,
  ],
  imports: [
    IonicPageModule.forChild(OnlineUsers),
  ],
})
export class OnlineUsersModule {}
