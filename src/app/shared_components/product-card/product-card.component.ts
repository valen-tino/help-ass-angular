import { Component, Input } from '@angular/core';
import { Product, Merchant } from '../../pages/home/home.component'; // Make sure to import the interfaces
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Input() merchant!: Merchant;
}