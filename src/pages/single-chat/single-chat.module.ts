import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleChat } from './single-chat';

@NgModule({
  declarations: [
    SingleChat,
  ],
  imports: [
    IonicPageModule.forChild(SingleChat),
  ],
})
export class SingleChatModule {}
