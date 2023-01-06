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
    component: MarketsDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketsDetailPageRoutingModule {}
