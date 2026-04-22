import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  productId: number = 0;
  constructor(public route: ActivatedRoute) {
    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
  }

  productDetails: string = "http://localhost:5273/api/v1/Product/list-all";
  products = signal<any>([]);
  quantity = signal<number>(1);
  ngOnInit(): void {
    this.fetchProductDetails();
  }
  async fetchProductDetails(): Promise<void> {
    try {
      const response = await axios.get(this.productDetails);
      const filtered = response.data.data.filter((product: any) => product.productId == this.productId);
      this.products.set(filtered);
    } catch (error: any) {
      let errorMessage = error.response?.data?.message || error.message || "Failed to load products";
      console.log(errorMessage);
    }
  }
  decreaseQuantity(): void {
    if (this.quantity() > 0)
      this.quantity.set(this.quantity() - 1);
  }
  increaseQuantity(): void {
    this.quantity.set(this.quantity() + 1);
  }

  addToCart(productId: number): void {
    const filtered = this.products().filter((product: any) => product.productId == this.productId);
    let cart = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const newItem = {
      productId: filtered[0].productId,
      productName: filtered[0].productName,
      price: filtered[0].productPrice,
      imageUrl: filtered[0].imageUrl,
      quantity: this.quantity()
    };
    const existingItemIndex = cart.findIndex((item: any) => item.productId === newItem.productId);

    if (existingItemIndex > -1) {
      // Agar hai, toh sirf quantity badhao
      cart[existingItemIndex].quantity += this.quantity();
    } else {
      // Agar naya hai, toh array mein push kardo
      cart.push(newItem);
    }
    localStorage.setItem('cartItems', JSON.stringify(cart));
    alert('Product added to cart!');
  }
}
