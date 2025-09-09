import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Footer } from './footer';
import { provideRouter } from '@angular/router';

describe('Footer', () => {
  let component: Footer;
  let fixture: ComponentFixture<Footer>;
  let nativeElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Footer],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Footer);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render menu items correctly', () => {
    const menuItems = nativeElement.querySelectorAll('.dock > a') as NodeListOf<HTMLAnchorElement>;
    expect(menuItems.length).toBe(component.items.length);
    menuItems.forEach((item, index) => {
      expect(item.getAttribute('href')).toBe(component.items[index].path);

      const icon = item.querySelector('i');
      expect(icon).toBeTruthy();
      expect(icon?.className).toContain(component.items[index].icon);

      const label = item.querySelector('.dock-label');
      expect(label).toBeTruthy();
      expect(label?.textContent).toContain(component.items[index].label);
    });
  });
});
