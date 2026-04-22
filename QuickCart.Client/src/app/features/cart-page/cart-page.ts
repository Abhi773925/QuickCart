import { CommonModule, Location } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-cart-page',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-page.html',
  styleUrl: './cart-page.css',
})

export class CartPage implements OnInit {
  cartItems = signal<any[]>([]);
  totalPrice = signal<number>(0);

  constructor(private location: Location, private router: Router) { }

  goBack() {

  }
  ngOnInit(): void {
    this.fetchCartDetails();
  }

  fetchCartDetails(): void {
    this.cartItems.set(JSON.parse(localStorage.getItem('cartItems') || '[]'));
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.totalPrice.set(this.cartItems().reduce((acc, item) => acc + (item.price * item.quantity), 0));
  }

  removeItem(productId: number): void {
    const updated = this.cartItems().filter(item => item.productId !== productId);
    this.cartItems.set(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
    this.calculateTotal();
  }
  handleCheckout(): void {
    this.router.navigate(['checkout']);
  }
}
