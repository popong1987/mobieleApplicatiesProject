import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketsPage } from './markets.page';

const routes: Routes = [
  {
    path: '',
    component: MarketsPage
  },
  {
    path: ':market-details',
    loadChildren: () => import('./markets-detail/markets-detail.module').then(m => m.MarketsDetailPageModule)
  },
  {
    path: ':market-details/:id',
    loadChildren: () => import('./markets-detail/markets-detail.module').then(m => m.MarketsDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketsPageRoutingModule {}
