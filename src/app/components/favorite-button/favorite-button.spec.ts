import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteButton } from './favorite-button';

describe('FavoriteButton', () => {
  let component: FavoriteButton;
  let fixture: ComponentFixture<FavoriteButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoriteButton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoriteButton);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('favorite', false);
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render icon correctly when favorite is false', async () => {
    fixture.componentRef.setInput('favorite', false);
    await fixture.whenStable();

    const icon = fixture.nativeElement.querySelector('button i.bi') as HTMLLIElement;
    expect(icon).toBeTruthy();
    expect(icon.className).toEqual('bi bi-heart');
  });

  it('should render icon correctly when favorite is true', async () => {
    fixture.componentRef.setInput('favorite', true);
    await fixture.whenStable();

    const icon = fixture.nativeElement.querySelector('button i.bi') as HTMLLIElement;
    expect(icon).toBeTruthy();
    expect(icon.className).toEqual('bi bi-heart-fill text-red-500');
  });

  it('should emit click event when button is clicked', () => {
    spyOn(component.onClick, 'emit');

    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    button.click();

    expect(component.onClick.emit).toHaveBeenCalled();
  });
});
