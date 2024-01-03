import { Component, OnInit } from '@angular/core';
import { MainApiServiceService, Product } from 'src/app/services/main-api-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  uniqueCategories: string[] = [];
  selectedCategory: string | null = null;

  constructor(private mainApiService: MainApiServiceService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.mainApiService.getAllProducts().subscribe({
      next: (products: Product[]) => {
        this.featuredProducts = products;
        console.log(this.featuredProducts);
        this.uniqueCategories = this.extractUniqueCategories(products);
      },
      error: error => console.error('Error loading products:', error.message),
      complete: () => console.log('Product loading complete') 
    });
  }  
  
  extractUniqueCategories(products: Product[]): string[] {
    const categories = new Set(products.map(product => product.category));
    return Array.from(categories);
  }

  filterProductsByCategory(category: string): void {
    this.selectedCategory = category;
  }

  clearCategoryFilter(): void {
    this.selectedCategory = null;
  }

  getFilteredProducts(): Product[] {
    if (this.selectedCategory) {
      return this.featuredProducts.filter(
        product => product.category === this.selectedCategory
      );
    }
    return this.featuredProducts;
  }
}
