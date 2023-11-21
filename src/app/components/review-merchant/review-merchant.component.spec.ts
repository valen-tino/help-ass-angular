import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewMerchantComponent } from './review-merchant.component';

describe('ReviewMerchantComponent', () => {
  let component: ReviewMerchantComponent;
  let fixture: ComponentFixture<ReviewMerchantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewMerchantComponent]
    });
    fixture = TestBed.createComponent(ReviewMerchantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
