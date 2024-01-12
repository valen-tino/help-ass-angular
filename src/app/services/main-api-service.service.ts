import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

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
  description: any;
  title: any;
  excerpt: any;
  _id?: any;
  productID: string;
  productImages: string[];
  name: string;
  slug: string;
  price: number;
  category: string;
  merchant: any;
  merchantName: string;
  companyRegionLocation: string;
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class MainApiServiceService {
  private baseUrl = 'http://localhost:4201/api'; // Base URL for API calls

  constructor(private http: HttpClient, private router: Router) { }

  // In MainApiServiceService
  login(data: { email: string; password: string; userType: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, data);
  } 

  logout(): void {
    localStorage.removeItem('jwt');  // Remove the token & merchant id
    localStorage.removeItem('merchantId');
    alert('You have been logged out.');
    this.router.navigate(['/']);
  }

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

  // Upload Product Image
  uploadProductImages(merchantId: string, formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/merchants/${merchantId}/uploadImages`, formData);
  }

  // Method to fetch a product by its slug
  getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/products/${slug}`);
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

  // Delete product
  deleteProduct(productId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/merchants/products/${productId}`);
  }

  // Method to fetch merchant data by ID
  getMerchantById(merchantId: string): Observable<Merchant> {
    return this.http.get<Merchant>(`${this.baseUrl}/merchants/${merchantId}`);
  }
    
  // Fetch merchant data by ID
  getProductsByMerchantId(merchantId: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/merchants/products?merchantId=${merchantId}`);
  }  
  


}
