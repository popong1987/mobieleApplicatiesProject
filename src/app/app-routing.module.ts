import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'markets',
    loadChildren: () => import('./markets/markets.module').then( m => m.MarketsPageModule)
  },
  {
    path: 'dca',
    loadChildren: () => import('./dca/dca.module').then( m => m.DCAPageModule)
  },
  {
    path: 'dca-trade',
    loadChildren: () => import('./dca-trade/dca-trade.module').then( m => m.DcaTradePageModule)
  },
  {
    path: 'markets-detail',
    loadChildren: () => import('./markets/markets-detail/markets-detail.module').then(m => m.MarketsDetailPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
