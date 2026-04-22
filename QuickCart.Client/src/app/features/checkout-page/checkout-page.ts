import { Token } from '@angular/compiler';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from "@angular/forms";
import axios from 'axios';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './checkout-page.html',
  styleUrl: './checkout-page.css',
})
export class CheckoutPage implements OnInit {
  userId: string = '';
  shippingAddress = signal("India Delhi Bihar");
  isLocating = signal(false);

  async ngOnInit(): Promise<void> {
    await this.fetchDetailsFromLocalStorage();
  }

  onAddressInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.shippingAddress.set(input.value);
  }

  async fetchDetailsFromLocalStorage(): Promise<void> {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    try {
      const payload = accessToken.split('.')[1];
      const tokenData = JSON.parse(atob(payload));
      this.userId = tokenData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];

      const addressFromToken = tokenData['address'] || "India Delhi Bihar";
      this.shippingAddress.set(addressFromToken);
    } catch (e) {
      console.error("Token decode error:", e);
    }
  }

  fetchLocation(): void {
    this.isLocating.set(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const placeName = response.data.address.city || response.data.address.town || response.data.address.village || response.data.address.county || 'Unknown Location';
            this.shippingAddress.set(placeName);
          } catch (error) {
            console.error("Geocoding error:", error);
            this.shippingAddress.set("Unable to fetch location name");
          }
          this.isLocating.set(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to get your location. Please enter manually.");
          this.isLocating.set(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      this.isLocating.set(false);
    }
  }

  async placeOrder(): Promise<void> {
    try {
      const url = "http://localhost:5273/api/v1/Order/place-order";
      const cartData = localStorage.getItem('cartItems');
      const items = JSON.parse(cartData || '[]');

      if (items.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const totalAmount = items.reduce((acc: number, item: any) => {
        const itemPrice = item.price || item.productPrice || 0;
        return acc + (Number(itemPrice) * Number(item.quantity));
      }, 0);

      const payload = {
        UserId: Number(this.userId),
        OrderDate: new Date().toISOString(),
        TotalAmount: Number(totalAmount.toFixed(2)),
        ShippingAddress: this.shippingAddress(),
        Status: 2,
        OrderItems: items.map((item: any) => ({
          ProductId: Number(item.productId),
          Quantity: Number(item.quantity),
          UnitPrice: Number((item.price || item.productPrice || 0).toFixed(2))
        }))
      };
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      if (response.status === 200 || response.status === 201) {
        alert("Order Placed Successfully!");
        localStorage.removeItem('cartItems');
      }
    } catch (error: any) {
      console.error("Order failed:", error.response?.data || error.message);
      alert("Failed to place order. Check console (Network tab) for validation errors.");
    }
  }
}