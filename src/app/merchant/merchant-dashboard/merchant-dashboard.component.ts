import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

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
  selector: 'app-merchant-dashboard',
  templateUrl: './merchant-dashboard.component.html',
  styleUrls: ['./merchant-dashboard.component.css']
})
export class MerchantDashboardComponent {
  merchants: Merchant[] = [];
  featuredProducts: Product[] = [];
  uniqueCategories: string[] = [];
  selectedCategory: string | null = null;
  selectedMerchantName: string | null = null;

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

  merchantName = 'Johor Bahru Exciting Tours';

  getMerchantByName(merchantName: string): Merchant | null {
    return this.merchants.find((merchant) => merchant.name === merchantName) || null;
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
    const merchant = this.merchants.find((m) => m.products.some((p) => p.id === product.id));
    return merchant!;
  }
}
