import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { menuItems } from '../../core/constants/menu';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  items = menuItems;
}
