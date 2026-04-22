import { Routes } from '@angular/router';
import { Register } from './features/register/register';
import { Login } from './features/login/login';
import { Herosection } from './shared/herosection/herosection';
import { AddProduct } from './features/add-product/add-product';
import { ProductList } from './features/product-list/product-list';
import { CategoriesList } from './features/categories-list/categories-list';
import { FilterBasedProduct } from './features/filter-based-product/filter-based-product';
import { ProductDetails } from './features/product-details/product-details';
import { CartPage } from './features/cart-page/cart-page';
import { CheckoutPage } from './features/checkout-page/checkout-page';
import { Home } from './shared/home/home';
import { MyOrderPage } from './features/my-order-page/my-order-page';
import { UpdateProductPage } from './features/update-product-page/update-product-page';
import { EditProduct } from './features/edit-product/edit-product';
export const routes: Routes = [
    {
        path: "",
        component: Home
    }, {
        path: "register",
        component: Register
    }, {
        path: "login",
        component: Login
    }, {
        path: 'add-product',
        component: AddProduct
    }, {
        path: 'products',
        component: ProductList
    }, {
        path: 'categories',
        component: CategoriesList
    }, {
        path: 'products/:categoryId',
        component: FilterBasedProduct
    }, {
        path: 'product-details/:productId',
        component: ProductDetails
    }, {
        path: 'cart',
        component: CartPage
    }, {
        path: 'checkout',
        component: CheckoutPage
    }, {
        path: 'my-orders',
        component: MyOrderPage
    }, {
        path: 'manage-products',
        component: UpdateProductPage
    }, {
        path: 'edit-product/:productId',
        component: EditProduct
    }
];
