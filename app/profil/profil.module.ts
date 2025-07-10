// src/app/profil/profil.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilPageRoutingModule } from './profil-routing.module';

import { ProfilPage } from './profil.page'; // Pastikan path ini benar

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilPageRoutingModule
  ],
  declarations: [] // <-- TAMBAHKAN ProfilPage DI SINI
})
export class ProfilPageModule {}
