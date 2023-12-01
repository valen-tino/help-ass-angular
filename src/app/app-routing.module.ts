import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import all components inside the admin, auth, customer and merchant modules
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { RegisterMerchantComponent } from './auth/register-merchant/register-merchant.component';

import { MerchantDashboardComponent } from './merchant/merchant-dashboard/merchant-dashboard.component';
import { ManageProductsComponent } from './merchant/manage-products/manage-products.component';

import { CustDashboardComponent } from './customer/cust-dashboard/cust-dashboard.component';

import { ProductListComponent } from './customer/product-list/product-list.component';
import { ProductDetailsComponent } from './customer/product-details/product-details.component';

import { PurchaseProductComponent } from './customer/purchase-product/purchase-product.component';
import { PurchaseReceiptComponent } from './customer/purchase-receipt/purchase-receipt.component';
import { TransactionHistoryComponent } from './customer/transaction-history/transaction-history.component';

import { MerchantApprovalComponent } from './admin/merchant-approval/merchant-approval.component';

import {HomeComponent} from './pages/home/home.component';
import {ProductsComponent} from './pages/products/products.component';
import {AboutUsComponent} from './pages/about-us/about-us.component';
import {ContactUsComponent} from './pages/contact-us/contact-us.component';
import { MerchantsComponent } from './pages/merchants/merchants.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'register/merchant', component: RegisterMerchantComponent },

  { path: 'merchant/dashboard', component: MerchantDashboardComponent },
  { path: 'merchant/dashboard/manage-products', component: ManageProductsComponent },

  { path: 'customer/dashboard', component: CustDashboardComponent },
  { path: 'customer/product-list', component: ProductListComponent },
  { path: 'customer/product-details', component: ProductDetailsComponent },
  { path: 'customer/purchase-product', component: PurchaseProductComponent },
  { path: 'customer/purchase-receipt', component: PurchaseReceiptComponent },
  { path: 'customer/transaction-history', component: TransactionHistoryComponent },

  { path: 'admin/merchant-approval', component: MerchantApprovalComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  { path: 'products', component: ProductsComponent },
  { path: 'products/:slug', component: ProductDetailsComponent },

  { path: 'user/dashboard', component: CustDashboardComponent},
  
  { path: 'merchants', component: MerchantsComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'contact-us', component: ContactUsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
