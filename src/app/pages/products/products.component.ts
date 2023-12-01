import { Component, OnInit } from '@angular/core';
import { ProductService, Merchant, Product } from '../../services/product-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  merchant: Merchant[] = [];
  featuredProducts: Product[] = [];
  uniqueCategories: string[] = [];
  selectedCategory: string | null = null;
  selectedMerchant: Merchant | null = null;

  filteredProductsLength: number = 0;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.productService.getMerchantsData().subscribe(
      (data: Merchant[]) => {
        this.merchant = data;
        this.featuredProducts = data.flatMap(merchant => merchant.products);
        this.initData();
      },
      (error: any) => {
        console.error('Error loading Merchant data:', error);
      }
    );
  }

  initData() {
    this.uniqueCategories = Array.from(new Set(this.featuredProducts.map(product => product.category)));
  }

  filterProductsByCategoryAndMerchant(category: string): void {
    this.selectedCategory = category;
    // Clear selectedMerchant when filtering by category
    this.selectedMerchant = null;
  }

  clearCategoryAndMerchantFilter(): void {
    this.selectedCategory = null;
    this.selectedMerchant = null;
  }
  
  getFilteredProducts(): Product[] {
    const filteredProducts = this.featuredProducts.filter(product =>
      (!this.selectedCategory || product.category === this.selectedCategory) &&
      (!this.selectedMerchant || this.getMerchants(product) === this.selectedMerchant)
    );
    this.filteredProductsLength = filteredProducts.length;
    return filteredProducts;
  }

  getMerchants(product: Product): Merchant{
    const merchant = this.merchant.find(merchant => merchant.products.some(p => p.id === product.id));
    return merchant!;
  }
  
}

