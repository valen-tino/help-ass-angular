import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {

    // Perform login logic here
    if (this.loginForm.valid) {

      if(this.loginForm.value.email == 'customer123@gmail.com' && this.loginForm.value.password == 'newCust123'){
        alert('Welcome back Customer!');
        window.location.href = '/user/dashboard';
      }

      else if(this.loginForm.value.email == 'merchant123@gmail.com' && this.loginForm.value.password == 'newMer123'){
        alert('Welcome back Merchant!');
        window.location.href = '/merchant/dashboard';
      }

      else if(this.loginForm.value.email == 'admin_ministry@admin.com' && this.loginForm.value.password == 'ministry123'){
        alert('Welcome back Ministry');
        window.location.href = '/admin/merchant-approval';
      }

      else{
        alert('Invalid Credentials! Please make sure that your data is correct.');
      }
 
    } else {
      alert('Please fill in all required fields with valid data.');
    }
  }
}
