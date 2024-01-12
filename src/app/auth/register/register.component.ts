import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

interface RegisterResponse {
  token: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private http: HttpClient, private router: Router, private fb: FormBuilder) {
    const customerID = this.generateCustomerID();
    this.registerForm = this.fb.group({
      customerID: [customerID],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit(): void {
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value ? null : {'mismatch': true};
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      alert("Please fill all the fields correctly");
      return;
    }

    if (this.registerForm.hasError('mismatch')) {
      alert("Passwords do not match");
      return;
    }
    
    this.http.post('http://localhost:4201/api/customer-register', this.registerForm.value, {
      withCredentials: true
    }).subscribe(
      (response: any) => {
        const token = (response as RegisterResponse).token;
        localStorage.setItem('jwtToken', token);
        alert('Registration successful!\nPlease login to continue');
        this.router.navigate(['/login']);
      },
      error => {
        console.error(error);
        alert('Registration failed: ' + (error.error.message || 'Server Error'));
      }
    );
  }

  private generateCustomerID(): string {
    const length = 6;
    const numbers = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
  }
}
