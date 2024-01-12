import { Component, Input, EventEmitter, Output } from '@angular/core';
import { MainApiServiceService, Merchant, Product } from '../../services/main-api-service.service';

@Component({
  selector: 'app-product-card-merchant',
  templateUrl: './product-card-merchant.component.html',
  styleUrls: ['./product-card-merchant.component.css']
})
export class ProductCardMerchantComponent {
  @Input() product!: Product;
  @Input() merchant!: Merchant | null;
  @Output() productDeleted = new EventEmitter<string>();

  constructor(private mainApiService: MainApiServiceService) {}

  deleteProduct(productId: string): void {
    if (confirm('Are you sure you want to delete this product?')) {
      this.mainApiService.deleteProduct(productId).subscribe(
        () => {
          console.log('Product deleted successfully');
          this.productDeleted.emit(productId);
          alert('Product deleted successfully');
        },
        error => {
          console.error('Error deleting product:', error);
          alert('There was an error deleting the product');
        }
      );
    }
  }
}



