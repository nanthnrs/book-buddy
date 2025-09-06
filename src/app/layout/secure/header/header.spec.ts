import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Header } from './header';
import { provideRouter, Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let nativeElement: HTMLElement;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

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
        '#btn-sign-out'
      ) as HTMLAnchorElement;
      expect(button).toBeTruthy();
      expect(button?.textContent).toContain('Sign out');
    });

    it('should call authService.signOut when sign out button is clicked', () => {
      const spy = spyOn(authService, 'signOut').and.callThrough();

      const button = nativeElement.querySelector(
        '#btn-sign-out'
      ) as HTMLAnchorElement;
      button.click();

      expect(spy).toHaveBeenCalled();
    });

    it('should redirect to /sign-in after sign out', () => {
      spyOn(router, 'navigateByUrl');

      const button = nativeElement.querySelector(
        '#btn-sign-out'
      ) as HTMLAnchorElement;
      button.click();

      expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/sign-in');
    });
  });
});
