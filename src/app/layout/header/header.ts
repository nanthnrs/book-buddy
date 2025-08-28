import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  sidebarOpen = input<boolean>(false);
  toggleMenu = output<void>();

  toggle() {
    this.toggleMenu.emit();
  }
}
