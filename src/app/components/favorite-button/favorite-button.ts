import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-favorite-button',
  imports: [],
  templateUrl: './favorite-button.html',
  styleUrl: './favorite-button.css'
})
export class FavoriteButton {
  favorite = input.required<boolean>();
  onClick = output();

  click() {
    this.onClick.emit();
  }
}
