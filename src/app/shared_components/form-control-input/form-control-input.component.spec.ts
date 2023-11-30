import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControlInputComponent } from './form-control-input.component';

describe('FormControlInputComponent', () => {
  let component: FormControlInputComponent;
  let fixture: ComponentFixture<FormControlInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormControlInputComponent]
    });
    fixture = TestBed.createComponent(FormControlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
