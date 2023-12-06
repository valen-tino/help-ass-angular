import { Component, Input } from '@angular/core';
import { ProductService, Product, Merchant } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-purchase-modal',
  templateUrl: './purchase-modal.component.html',
  styleUrls: ['./purchase-modal.component.css']
})
export class PurchaseModalComponent {
  @Input() product!: Product;
}
