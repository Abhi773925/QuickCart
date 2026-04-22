import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common'; // Iterate karne ke liye zaroori hai
import axios from 'axios';
import { Router } from '@angular/router';

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
  selector: 'app-update-product-page',
  imports: [CommonModule],
  templateUrl: './update-product-page.html',
  styleUrl: './update-product-page.css',
})
export class UpdateProductPage {
  categories = [
    { categoryId: 1, categoryName: 'Laptop', imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 2, categoryName: 'Mobile', imageUrl: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 3, categoryName: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 4, categoryName: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 5, categoryName: 'Grocery', imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 6, categoryName: 'Beauty', imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 7, categoryName: 'Home', imageUrl: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 8, categoryName: 'Footwear', imageUrl: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 9, categoryName: 'Sports', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 10, categoryName: 'Toys', imageUrl: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 11, categoryName: 'Books', imageUrl: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400' },
    { categoryId: 12, categoryName: 'Fitness', imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=400' }
  ];
  productListUrl: string = "http://localhost:5273/api/v1/Product/list-all";
  products = signal<Product[]>([]);
  allProducts = signal<Product[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>("");

  constructor(public router: Router) { }
  ngOnInit(): void {
    this.fetchProducts();
  }

  handleFilteration(event: any): void {
    const categoryId = parseInt(event.target.value);

    if (!categoryId || categoryId === 0) {
      this.products.set([...this.allProducts()]);
    } else {
      const filtered = this.allProducts().filter(product => product.categoryId === categoryId);
      this.products.set(filtered);
    }
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
        this.products.set(response.data.data);
        this.allProducts.set(response.data.data);
      } else {
        this.products.set([]);
        this.allProducts.set([]);
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
    this.router.navigate(['/edit-product', productId]);
  }

  async deleteProduct(productId: number): Promise<void> {
    if (confirm("Are you sure you want to delete this product?")) {
      let url = `http://localhost:5273/api/v1/Product/delete/${productId}`;
      const token = localStorage.getItem('accessToken');

      if (!token) {
        alert("No authentication token found. Please login first.");
        this.router.navigate(['login']);
        console.warn("No token found");
        return;
      }

      try {
        const response = await axios.delete(url);
        if (response.status == 200) {
          alert("Product Deleted Successfully");
          this.fetchProducts();
        } else {
          alert("Failed to delete product");
        }
      } catch (error: any) {
        console.error("Delete Error:", error);
        alert(error.response?.data?.message || error.message || "Failed to delete product");
        return;
      }

    }
  }
}