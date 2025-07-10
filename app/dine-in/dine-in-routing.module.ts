import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DineInPage } from './dine-in.page';
import { CanDeactivateGuardService } from '../service/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: '',
    component: DineInPage,
    canDeactivate:[CanDeactivateGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DineInPageRoutingModule {}
