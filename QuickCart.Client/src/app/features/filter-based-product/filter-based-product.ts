import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import axios from 'axios';
interface Product {
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  stockQuantity: number;
  imageUrl: string;
  categoryId: number;
}
@Component({
  selector: 'app-filter-based-product',
  imports: [CommonModule],
  templateUrl: './filter-based-product.html',
  styleUrl: './filter-based-product.css',
})
export class FilterBasedProduct implements OnInit {

  productListUrl: string = "http://localhost:5273/api/v1/Product/list-all";
  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>("");
  categoryId: string | null = null;
  constructor(public router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryId = this.route.snapshot.paramMap.get('categoryId');
    this.fetchProducts();
  }

  async fetchProducts(): Promise<void> {
    this.isLoading.set(true);
    const token = localStorage.getItem('accessToken');

    if (!token) {
      this.errorMessage.set("No authentication token found. Please login first.");
      this.isLoading.set(false);
      this.products.set([]);
      console.warn("No token found");
      return;
    }

    try {
      const response = await axios.get(this.productListUrl, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      console.log("Full Response:", response);

      if (response.data && response.data.data) {
        const filtered = response.data.data.filter((p: Product) => p.categoryId.toString() === this.categoryId);
        this.products.set(filtered);
      } else {
        console.warn("No data in response:", response.data);
        this.products.set([]);
      }

      this.errorMessage.set("");
    } catch (error: any) {
      console.error("Fetch Error:", error);
      this.errorMessage.set(error.response?.data?.message || error.message || "Failed to load products");
      this.products.set([]);
    } finally {
      this.isLoading.set(false);
    }
  }

  viewDetails(productId: number): void {
    this.router.navigate(['/product-details', productId]);
  }
}
