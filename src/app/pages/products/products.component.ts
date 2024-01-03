import { Component, OnInit } from '@angular/core';
import { MainApiServiceService, Product, Merchant } from 'src/app/services/main-api-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  featuredProducts: Product[] = [];
  uniqueCategories: string[] = [];
  selectedCategory: string | null = null;
  filteredProductsLength: number = 0;

  constructor(private mainApiService: MainApiServiceService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.mainApiService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.featuredProducts = products;
        this.getUniqueCategories();
      },
      error => console.error('Error loading products:', error)
    );
  }

  getUniqueCategories() {
    this.mainApiService.getUniqueCategories().subscribe(
      (categories: string[]) => {
        this.uniqueCategories = categories;
      },
      error => console.error('Error fetching categories:', error)
    );
  }

  filterProductsByCategory(category: string | null): void {
    this.selectedCategory = category;
  }  

  clearCategoryFilter(): void {
    this.selectedCategory = null;
  }

  getFilteredProducts(): Product[] {
    const filteredProducts = this.featuredProducts.filter(product =>
      !this.selectedCategory || product.category === this.selectedCategory
    );
    this.filteredProductsLength = filteredProducts.length;
    return filteredProducts;
  }
}


