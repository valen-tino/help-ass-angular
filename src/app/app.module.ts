import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { MerchantDashboardComponent } from './merchant/merchant-dashboard/merchant-dashboard.component';
import { ManageProductsComponent } from './merchant/manage-products/manage-products.component';

import { CustDashboardComponent } from './customer/cust-dashboard/cust-dashboard.component';
import { ProductListComponent } from './customer/product-list/product-list.component';
import { ProductDetailsComponent } from './customer/product-details/product-details.component';
import { PurchaseProductComponent } from './customer/purchase-product/purchase-product.component';
import { PurchaseReceiptComponent } from './customer/purchase-receipt/purchase-receipt.component';
import { TransactionHistoryComponent } from './customer/transaction-history/transaction-history.component';

import { MerchantApprovalComponent } from './admin/merchant-approval/merchant-approval.component';

import { MainComponent } from './shared_components/navbar/main/main.component';
import { AdminComponent } from './shared_components/navbar/admin/admin.component';
import { MerchantComponent } from './shared_components/navbar/merchant/merchant.component';

import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { MerchantsComponent } from './pages/merchants/merchants.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ContactUsComponent } from './pages/contact-us/contact-us.component';
import { ProductCardComponent } from './shared_components/product-card/product-card.component';
import { HeroSectionComponent } from './shared_components/hero-section/hero-section.component';

import { ProductService } from './services/product-service.service';
import { RegisterMerchantComponent } from './auth/register-merchant/register-merchant.component';
import { SidebarComponent } from './merchant/shared_components/sidebar/sidebar.component';
import { LoginRegisterComponent } from './shared_components/navbar/hero-breadcrumbs/login-register.component';
import { FormControlInputComponent } from './shared_components/form-control-input/form-control-input.component';
import { CustomerComponent } from './shared_components/navbar/customer/customer.component';
import { FormControlImageComponent } from './shared_components/form-control-image/form-control-image.component';

import { ProductCardMerchantComponent } from './shared_components/product-card-merchant/product-card-merchant.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MerchantDashboardComponent,
    ManageProductsComponent,
    CustDashboardComponent,
    ProductListComponent,
    ProductDetailsComponent,
    PurchaseProductComponent,
    PurchaseReceiptComponent,
    TransactionHistoryComponent,
    MerchantApprovalComponent,
    MainComponent,
    AdminComponent,
    MerchantComponent,
    HomeComponent,
    ProductsComponent,
    MerchantsComponent,
    AboutUsComponent,
    ContactUsComponent,
    ProductCardComponent,
    HeroSectionComponent,
    RegisterMerchantComponent,
    SidebarComponent,
    LoginRegisterComponent,
    FormControlInputComponent,
    CustomerComponent,
    FormControlImageComponent,
    ProductCardMerchantComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
