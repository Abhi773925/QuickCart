import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-my-order-page',
  imports: [CommonModule],
  templateUrl: './my-order-page.html',
  styleUrl: './my-order-page.css',
})
export class MyOrderPage implements OnInit {
  myorders = signal<any>([]);
  myorderUrls: any = "http://localhost:5273/api/v1/Order/my-orders";
  isLoading = signal<boolean>(false);
  errorMessage = signal<string | null>(null);

  constructor(private router: Router) { }
  async ngOnInit(): Promise<void> {
    await this.fetchMyOrders();
  }
  async fetchMyOrders(): Promise<void> {
    try {
      this.isLoading.set(true);
      this.errorMessage.set(null);

      const accessToken = localStorage.getItem('accessToken');
      if (accessToken == null) {
        this.router.navigate(['login']);
        alert('Login First');
        return;

      }
      const response = await axios.get(this.myorderUrls, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      console.log('API Response:', response.data);
      this.myorders.set(response.data || []);
      this.isLoading.set(false);
    } catch (error: any) {
      console.error('Fetch error:', error);
      this.errorMessage.set(error?.response?.data?.message || "Failed to load orders. Showing sample data.");
      this.isLoading.set(false);
    }
  }

  seeDetails(items: any[]): void {
    if (items && items.length > 0) {
      const productId = items[0].productId;
      this.router.navigate(['/product-details', productId]);
    }
  }

}
