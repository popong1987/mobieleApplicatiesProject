import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MarketsPageRoutingModule } from './markets-routing.module';

import { MarketsPage } from './markets.page';
import {SwiperModule} from "swiper/angular";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MarketsPageRoutingModule,
        SwiperModule
    ],
  declarations: [MarketsPage]
})
export class MarketsPageModule {}
