import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrawlPage } from './brawl.page';

import { BrawlPageRoutingModule } from './brawl-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BrawlPageRoutingModule,
    SharedModule
  ],
  declarations: [BrawlPage]
})
export class BrawlPageModule {}
