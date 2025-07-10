import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PilihMejaPageRoutingModule } from './pilih-meja-routing.module';

import { PilihMejaPage } from './pilih-meja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PilihMejaPageRoutingModule
  ],
  declarations: [PilihMejaPage]
})
export class PilihMejaPageModule {}
