import { Component, OnInit } from '@angular/core';
import { ProductService, Merchant } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css']
})

export class MerchantsComponent implements OnInit {
  merchant: Merchant[] = []; // Change the type based on your merchant data structure

  constructor(private ProductService: ProductService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.ProductService.getMerchantsData().subscribe(
      (data: Merchant[]) => {
        this.merchant = data;
      },
      (error: Merchant) => {
        console.error('Error loading Merchant data:', error);
      }
    );
  }
}
