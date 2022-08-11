import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrawlPage } from './brawl.page';

const routes: Routes = [
  {
    path: '',
    component: BrawlPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrawlPageRoutingModule {}
