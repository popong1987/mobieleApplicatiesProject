import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DcaTradePageRoutingModule } from './dca-trade-routing.module';

import { DcaTradePage } from './dca-trade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DcaTradePageRoutingModule
  ],
  declarations: [DcaTradePage]
})
export class DcaTradePageModule {}
