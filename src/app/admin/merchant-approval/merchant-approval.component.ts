import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-merchant-approval',
  templateUrl: './merchant-approval.component.html',
  styleUrls: ['./merchant-approval.component.css']
})
export class MerchantApprovalComponent {
  merchants: any[] = []; // Change the type based on your merchant data structure

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Use HttpClient to load data from the JSON file
    this.http.get<any[]>('assets/datas/merchants.json').subscribe(
      (data) => {
        this.merchants = data;
      },
      (error) => {
        console.error('Error loading merchant data:', error);
      }
    );
  }
}
