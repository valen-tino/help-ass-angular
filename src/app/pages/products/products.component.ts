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

  merchants: Merchant[] = [];
  featuredProducts: Product[] = [];
  uniqueCategories: string[] = [];
  selectedCategory: string | null = null;
  selectedMerchant: Merchant | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.http.get<Merchant[]>('assets/datas/merchants.json').subscribe(
      (data) => {
        this.merchants = data;
        this.featuredProducts = data.flatMap((merchant) => merchant.products);
        this.initData();
      },
      (error) => {
        console.error('Error loading merchant data:', error);
      }
    );
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

  clearCategoryAndMerchantFilter(): void {
    this.selectedCategory = null;
    this.selectedMerchant = null;
  }

  getFilteredProducts(): Product[] {
    if (this.selectedCategory && this.selectedMerchant) {
      return this.featuredProducts.filter(
        (product) => product.category === this.selectedCategory && this.getMerchants(product) === this.selectedMerchant
      );
    } else if (this.selectedCategory) {
      return this.featuredProducts.filter((product) => product.category === this.selectedCategory);
    } else if (this.selectedMerchant) {
      return this.featuredProducts.filter((product) => this.getMerchants(product) === this.selectedMerchant);
    }
    return this.featuredProducts;
  }

  getMerchants(product: Product): Merchant {
    const merchant = this.merchants.find((m) => m.products.some((p) => p.id === product.id));
    return merchant!;
  }
  
}
