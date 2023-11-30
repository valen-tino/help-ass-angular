import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-merchant',
  templateUrl: './register-merchant.component.html',
  styleUrls: ['./register-merchant.component.css']
})
export class RegisterMerchantComponent {
  merchantForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.merchantForm = this.fb.group({
      name: ['', [Validators.required]],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      companyDescription: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.merchantForm.valid) {
      // Perform registration logic here
      alert('Merchant registration successful!');
    } else {
      alert('Please fill in all required fields with valid data.');
    }
  }

}
