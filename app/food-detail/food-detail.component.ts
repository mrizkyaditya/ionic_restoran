import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-food-detail',
  standalone: true,
  imports: [IonicModule],
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent{
  @Input() menu:any;
  @Input() orderPage: any;

  constructor(
    private modalController: ModalController,
    private router: Router,
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  getMenuTotalPrice(){
    let totalPrice = 0;
    if (this.orderPage.cartList.hasOwnProperty(this.menu.id)){
      totalPrice = parseInt(this.menu.harga_menu) * this.orderPage.cartList[this.menu.id]
    }
    return totalPrice;
  }
}
