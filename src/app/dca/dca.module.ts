import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DCAPageRoutingModule } from './dca-routing.module';

import { DCAPage } from './dca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DCAPageRoutingModule
  ],
  declarations: [DCAPage]
})
export class DCAPageModule {}
