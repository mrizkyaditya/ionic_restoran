import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { LoadingController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
// pastikan path sesuai

@Component({
  standalone: false,
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  username: string = '';
  greeting: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authService : AuthService,
    private cartService: CartService,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private navCtrl: NavController
  ) {}

  ionViewWillEnter() {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      this.username = savedUsername;
    }

    this.setGreeting();
  }


  setGreeting() {
    const now = new Date();

    // Konversi ke Waktu Indonesia Barat (WIB)
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const wib = new Date(utc + 7 * 3600000); // UTC+7

    const hour = wib.getHours();

    if (hour >= 4 && hour < 11) {
      this.greeting = 'Selamat Pagi';
    } else if (hour >= 11 && hour < 15) {
      this.greeting = 'Selamat Siang';
    } else if (hour >= 15 && hour < 18) {
      this.greeting = 'Selamat Sore';
    } else {
      this.greeting = 'Selamat Malam';
    }
  }


async logout() {
  const loading = await this.loadingController.create({
    message: 'logging out...',
    duration: 500,
    spinner: 'dots',
    cssClass: 'custom-loading'
  });
  await loading.present();

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

goToReservasi() {
    this.router.navigate(['/reservasi']);
  }
goToOrderPage() {
  this.navCtrl.navigateForward('/order');
}


goToLogin() {
  this.navCtrl.navigateForward('/login');
}

goToRegister() {
  this.navCtrl.navigateForward('/register');
}




}
