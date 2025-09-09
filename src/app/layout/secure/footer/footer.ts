import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { menuItems } from '../../../core/constants/menu';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  readonly items = menuItems
}
