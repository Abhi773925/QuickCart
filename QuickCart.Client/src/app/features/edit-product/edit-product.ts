import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-edit-product',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.html',
  styleUrl: './edit-product.css',
})
export class EditProduct {
  productDetails: any = {};
  productId: number = 0;
  editProductUrl: string = 'http://localhost:5273/api/v1/Product/update/{productId}';
  allProductsUrl: string = 'http://localhost:5273/api/v1/Product/list-all';
  productDetailsForm = new FormGroup({
    ProductName: new FormControl('', [Validators.required]),
    ProductDescription: new FormControl('', [Validators.required]),
    ProductPrice: new FormControl('', [Validators.required]),
    StockQuantity: new FormControl('', [Validators.required]),
    ImageUrl: new FormControl('', [Validators.required]),
    CategoryId: new FormControl('', [Validators.required])

  });
  constructor(private route: ActivatedRoute, private router: Router) {
    this.productId = Number(this.route.snapshot.paramMap.get('productId'));
  }

  async ngOnInit(): Promise<void> {
    this.editProductUrl = this.editProductUrl.replace('{productId}', this.productId.toString());
    this.fetchProductDetails();
  }
  handleForm(): void {

  }
  async fetchProductDetails(): Promise<void> {
    try {
      // Fetch product details and populate form fields for editing
      let response = await axios.get(this.allProductsUrl);
      const filteredProduct = response.data.data.filter((product: any) => product.productId == this.productId);
      if (filteredProduct.length > 0) {
        this.productDetails = filteredProduct[0];
        this.productDetailsForm.patchValue({
          ProductName: filteredProduct[0].productName,
          ProductDescription: filteredProduct[0].productDescription,
          ProductPrice: filteredProduct[0].productPrice,
          StockQuantity: filteredProduct[0].stockQuantity,
          ImageUrl: filteredProduct[0].imageUrl,
          CategoryId: filteredProduct[0].categoryId
        });
        console.log(this.productDetailsForm.value);
      } else {
        console.warn("Product not found with ID:", this.productId);
      }

    } catch (error: any) {
      let errorMessage = error.response?.data?.message || error.message || "Failed to load product details";
      console.log(errorMessage);
    }
  }

  async updateProduct(): Promise<void> {
    try {
      const { ProductName, ProductDescription, ProductPrice, StockQuantity, ImageUrl, CategoryId } = this.productDetailsForm.value;
      const payLoad = {
        ProductName: ProductName?.trim(),
        ProductDescription: ProductDescription?.trim(),
        ProductPrice: Number(ProductPrice),
        StockQuantity: Number(StockQuantity),
        ImageUrl: ImageUrl?.trim(),
        CategoryId: Number(CategoryId)
      }

      let response = await axios.put(this.editProductUrl, payLoad);
      if (response.status == 200) {
        this.router.navigate(['manage-products'])
        alert('Product Updated Successfully');


      }
    } catch (error: any) {
      let errorMessage = error.response?.data?.message || error.message || "Failed to load product details";
      console.log(errorMessage);
    }
  }
}
