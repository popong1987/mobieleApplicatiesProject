import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketsDetailPage } from './markets-detail.page';

const routes: Routes = [
  {
    path: '',
    component: MarketsDetailPage
  },
  {
    path: 'markets-detail/:id',
    loadChildren: () => import('./markets-detail.module').then(m => m.MarketsDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketsDetailPageRoutingModule {}
