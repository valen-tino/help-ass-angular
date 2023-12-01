import { Component } from '@angular/core';
import { ProductService, Merchant, Product } from '../../services/product-service.service';

@Component({
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.css']
})
export class MerchantDashboardComponent {
  merchant: Merchant[] = [];
  featuredProducts: Product[] = [];
  uniqueCategories: string[] = [];
  selectedCategory: string | null = null;
  selectedMerchantName: string | null = null;

  constructor(private ProductService: ProductService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.ProductService.getMerchantsData().subscribe(
      (data: any[]) => {
        this.merchant = data;
        this.featuredProducts = data.flatMap(Merchant => Merchant.products);
        this.initData();
      },
      (error: any) => {
        console.error('Error loading Merchant data:', error);
      }
    );
  }

  getMerchantByName(merchantName: string): Merchant | null {
    return this.merchant.find((merchant) => merchant.name === merchantName) || null;
  }

  initData() {
    this.uniqueCategories = this.getUniqueCategories();
  }

  getUniqueCategories(): string[] {
    return Array.from(new Set(this.featuredProducts.map((product) => product.category)));
  }

  filterProductsByCategoryAndMerchant(category: string): void {
    this.selectedCategory = category;
  }

  filterProductsByMerchantName(merchantName: string): void {
    this.selectedMerchantName = merchantName;
    this.selectedCategory = null; // Reset selected category when filtering by merchant name
  }

  clearCategoryAndMerchantFilter(): void {
    this.selectedCategory = null;
    this.selectedMerchantName = null;
  }

  getFilteredProducts(): Product[] {
    if (this.selectedMerchantName) {
      const selectedMerchant = this.getMerchantByName(this.selectedMerchantName);
      if (selectedMerchant) {
        return this.featuredProducts.filter((product) => this.getMerchants(product) === selectedMerchant);
      }
    } else if (this.selectedCategory) {
      return this.featuredProducts.filter((product) => product.category === this.selectedCategory);
    }
    return this.featuredProducts;
  }

  getMerchants(product: Product): Merchant {
    const merchant = this.merchant.find((m) => m.products.some((p) => p.id === product.id));
    return merchant!;
  }
}
