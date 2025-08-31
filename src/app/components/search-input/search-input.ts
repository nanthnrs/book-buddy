import { Component, input, model } from '@angular/core';

@Component({
  selector: 'app-search-input',
  imports: [],
  templateUrl: './search-input.html',
  styleUrl: './search-input.css',
})
export class SearchInput {
  value = model('');
  placeholder = input('Search...');

  onInput(value: Event) {
    const inputEl = value.target as HTMLInputElement;
    this.value.set(inputEl.value);
  }
}
