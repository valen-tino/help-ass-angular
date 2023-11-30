import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSubMenuHidden = true;

  dropdown() {
    this.isSubMenuHidden = !this.isSubMenuHidden;
  }

  openSidebar() {
    // You can add logic here if needed
  }
}
