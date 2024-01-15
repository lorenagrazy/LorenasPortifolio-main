import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen: boolean = false;
  isSmallScreen: boolean = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.checkScreenSize();
  }

  toggleMenu() {
    if (this.isSmallScreen) {
      this.isMenuOpen = !this.isMenuOpen;
      const menuButton = this.el.nativeElement.querySelector('.menu-button');
      if (menuButton) {
        if (this.isMenuOpen) {
          menuButton.classList.add('open');
        } else {
          menuButton.classList.remove('open');
        }
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth <= 768;
  }
}
