import { Component, NgZone, OnInit } from '@angular/core';
import { TransaksiService } from '../service/transaksi.service';
import { NgForm } from '@angular/forms';

declare var QRCode: any;

@Component({
  standalone: false,
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  transaksis: any[] = [];
  expandedIndex: number | null = null;
  file_bukti: { [index: string]: any } = {};

  constructor(
    private ngZone: NgZone,
    private transaksiService: TransaksiService
  ) {}

  ngOnInit(): void {
    this.ngZone.run(() => {
      this.loadTransaksis();
    });
  }

  loadTransaksis() {
    this.transaksiService.whereUserId(localStorage.getItem('user_id'))
      .subscribe(response => {
        this.transaksis = response.data.reverse();

        // 🔄 Setelah transaksi dimuat, generate QRCode jika reservasi
        setTimeout(() => {
          this.transaksis.forEach((transaksi, index) => {
            if (transaksi.order?.jenis_order === 'reservasi') {
              const targetDivId = 'qrcode-' + index;
              const el = document.getElementById(targetDivId);
              if (el) {
                el.innerHTML = ''; // Bersihkan QR lama jika ada
                new QRCode(el, {
                  text: transaksi.kode_transaksi,
                  width: 200,
                  height: 200
                });
              }
            }
          });
        }, 100); // ⏳ beri jeda agar DOM selesai render
      });
  }

  onFileChange(transaksi_id: any, event: any) {
    this.file_bukti[transaksi_id] = event.target.files[0];
  }

  uploadBuktiPembayaran(transaksi_id: any, f: NgForm) {
    if (transaksi_id in this.file_bukti) {
      const formData = new FormData();
      formData.append("bukti_pembayaran", this.file_bukti[transaksi_id]);

      this.transaksiService.uploadBukti(transaksi_id, formData)
        .subscribe(response => {
          this.file_bukti = [];

          // Update transaksi lokal
          this.transaksis.forEach((transaksi, index) => {
            if (transaksi.id == transaksi_id) {
              this.transaksis[index].bukti_pembayaran = response.data.bukti_pembayaran;
            }
          });

        }, error => {
          console.log(error.error.data);
          alert(error.error.data);
        });
    }
  }

  toggleDetails(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  getIcon(type: string): string {
    switch (type) {
      case 'takeaway': return 'bag-outline';
      case 'dinein': return 'restaurant-outline';
      case 'reservasi': return 'calendar-outline';
      default: return 'help-circle-outline';
    }
  }
}
