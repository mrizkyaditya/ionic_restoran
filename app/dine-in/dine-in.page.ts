import { Component, OnInit, NgZone, OnDestroy } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { FoodDetailComponent } from '../food-detail/food-detail.component';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

import { MejaService } from '../service/meja.service';
import { KategoriService } from '../service/kategori.service';
import { MenuService } from '../service/menu.service';
import { canDeactivateComponent } from '../service/can-deactivate-guard.service';
import { SingletonService } from '../service/singleton.service';

@Component({
  standalone: false,
  selector: 'app-dine-in',
  templateUrl: './dine-in.page.html',
  styleUrls: ['./dine-in.page.scss']
})
export class DineInPage implements canDeactivateComponent {
  orderType: string = '';
  hasUnsavedTasks:boolean = false;

  mejaList:any[] = [];
  kategoriList:any[] =[];
  menuList:any[] = [];
  cartList: {[index:string]:any} = {};

  selectedMeja: any = null;
  searchTerm:string ="";
  cartTotalCount: number = 0;
  cartFilteredIds:string[] =[];
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ngZone: NgZone,
    
    private modalController: ModalController,
    private alertController: AlertController,
    
    private singletonService :SingletonService,
    private mejaService : MejaService,
    private kategoriService : KategoriService,
    private menuService : MenuService,
  ) {
    let tipe: any = route.snapshot.paramMap.get('tipe');
    this.orderType = tipe ? tipe : 'dinein';
  }

  ionViewWillEnter() {
    this.cartList = {};
    this.cartTotalCount = 0;
    this.cartFilteredIds = [];
    const table = localStorage.getItem('selectedMeja');
    if (table) {
      this.selectedMeja = JSON.parse(table);
    }

    // collecting :) dataSS from the dat'a bASSe
    this.ngZone.run(()=>{
      // get all of dem tables
      this.mejaService.all()
      .subscribe(response=>{
        let datas = response.data;
        
        this.mejaList.push(...datas);
      });
      // categories for days
      this.kategoriService.all()
      .subscribe(response=>{
        let datas = response.data;

        this.kategoriList.push(...datas);
      });
      // menus too
      this.menuService.all()
      .subscribe(response=>{
        let datas = response.data;

        this.menuList.push(...datas);
      });
    })
  }
  
  konfirmasiPilihMeja() {
    localStorage.setItem('selectedMeja', JSON.stringify(this.selectedMeja));
    this.hasUnsavedTasks = true;
  }

  filterItems(event: any) {
    this.searchTerm = event.target.value?.toLowerCase() || '';
    this.cartFilteredIds = [];
    this.menuList.forEach((menu)=>{
      if(menu.nama_menu.toLowerCase().includes(this.searchTerm)){
        this.cartFilteredIds.push(menu.id);
        
      }
    });
  }

  onCategoryChange(event: any) {
    const categoryId = event.detail.value;
    const el = document.getElementById(categoryId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  increaseToCart(menu_id: string) {
    if (this.cartList.hasOwnProperty(menu_id)){
      this.cartList[menu_id] += 1;
      this.cartTotalCount += 1;
    }else{
      this.cartList[menu_id] = 1;
      this.cartTotalCount = 1;
    }
  }

  decreaseFromCart(menu_id: string) {
    if (this.cartList[menu_id] > 0){
      this.cartList[menu_id] -= 1;
      this.cartTotalCount -= 1;
    }
  }

  async openFoodDetail(item: any) {
    const modal = await this.modalController.create({
      component: FoodDetailComponent,
      componentProps: {
          menu: item,
          orderPage: this
        },
      breakpoints: [0, 0.5, 0.9],
      initialBreakpoint: 0.9,
      showBackdrop: true,
    });
    return await modal.present();
  }

  async goToOrderDetail() {
    this.hasUnsavedTasks=false;
    if (! localStorage.getItem("username")) {
      const alert = await this.alertController.create({
        header: 'Login Diperlukan',
        message: 'Silakan login atau daftar terlebih dahulu untuk melanjutkan checkout.',
        buttons: [
          {
            text: 'Login',
            role: 'login',
            handler: () => {
              this.router.navigate(['/login']);
            },
          },
          {
            text: 'Daftar',
            role: 'register',
            handler: () => {
              this.router.navigate(['/register']);
            },
          },
          {
            text: 'Batal',
            role: 'cancel',
            handler: ()=>{
              this.hasUnsavedTasks=true;
            }
          }
        ],
      });

      await alert.present();
      return;
    }
    else{
      this.singletonService.temps = {
        selectedMeja : this.selectedMeja,
        cartListIds : this.cartList,
        orderType : this.orderType
      }
      this.router.navigate(['/order-detail']);
      return;
    }
    
  }

  askToConfirm(nextState:RouterStateSnapshot){
    if (this.orderType === 'reservasi' && this.hasUnsavedTasks) {
      this.alertController.create({
        header: 'Kembali ke Pilih Meja?',
        message: 'Apakah Anda ingin memilih meja lain?',
        buttons: [
          {
            text: 'Ya',
            handler: () => {
              this.hasUnsavedTasks = false
              this.ngZone.run(()=>{
                this.router.navigateByUrl(nextState.url);
              })
            }
          },
          {
            text: 'Tidak',
            role: 'cancel',
            handler: () => {
              return
            }
          }
        ]
      }).then(alert => alert.present());
    }
  }

  onDeactivation(){
    this.selectedMeja = null;
    localStorage.removeItem('selectedMeja');
  }

  
}
