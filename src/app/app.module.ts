import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterMerchantComponent } from './components/register-merchant/register-merchant.component';
import { ReviewMerchantComponent } from './components/review-merchant/review-merchant.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { PurchaseProductsComponent } from './components/purchase-products/purchase-products.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterMerchantComponent,
    ReviewMerchantComponent,
    ManageProductsComponent,
    PurchaseProductsComponent,
    DisplayProductsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
