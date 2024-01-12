import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductDetailsComponent } from './new-product-details.component';

describe('NewProductDetailsComponent', () => {
  let component: NewProductDetailsComponent;
  let fixture: ComponentFixture<NewProductDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewProductDetailsComponent]
    });
    fixture = TestBed.createComponent(NewProductDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
