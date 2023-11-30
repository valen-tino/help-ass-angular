import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Merchant {
  id: number;
  name: string;
  location: string;
  description: string;
  rating: number;
  products: Product[];
}

export interface Product {
  slug: any;
  id: number;
  merchantId: number;
  image: string;
  title: string;
  category: string;
  excerpt: string;
  description: string;
  available: boolean;
  price: number; // Added 'price' field
  purchaseLink: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  // Array to store the merchant data
  merchants: Merchant[] = [];

  // Array to store the product data
  featuredProducts: Product[] = [];

  // Unique categories for filtering
  uniqueCategories: string[] = [];

  // Currently selected category for filtering
  selectedCategory: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Use HttpClient to load data from the JSON file
    this.http.get<Merchant[]>('assets/datas/merchants.json').subscribe(
      (data) => {
        this.merchants = data;
        // Extract products from all merchants and flatten the array
        this.featuredProducts = data.flatMap(merchant => merchant.products);
        this.initData();
      },
      (error) => {
        console.error('Error loading merchant data:', error);
      }
    );
  }

  initData() {
    // Initialize unique categories
    this.uniqueCategories = this.getUniqueCategories();
  }

  getUniqueCategories(): string[] {
    // Get unique categories from the product data
    return Array.from(new Set(this.featuredProducts.map(product => product.category)));
  }

  filterProductsByCategory(category: string): void {
    // Set the selected category for filtering
    this.selectedCategory = category;
  }

  clearCategoryFilter(): void {
    // Clear the selected category to show all products
    this.selectedCategory = null;
  }

  getFilteredProducts(): Product[] {
    // Filter products based on the selected category
    if (this.selectedCategory) {
      return this.featuredProducts.filter(product => product.category === this.selectedCategory);
    }
    return this.featuredProducts;
  }

  getMerchants(product: Product): Merchant {
    // Find the first merchant that contains the specified product
    const merchant = this.merchants.find(m => m.products.some(p => p.id === product.id));
  
    // Use non-null assertion operator (!) to indicate that merchant is not null
    return merchant!;
  }
  
}
