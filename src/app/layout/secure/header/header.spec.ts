import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { provideRouter } from '@angular/router';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthActions } from '../../../state/auth/auth.actions';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let nativeElement: HTMLElement;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        provideMockStore({}),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const title = nativeElement.querySelector('#title');
    expect(title).toBeTruthy();
    expect(title?.textContent).toContain('Book Buddy');
  });

  describe('sign out', () => {
    it('should have sign out button', () => {
      const button = nativeElement.querySelector(
        '#btn-sign-out',
      ) as HTMLAnchorElement;
      expect(button).toBeTruthy();
      expect(button?.textContent).toContain('Sign out');
    });

    it('should dispatch signOut action when sign out button is clicked', () => {
      spyOn(store, 'dispatch');

      const button = nativeElement.querySelector(
        '#btn-sign-out',
      ) as HTMLAnchorElement;
      button.click();

      expect(store.dispatch).toHaveBeenCalledOnceWith(AuthActions.signOut());
    });
  });
});
