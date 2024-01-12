import { Component, OnInit } from '@angular/core';
import { MainApiServiceService, Merchant, Product } from '../../services/main-api-service.service';

@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.css']
})
export class MerchantDashboardComponent implements OnInit {
  merchant: Merchant | null = null;
  featuredProducts: Product[] = [];
  uniqueCategories: string[] = [];
  selectedCategory: string | null = null;

  showAddProductModal = false;

  constructor(private mainApiService: MainApiServiceService) {}

  ngOnInit() {
    this.loadMerchantData();
  }

  loadMerchantData() {
    const merchantId = localStorage.getItem('merchantId'); 
    if (merchantId) {
      this.mainApiService.getMerchantById(merchantId).subscribe(
        merchantData => {
          this.merchant = merchantData;
          this.loadProducts(merchantId);
        },
        error => console.error('Error loading Merchant data:', error)
      );
    }
  }

  loadProducts(merchantId: string) {
    this.mainApiService.getProductsByMerchantId(merchantId).subscribe(
      products => {
        this.featuredProducts = products;
        this.initData();
      },
      error => console.error('Error loading products:', error)
    );
  }

  initData() {
    this.uniqueCategories = Array.from(new Set(this.featuredProducts.map(product => product.category)));
  }

  getFilteredProducts(): Product[] {
    if (this.selectedCategory) {
      return this.featuredProducts.filter(product => product.category === this.selectedCategory);
    }
    return this.featuredProducts;
  }

  handleProductDeleted(productId: string) {
    this.featuredProducts = this.featuredProducts.filter(product => product._id !== productId);
    this.initData();
  }

  handleNewProduct(product: Product) {
    // Update your product list with the new product
    this.featuredProducts.push(product);
    this.initData();
    this.showAddProductModal = false; // Close the modal
  }
}
