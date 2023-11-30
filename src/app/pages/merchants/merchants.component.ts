import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.css']
})
export class MerchantsComponent implements OnInit {
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
