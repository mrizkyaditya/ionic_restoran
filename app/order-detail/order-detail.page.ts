import { Component, NgZone, OnInit } from '@angular/core';
import { ActionSheetButton, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

declare var QRCode: any; // ← supaya TypeScript tidak error
import { MenuService } from '../service/menu.service';
import { OrderService } from '../service/order.service';
import { OrderDetailService } from '../service/order-detail.service';
import { SingletonService } from '../service/singleton.service';
import { ReservasiService } from '../service/reservasi.service';
import { TransaksiService } from '../service/transaksi.service';
import { lastValueFrom } from 'rxjs';


interface cartItem{
  menu:any,
  jumlah:number
}



@Component({
  standalone: false,
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
})
export class OrderDetailPage implements OnInit{
  items: any[] = [];
  orderType: string = '';
  selectedPaymentMethod: string = '';
  showPaymentOptions: boolean = false;
  
  selectedMeja: any = null;
  cartList:cartItem[] =[]
  totalPrice:number=0;

  tanggalDanJam:string=new Date().toISOString();
  datetime : string = new Date().toISOString();

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private route:ActivatedRoute,
    private ngZone:NgZone,

    private menuService:MenuService,
    private orderService:OrderService,
    private orderDetailService:OrderDetailService,
    private reservasiService:ReservasiService,
    private transaksiService:TransaksiService,
    private singletonService:SingletonService
  ) {
  }

  ngOnInit(): void {
    this.ngZone.run(()=>{
      this.orderType = this.singletonService.temps["orderType"];
      this.selectedMeja = this.singletonService.temps["selectedMeja"];
      let cartListIds = this.singletonService.temps["cartListIds"];
      this.totalPrice = 0;
      
      Object.keys(cartListIds).forEach((menuId:any)=>{
        this.menuService.find(menuId)
        .subscribe(response=>{
          this.cartList.push({
            menu: response.data,
            jumlah: cartListIds[menuId]
          });
          
          this.totalPrice += response.data.harga_menu * cartListIds[menuId];
        });
      });
      this.singletonService.clearTemps();
    });
    
  }

  paymentOptions: ActionSheetButton[] = [
    {
      text: 'Cash',
      handler: () => {
        this.selectedPaymentMethod = 'tunai'
      }
    },
    {
      text: 'qris',
      handler: () => {
        this.selectedPaymentMethod = 'qris'
      }
    },
    {
      text: 'Cancel',
      role: 'cancel'
    }
  ];

paymentDetails: Record<string, string> = {
  qris: '0896-1234-5678 (a.n. Fajar)',
  OVO: '0822-4567-1234 (a.n. Fajar)',
  GOPAY: '0813-7890-4321 (a.n. Fajar)'
};


  openPaymentOptions() {
    this.showPaymentOptions = true;
  }

  getIcon(type: string): string {
    switch (type) {
      case 'takeaway': return 'bag-outline';
      case 'dinein': return 'restaurant-outline';
      case 'reservasi': return 'calendar-outline';
      default: return 'help-circle-outline';
    }
  }
// ✅ Submit Order
  async submitOrder() {
    if (!this.selectedPaymentMethod) {
      alert('Silakan pilih metode pembayaran terlebih dahulu.');
      return;
    }

    if (this.orderType === 'reservasi') {
      if (!this.tanggalDanJam) {
        alert('Harap lengkapi data reservasi!');
        return;
      }
    }

    // create OOOOOrder
    try{
      let meja_id = null;
      if (this.selectedMeja){
        meja_id = this.selectedMeja.id
      }
      let order:any;
      const orderRequest$ = this.orderService.create({
        user_id : localStorage.getItem("user_id"),
        meja_id : meja_id,
        jenis_order: this.orderType
      });

      await lastValueFrom(orderRequest$).then(response=>{
        order = response.data;
      });

      // creatine order detail
      this.cartList.forEach(async item=>{
        const orderDetail$ = this.orderDetailService.create({
          order_id : order.id,
          menu_id : item.menu.id,
          jumlah : item.jumlah
        });

        await lastValueFrom(orderDetail$).catch(error=>{
          console.log(error);
        });
      });

      let transaksi:any;
      const transaksi$ = this.transaksiService.create({
        user_id : localStorage.getItem("user_id"),
        order_id : order.id,
        metode_pembayaran: this.selectedPaymentMethod,
        total_harga : this.totalPrice
      });

      await lastValueFrom(transaksi$).then(response=>{
        transaksi = response.data;
      }).catch(error=>{
        console.log(error);
      });

      // creat reservasi
      if (this.orderType === 'reservasi') {
        const reservasi$ = this.reservasiService.create({
          user_id : localStorage.getItem("user_id"),
          transaksi_id : transaksi.id,
          tanggal_dan_jam : this.tanggalDanJam.slice(0,-1).split("T").join(" ")
        });

        await lastValueFrom(reservasi$).catch(error=>{
          console.log(error);
        });
      }

      this.navCtrl.navigateForward('/order');
    }
    catch(error){
      alert(error);
      console.log(error);

    }

  }

}
