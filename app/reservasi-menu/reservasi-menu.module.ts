import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservasiMenuPageRoutingModule } from './reservasi-menu-routing.module';

import { ReservasiMenuPage } from './reservasi-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservasiMenuPageRoutingModule
  ],
  declarations: [ReservasiMenuPage]
})
export class ReservasiMenuPageModule {}
