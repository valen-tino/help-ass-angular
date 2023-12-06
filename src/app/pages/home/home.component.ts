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
    // Load initial data when the component is initialized
    this.loadData();
  }

  loadData() {
    // Fetch merchant data from the ProductService
    this.ProductService.getMerchantsData().subscribe(
      (data: any[]) => {
        // Assign data to the component properties
        this.merchant = data;
        this.featuredProducts = data.flatMap(Merchant => Merchant.products);
        // Initialize other data after loading
        this.initData();
      },
      (error: any) => {
        // Handle errors if any occur during data loading
        console.error('Error loading Merchant data:', error);
      }
    );
  }

  initData() {
    // Extract unique categories from the loaded merchant data
    this.uniqueCategories = this.ProductService.getUniqueCategories(this.merchant);
  }

  filterProductsByCategory(category: string): void {
    // Set the selected category for filtering
    this.selectedCategory = category;
  }

  clearCategoryFilter(): void {
    // Clear the selected category to reset the filter
    this.selectedCategory = null;
  }

  getFilteredProducts(): Product[] {
    // Get the filtered products based on the selected category
    return this.ProductService.getFilteredProducts(this.featuredProducts, this.selectedCategory);
  }

  getMerchants(product: Product): Merchant {
    // Find and return the merchant associated with a given product
    const merchant = this.merchant.find(merchant => merchant.products.some(p => p.id === product.id));
    return merchant!;
  }
  
}
