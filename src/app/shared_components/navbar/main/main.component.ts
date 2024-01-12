import { Component, HostListener  } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  showMenu = false;
  isScrolled = false;

  toggleNavbar(){
    this.showMenu = !this.showMenu;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const yOffset = window.scrollY;
    this.isScrolled = yOffset > 0;
  }
}
