import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrawlPage } from './brawl.page';

import { BrawlPageRoutingModule } from './brawl-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    BrawlPageRoutingModule
  ],
  declarations: [BrawlPage]
})
export class BrawlPageModule {}
