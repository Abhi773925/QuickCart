import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import axios from 'axios';

@Component({
  selector: 'app-add-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  addProductUrls: string = "http://localhost:5273/api/v1/Product/add";
  errorText = signal<string>("");
  categories = [
    { categoryId: 1, categoryName: 'Laptop' },
    { categoryId: 2, categoryName: 'Mobile' },
    { categoryId: 3, categoryName: 'Electronics' },
    { categoryId: 4, categoryName: 'Fashion' },
    { categoryId: 5, categoryName: 'Grocery' },
    { categoryId: 6, categoryName: 'Beauty' },
    { categoryId: 7, categoryName: 'Home' },
    { categoryId: 8, categoryName: 'Footwear' },
    { categoryId: 9, categoryName: 'Sports' },
    { categoryId: 10, categoryName: 'Toys' },
    { categoryId: 11, categoryName: 'Books' },
    { categoryId: 12, categoryName: 'Fitness' }
  ];


  productForm = new FormGroup({
    ProductName: new FormControl('', Validators.required),
    ProductDescription: new FormControl('', [Validators.minLength(10), Validators.required]),
    ProductPrice: new FormControl('', [Validators.required]),
    StockQuantity: new FormControl('', [Validators.required]),
    ImageUrl: new FormControl('', [Validators.required]),
    CategoryId: new FormControl('', [Validators.required])
  })

  async handleProductForm(): Promise<void> {
    if (this.productForm.valid) {
      // console.log(this.productForm.value);
      const { ProductName, ProductDescription, ProductPrice, StockQuantity, ImageUrl, CategoryId } = this.productForm.value;
      const payLoad = {
        ProductName: ProductName?.trim(),
        ProductDescription: ProductDescription?.trim(),
        ProductPrice: Number(ProductPrice),
        StockQuantity: Number(StockQuantity),
        ImageUrl: ImageUrl?.trim(),
        CategoryId: Number(CategoryId)
      }

      const tokenData = localStorage.getItem('accessToken');
      try {
        const productResponse = await axios.post(this.addProductUrls, payLoad, {
          headers: {
            'Authorization': `Bearer ${tokenData}`,
            'Content-Type': 'application/json'
          }
        });

        if (productResponse.status == 201) {
          this.productForm.reset();
          alert("Product Added Successfully");

        }
      } catch (error: any) {

        this.errorText.set(error.response?.data?.message || error.response?.data || "Something went wrong");
        console.log(this.errorText());

      }
    } else {
      this.productForm.markAllAsTouched();
      console.log("Error available in the form");
    }
  }
}
