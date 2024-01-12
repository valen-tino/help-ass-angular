import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MainApiServiceService } from '../../../services/main-api-service.service';

@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent {
  showMenu = false;

  constructor(
    private apiService: MainApiServiceService,
    private router: Router
  ) {}

  toggleNavbar() {
    this.showMenu = !this.showMenu;
  }

  logout() {
    this.apiService.logout();
    this.router.navigate(['/login']); // Navigate to login or home page
  }
}