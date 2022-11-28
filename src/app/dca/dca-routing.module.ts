import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DCAPage } from './dca.page';

const routes: Routes = [
  {
    path: '',
    component: DCAPage
  },
  {
    path: 'dca-trade',
    loadChildren: () => import('../dca-trade/dca-trade.module').then( m => m.DcaTradePageModule)
  },
  {
    path: 'dca-trade/:id',
    loadChildren: () => import('../dca-trade/dca-trade.module').then( m => m.DcaTradePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DCAPageRoutingModule {}
