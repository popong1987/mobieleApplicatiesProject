import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DcaTradePage } from './dca-trade.page';

const routes: Routes = [
  {
    path: '',
    component: DcaTradePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DcaTradePageRoutingModule {}
