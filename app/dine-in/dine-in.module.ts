import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DineInPageRoutingModule } from './dine-in-routing.module';

import { DineInPage } from './dine-in.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DineInPageRoutingModule
  ],
  declarations: [DineInPage]
})
export class DineInPageModule {}
