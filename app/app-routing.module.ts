import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { GuestGuard } from './service/guest.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
    // canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [GuestGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then( m => m.AccountPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dine-in/:tipe',
    loadChildren: () => import('./dine-in/dine-in.module').then( m => m.DineInPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'profil',
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'order-detail',
    loadChildren: () => import('./order-detail/order-detail.module').then( m => m.OrderDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reservasi-menu',
    loadChildren: () => import('./reservasi-menu/reservasi-menu.module').then( m => m.ReservasiMenuPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profil',
    loadChildren: () => import('./edit-profil/edit-profil.module').then( m => m.EditProfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'order',
    loadChildren: () => import('./order/order.module').then( m => m.OrderPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pilih-meja',
    loadChildren: () => import('./pilih-meja/pilih-meja.module').then( m => m.PilihMejaPageModule),
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
