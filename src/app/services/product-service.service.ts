import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
  id: number;
  merchantID: number;
  slug: string;
  image: string;
  title: string;
  category: string;
  excerpt: string;
  description: string;
  available: boolean;
  price: number;
  purchaseLink: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = 'assets/datas/merchants.json'; // Update with the actual path

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.productsUrl).pipe(
      // Extract and flatten products from merchants
      map(merchants => merchants.flatMap(merchant => merchant.products))
    );
  }

  getProductBySlug(slug: string): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map(products => products.find(product => product.slug === slug))
    );
  }
}

