// src/app/edit-profil/edit-profil.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { EditProfilPageRoutingModule } from './edit-profil-routing.module';
import { EditProfilPage } from './edit-profil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfilPageRoutingModule,
    EditProfilPage // Import komponen standalone
  ]
})
export class EditProfilPageModule {} // Nama class yang sesuai dengan app-routing.module.ts
