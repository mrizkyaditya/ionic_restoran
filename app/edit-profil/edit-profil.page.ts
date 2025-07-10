// src/app/edit-profil/edit-profil.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonicModule,
  AlertController,
  ToastController,
  NavController,
} from '@ionic/angular';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.page.html',
  styleUrls: ['./edit-profil.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class EditProfilPage implements OnInit {
  user = {
    avatar: 'assets/icon/profil.jpg',
    username: '',
    email: '',
    phone: '',
  };

  password = {
    current: '',
    new: '',
    confirm: '',
  };

  storedUserData:any;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private navController: NavController,
    
    private userService:UserService,
    private authService:AuthService
  ) {}

  ngOnInit() {
    const rawUser: any = localStorage.getItem('user');
    this.storedUserData = JSON.parse(rawUser);
    if (this.storedUserData) {
      this.user.username = this.storedUserData.username || '';
      this.user.email = this.storedUserData.email || '';
      this.user.phone = this.storedUserData.no_hp || '';
      this.user.avatar = this.storedUserData.avatar || 'assets/icon/profil.jpg';
    } else {
      console.warn('Tidak ada data pengguna di localStorage untuk dimuat.');
    }
  }


  async changeAvatar() {
    console.log('Tombol Ubah Foto diklik.');
    this.presentToast('Fungsi ubah avatar belum diimplementasikan sepenuhnya.');
  }

  async saveProfile() {
    if (!this.user.username.trim() || !this.user.email.trim()) {
      this.presentAlert('Validasi Gagal', 'Nama pengguna dan email tidak boleh kosong.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.user.email)) {
      this.presentAlert('Validasi Gagal', 'Format email tidak valid.');
      return;
    }
    
    await lastValueFrom(this.userService.update(this.storedUserData.id,{
      username:this.user.username,
      email:this.user.email,
      no_hp:this.user.phone
    }))
    .then(response=>{
      this.authService.refreshUserInStorage(response.data);
    });

    this.presentToast('Profil berhasil diperbarui!');
    this.router.navigateByUrl('/profil');
  }

  async savePassword() {
    if (!this.password.new || !this.password.confirm) {
      this.presentAlert('Validasi Gagal', 'Semua field untuk ubah kata sandi harus diisi.');
      return;
    }
    if (this.password.new !== this.password.confirm) {
      this.presentAlert('Validasi Gagal', 'Kata sandi baru dan konfirmasi kata sandi tidak cocok.');
      return;
    }
    if (this.password.new.length < 6) {
      this.presentAlert('Validasi Gagal', 'Kata sandi baru minimal harus 6 karakter.');
      return;
    }

    const username=localStorage.getItem('username');
    let passwordCorrect = true;
    await lastValueFrom(this.authService.checkUser(username, this.password.current))
    .catch(error=>{
      this.presentAlert("Validasi Gagal", 'password salah!');
      passwordCorrect = false;
    })

    if (passwordCorrect){
      await lastValueFrom(this.userService.update(this.storedUserData.id,{
        password:this.password.new,
      })).catch(error=>{
        console.log(error);
        
      });
  
      this.presentToast('Password berhasil diperbarui!');
      this.router.navigateByUrl('/profil');
    }
  }

  async presentToast(message: string, duration: number = 2500, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'bottom',
      color: color,
      buttons: [{ text: 'OK', role: 'cancel' }]
    });
    await toast.present();
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
