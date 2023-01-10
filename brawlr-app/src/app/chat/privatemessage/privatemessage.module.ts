import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrivateMessagePageRoutingModule } from './privatemessage-routing.module';

import { PrivateMessagePage } from './privatemessage.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrivateMessagePageRoutingModule,
    SharedModule
  ],
  declarations: [PrivateMessagePage]
})
export class PrivateMessagePageModule {}
