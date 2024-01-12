import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainApiServiceService, Product } from '../../services/main-api-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-product-details',
  templateUrl: './new-product-details.component.html',
  styleUrls: ['./new-product-details.component.css']
})
export class NewProductDetailsComponent implements OnInit, OnDestroy{
  product: Product | undefined;
  private routeSub: Subscription | undefined;

  lightboxOpen = false;
  selectedImageIndex: number = 0;

  constructor(private route: ActivatedRoute, private apiService: MainApiServiceService) {}

  ngOnInit() {
    this.routeSub = this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.apiService.getProductBySlug(slug).subscribe(
          product => {
            this.product = product;
          },
          error => {
            console.error('Error fetching product: ', error);
          }
        );        
      }
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  openLightbox(index: number): void {
    this.lightboxOpen = true;
    this.selectedImageIndex = index;
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
  }
}
