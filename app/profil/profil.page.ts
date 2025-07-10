// src/app/profil/profil.page.ts
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; // Import RouterLink
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // Atau impor komponen Ionic individual

import { ToastController } from '@ionic/angular';

import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
  standalone: true, // <-- INI KUNCINYA SEHINGGA NG6008 MUNCUL
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // <-- Pastikan ini (atau komponen Ionic individual) ada di sini
    RouterLink  // <-- Tambahkan jika Anda menggunakan [routerLink] di template ProfilPage
  ]
})
export class ProfilPage{
  user :any;

  constructor(
    private router: Router, 

    private toastController:ToastController,
    
    private authService: AuthService,
    private userService: UserService
  ) {}

  ionViewWillEnter() {
    const RawUser :any= localStorage.getItem('user')
    this.user = JSON.parse(RawUser);
  }

  goToEditProfile() {
    this.router.navigate(['/edit-profil']);
  }

  goToOrderHistory() {
    this.router.navigate(['/riwayat-pesanan']);
  }

  goToPaymentMethods() {
    this.router.navigate(['/metode-pembayaran']);
  }

  goToHelp() {
    this.router.navigate(['/bantuan']);
  }

  logout() {
    this.authService.logout()
    .subscribe(data=>{
      localStorage.clear();
      this.router.navigateByUrl('/login', { replaceUrl: true });
    }, async error=>{
      const toast = await this.toastController.create({
        message: error.message,
        duration: 2000,
        color: 'warning',
      });
    });
  }
}
