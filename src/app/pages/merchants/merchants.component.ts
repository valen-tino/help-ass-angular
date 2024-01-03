import { Component, OnInit } from '@angular/core';
import { MainApiServiceService, Merchant } from 'src/app/services/main-api-service.service';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css']
})

export class MerchantsComponent implements OnInit {
  merchant: Merchant[] = []; // Change the type based on your merchant data structure

  constructor(private MainApiService: MainApiServiceService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.MainApiService.getAllMerchantsSimple().subscribe({
      next: (merchants: Merchant[]) => {
        this.merchant = merchants;
        console.log(this.merchant); 
      },
      error: error => console.error('Error loading merchants:', error.message),
      complete: () => console.log('Merchant loading complete') // Optional
    });
  }  
}
