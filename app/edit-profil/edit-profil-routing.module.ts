// src/app/edit-profil/edit-profil-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfilPage } from './edit-profil.page'; // Pastikan nama class sesuai

const routes: Routes = [
  {
    path: '',
    component: EditProfilPage // Gunakan EditProfilPage (bukan EditProfilePage)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditProfilPageRoutingModule {} // Nama class yang benar
