import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Merchant {
rating: any;
  _id: string;
  name: string;
  email: string;
  password?: string;
  contactNumber: string;
  companyRegionLocation: string;
  companyDetails: string;
  accountStatus: string;
  registrationDate: Date;
  documents: string[];
}

export interface Product {
  avaliable: any;
image: any;
title: any;
excerpt: any;
  _id: string;
  productID: string;
  productImages: string[];
  name: string;
  slug: string;
  price: number;
  category: string;
  merchant: string;
  merchantName: string;
  companyRegionLocation: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class MainApiServiceService {
  private baseUrl = 'http://localhost:4201/api'; // Base URL for API calls

  constructor(private http: HttpClient) { }

  // Fetch all public merchants without authentication
  getAllMerchantsSimple(): Observable<Merchant[]> {
    return this.http.get<Merchant[]>(`${this.baseUrl}/merchants/verified`);
  }

  // Add new merchant
  addNewMerchant(merchantData: Merchant): Observable<Merchant> {
    return this.http.post<Merchant>(`${this.baseUrl}/merchants/new`, merchantData);
  }

  // Fetch products for a specific merchant
  getProductsByMerchant(merchantId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/merchants/products`, { 
      params: { merchantId }
    });
  }

  // Fetch all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/merchants/all-products`);
  }

  // Add new product
  addNewProduct(merchantId: string, productDetails: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}/merchants/products/new`, { merchantId, productDetails });
  }

  // Fetch product by slug
  getProductBySlug(slug: string): Observable<Product | undefined> {
    return this.getAllProducts().pipe(
      map(products => products.find(product => product.slug === slug))
    );
  }

  // Get unique categories
  getUniqueCategories(): Observable<string[]> {
    return this.getAllProducts().pipe(
      map(products => Array.from(new Set(products.map(product => product.category))))
    );
  }

  // Get filtered products
  getFilteredProducts(selectedCategory: string | null): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => selectedCategory ? products.filter(product => product.category === selectedCategory) : products)
    );
  }
}
