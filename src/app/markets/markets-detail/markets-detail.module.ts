import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketsDetailPageRoutingModule } from './markets-detail-routing.module';

import { MarketsDetailPage } from './markets-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MarketsDetailPageRoutingModule
  ],
  declarations: [MarketsDetailPage]
})
export class MarketsDetailPageModule {}
