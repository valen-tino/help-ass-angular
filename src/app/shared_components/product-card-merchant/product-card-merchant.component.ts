import { Component, Input } from '@angular/core';
import { Merchant, Product } from '../../services/product-service.service'; // Make sure to import the interfaces
@Component({
  selector: 'app-product-card-merchant',
  templateUrl: './product-card-merchant.component.html',
  styleUrls: ['./product-card-merchant.component.css']
})
export class ProductCardMerchantComponent {
  @Input() product!: Product;
  @Input() merchant!: Merchant;
}