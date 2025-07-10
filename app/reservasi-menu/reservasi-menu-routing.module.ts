import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservasiMenuPage } from './reservasi-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ReservasiMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservasiMenuPageRoutingModule {}
