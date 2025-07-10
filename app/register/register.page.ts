import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  standalone:false,
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'] 
})
export class RegisterPage {
  username = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private authService: AuthService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  async register() {
  // Validasi format email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(this.email)) {
    const toast = await this.toastController.create({
      message: 'Format email tidak valid.',
      duration: 2000,
      color: 'danger',
    });
    await toast.present();
    return;
  }

  // Validasi nomor HP hanya angka
const phoneRegex = /^[0-9]+$/;
if (!phoneRegex.test(this.phone)) {
  const toast = await this.toastController.create({
    message: 'Nomor HP hanya boleh berisi angka.',
    duration: 2000,
    color: 'danger',
  });
  await toast.present();
  return;
}


  this.authService.register(this.username,
    this.email,
    this.phone,
    this.password
  )
  .subscribe(async data=>{
    if (data.success){
      this.navCtrl.navigateForward('/login');
      const toast = await this.toastController.create({
        message: data.message,
        duration: 2000,
        color:'success',
      });
      await toast.present();
    }
  }, async error=>{
    const toast = await this.toastController.create({
      message: error.error.data,
      duration: 2000,
      color:'danger',
    });
    await toast.present();
  });
}

togglePassword() {
  this.showPassword = !this.showPassword;
}

goToLogin() {
  this.navCtrl.navigateBack('/login');
}

toggleConfirmPassword() {
  this.showConfirmPassword = !this.showConfirmPassword;
}

}
