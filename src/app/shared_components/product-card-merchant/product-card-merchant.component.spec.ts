import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCardMerchantComponent } from './product-card-merchant.component';

describe('ProductCardMerchantComponent', () => {
  let component: ProductCardMerchantComponent;
  let fixture: ComponentFixture<ProductCardMerchantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCardMerchantComponent]
    });
    fixture = TestBed.createComponent(ProductCardMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
