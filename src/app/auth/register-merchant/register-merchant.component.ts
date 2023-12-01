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

      if(this.merchantForm.value.name == 'John Doe' && this.merchantForm.value.email == 'merchant123@gmail.com'){
        alert('Congratuations! Your account has been approved!\nYou will be redirected shortly to the merchant dashboard for further instructions.');
        window.location.href = '/merchant/dashboard';
      }

      else{
        alert('Thank you for registering!\nWe will inform you in your email for your account verification\nonce is already approved by the Ministry of Tourism in about 3-4 Days.');
        window.location.href = '/';
      }
      
    } else {
      alert('Please fill in all required fields with valid data.');
    }
  }

}
