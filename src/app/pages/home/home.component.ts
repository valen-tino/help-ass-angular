import { Component, OnInit } from '@angular/core';
import { ProductService, Merchant, Product } from '../../services/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  merchant: Merchant[] = [];
  featuredProducts: Product[] = [];
  uniqueCategories: string[] = [];
  selectedCategory: string | null = null;

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

  initData() {
    this.uniqueCategories = this.ProductService.getUniqueCategories(this.merchant);
  }

  filterProductsByCategory(category: string): void {
    this.selectedCategory = category;
  }

  clearCategoryFilter(): void {
    this.selectedCategory = null;
  }

  getFilteredProducts(): Product[] {
    return this.ProductService.getFilteredProducts(this.featuredProducts, this.selectedCategory);
  }

  getMerchants(product: Product): Merchant{
    const merchant = this.merchant.find(merchant => merchant.products.some(p => p.id === product.id));
    return merchant!;
  }
  
}
