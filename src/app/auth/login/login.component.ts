import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { MainApiServiceService } from '../../services/main-api-service.service';

type UserType = 'customer' | 'merchant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private apiService: MainApiServiceService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      userType: ['customer', Validators.required] 
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('NavigationEnd:', event);
      }
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      alert('Please fill in all required fields with valid data.');
      return;
    }

    const { email, password, userType } = this.loginForm.value;

    this.apiService.login({ email, password, userType }).subscribe(
      response => {
        localStorage.setItem('jwt', response.token);

        if (userType === 'merchant' && response.merchantId) {
          localStorage.setItem('merchantId', response.merchantId);
        }

        const dashboardRoute = this.getDashboardRoute(userType);
        this.router.navigate([dashboardRoute]);
      },
      error => {
        alert('Invalid Credentials! Please make sure that your data is correct.');
      }
    );
  }
  
  private getDashboardRoute(userType: string): string {
    const routeMap: { [key in UserType]: string } = {
      'customer': '/user/dashboard',
      'merchant': '/merchant/dashboard',
    };
    return routeMap[userType as UserType];
  }
  
}

