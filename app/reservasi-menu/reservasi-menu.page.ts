import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FoodDetailComponent } from '../food-detail/food-detail.component';
import { CartService } from '../service/cart.service';
import { MENU_ITEMS } from 'src/app/data/menu';
import { Router } from '@angular/router';

@Component({
  standalone:false,
  selector: 'app-reservasi-menu',
  templateUrl: './reservasi-menu.page.html',
  styleUrls: ['./reservasi-menu.page.scss'],
})
export class ReservasiMenuPage implements OnInit {
selectedCategory: string = '';
  totalCount = 0;
  cartItems: any[] = [];
  orderType: string = '';

  items = MENU_ITEMS;
  filteredItems: any[] = [];

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.setOrderType('reservasi')
    this.filterItemsByCategory();
    this.cartItems = this.cartService.getCartItems();
    this.orderType = this.cartService.getOrderType();
    this.filteredItems = this.items;
    this.items.forEach(item => {
      const cartItem = this.cartService.getCartItems().find(ci => ci.id === item.id);
      item.count = cartItem?.qty ?? 0;
    });

    
  }

  filterItems(event: any) {
    const searchTerm = event.target.value?.toLowerCase() || '';
    this.filteredItems = this.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm)
    );
  }

  onCategoryChange(event: any) {
    const categoryId = event.detail.value;
    const el = document.getElementById(categoryId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  filterItemsByCategory() {
    this.filteredItems = this.items.filter(item => item.category === this.selectedCategory);
  }

  //kode baru
  increment(id: number) {
  const item = this.items.find(i => i.id === id);
  if (!item) return;

  const existing = this.cartService.getCartItems().find(i => i.id === id);

  if (!existing) {
    item.count = 1;
    this.cartService.addItemToCart({ ...item });
  } else {
    item.count = existing.qty + 1;
    this.cartService.addItemToCart({ ...item });
  }

  this.updateTotalCount();
  }


  //kode baru
  decrement(id: number) {
  const item = this.items.find(i => i.id === id);
  if (!item || item.count <= 0) return;

  this.cartService.decreaseItemQty(item);

  const updatedItem = this.cartService.getCartItems().find(i => i.id === id);
  item.count = updatedItem?.qty ?? 0;

  this.updateTotalCount();
}


  presentOrderType(item: any) {
    item.count = 1;
    this.updateTotalCount();
  }

  updateTotalCount() {
    this.totalCount = this.items.reduce((sum, i) => sum + i.count, 0);
  }

  async openFoodDetail(item: any) {
    const modal = await this.modalController.create({
      component: FoodDetailComponent,
      componentProps: { food: item },
      breakpoints: [0, 0.5, 0.9],
      initialBreakpoint: 0.9,
      showBackdrop: true,
    });
    return await modal.present();
  }

  goToOrderDetail() {
    this.cartService.setOrderType('Reservation');
    this.router.navigate(['/order-detail']);
  }
}
