import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormControlImageComponent } from './form-control-image.component';

describe('FormControlImageComponent', () => {
  let component: FormControlImageComponent;
  let fixture: ComponentFixture<FormControlImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormControlImageComponent]
    });
    fixture = TestBed.createComponent(FormControlImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
