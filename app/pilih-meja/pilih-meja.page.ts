import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-pilih-meja',
  templateUrl: './pilih-meja.page.html',
  styleUrls: ['./pilih-meja.page.scss'],
})
export class PilihMejaPage {



mejaList = [
    { id: 1, nama: 'Meja 1' },
    { id: 2, nama: 'Meja 2' },
    { id: 3, nama: 'Meja 3' },
    { id: 4, nama: 'Meja 4' },
    { id: 5, nama: 'Meja 5' },
    { id: 6, nama: 'Meja 6' }
  ];

  constructor(private router: Router) {}

pilihMeja(meja: any) {
    localStorage.setItem('selectedTable', JSON.stringify(meja));
    this.router.navigate(['/dine-in', 'reservasi']);
  }

}
