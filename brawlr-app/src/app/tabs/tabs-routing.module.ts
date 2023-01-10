import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { AuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToAccount = () => redirectUnauthorizedTo(['/tabs/account']);

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'account',
        loadChildren: () => import('../account/account.module').then(m => m.AccountPageModule)
      },
      {
        path: 'brawl',
        loadChildren: () => import('../brawl/brawl.module').then(m => m.BrawlPageModule),
        canActivate: [AuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToAccount}
      },
      {
        path: 'chat',
        loadChildren: () => import('../chat/chat.module').then(m => m.ChatPageModule),
        canActivate: [AuthGuard],
        data: {authGuardPipe: redirectUnauthorizedToAccount}
      },
      {
        path: '',
        redirectTo: '/tabs/brawl',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/brawl',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
