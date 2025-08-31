import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchInput } from './search-input';

describe('SearchInput', () => {
  let component: SearchInput;
  let fixture: ComponentFixture<SearchInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchInput);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update value on input event', async () => {
    const inputEl = fixture.nativeElement.querySelector('input');
    inputEl.value = 'Test';
    inputEl.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    expect(component.value()).toBe('Test');
  });
});
