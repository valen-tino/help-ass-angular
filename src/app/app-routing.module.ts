import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterMerchantComponent } from './components/register-merchant/register-merchant.component';
import { ReviewMerchantComponent } from './components/review-merchant/review-merchant.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { PurchaseProductsComponent } from './components/purchase-products/purchase-products.component';
import { DisplayProductsComponent } from './components/display-products/display-products.component';

const routes: Routes = [
  { path: 'register-merchant', component: RegisterMerchantComponent },
  { path: 'review-merchant', component: ReviewMerchantComponent },
  { path: 'manage-products', component: ManageProductsComponent },
  { path: 'purchase-products', component: PurchaseProductsComponent },
  { path: 'display-products', component: DisplayProductsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
