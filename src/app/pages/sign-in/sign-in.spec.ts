import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignIn } from './sign-in';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('SignIn', () => {
  let component: SignIn;
  let fixture: ComponentFixture<SignIn>;
  let nativeElement: HTMLElement;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignIn],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(SignIn);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('signIn', () => {
    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let submitButton: HTMLButtonElement;

    beforeEach(() => {
      emailInput = nativeElement.querySelector('#email') as HTMLInputElement;
      passwordInput = nativeElement.querySelector(
        '#password',
      ) as HTMLInputElement;
      submitButton = nativeElement.querySelector(
        '#btn-sign-in',
      ) as HTMLButtonElement;
    });

    it('should render sign in form', () => {
      expect(nativeElement.querySelector('form')).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
      expect(submitButton).toBeTruthy();
    });

    it('should render error message when form is empty', () => {
      spyOn(authService, 'signIn');

      emailInput.value = '';
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = '';
      passwordInput.dispatchEvent(new Event('input'));

      submitButton.click();
      fixture.detectChanges();

      const emailError = nativeElement.querySelector(
        '#email + p.validator-error',
      );
      const passwordError = nativeElement.querySelector(
        '#password + p.validator-error',
      );

      expect(emailError?.textContent)
        .withContext('email validator error')
        .toContain('Email is required.');
      expect(passwordError?.textContent)
        .withContext('password validator error')
        .toContain('Password is required.');

      expect(authService.signIn).not.toHaveBeenCalled();
    });

    it('should render error message when form is invalid', () => {
      spyOn(authService, 'signIn');

      emailInput.value = 'invalid-email';
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = 'password';
      passwordInput.dispatchEvent(new Event('input'));

      submitButton.click();
      fixture.detectChanges();

      const emailError = nativeElement.querySelector(
        '#email + p.validator-error',
      );
      const passwordError = nativeElement.querySelector(
        '#password + p.validator-error',
      );

      expect(emailError?.textContent)
        .withContext('email validator error')
        .toContain('Email must be a valid email address.');
      expect(passwordError).withContext('password validator error').toBeFalsy();

      expect(authService.signIn).not.toHaveBeenCalled();
    });

    it('should save auth token and navigate to root page when sign in successfully', () => {
      const userEmail = 'user@email.com';
      const userPassword = 'password';

      spyOn(authService, 'signIn').and.returnValue(
        of({
          data: {
            email: userEmail,
          },
        }),
      );
      spyOn(authService, 'setAuthToken');
      spyOn(router, 'navigate');

      emailInput.value = userEmail;
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = userPassword;
      passwordInput.dispatchEvent(new Event('input'));

      submitButton.click();
      fixture.detectChanges();

      const emailValidatorError = nativeElement.querySelector(
        '#email + p.validator-error',
      );
      const passwordValidatorError = nativeElement.querySelector(
        '#password + p.validator-error',
      );

      expect(emailValidatorError)
        .withContext('email validator error')
        .toBeFalsy();
      expect(passwordValidatorError)
        .withContext('password validator error')
        .toBeFalsy();

      expect(authService.signIn).toHaveBeenCalledOnceWith({
        email: userEmail,
        password: userPassword,
      });
      expect(authService.setAuthToken).toHaveBeenCalledOnceWith(userEmail);
      expect(router.navigate).toHaveBeenCalledOnceWith(['/']);
    });

    it('should render error message when invalid email or password', () => {
      spyOn(authService, 'signIn').and.returnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              error: {
                message: 'Invalid email or password',
              },
              status: 401,
            }),
        ),
      );
      spyOn(authService, 'setAuthToken');
      spyOn(router, 'navigate');

      emailInput.value = 'user@email.com';
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = 'password';
      passwordInput.dispatchEvent(new Event('input'));

      submitButton.click();
      fixture.detectChanges();

      const alertError = nativeElement.querySelector('[role="alert"]');

      expect(alertError).withContext('alert error').toBeTruthy();
      expect(alertError?.textContent).toContain('Invalid email or password');

      expect(authService.signIn).toHaveBeenCalled();
      expect(authService.setAuthToken).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should render generic error message when sign in fails', () => {
      spyOn(authService, 'signIn').and.returnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              status: 500,
            }),
        ),
      );
      spyOn(authService, 'setAuthToken');
      spyOn(router, 'navigate');

      emailInput.value = 'user@email.com';
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = 'password';
      passwordInput.dispatchEvent(new Event('input'));

      submitButton.click();
      fixture.detectChanges();

      const alertError = nativeElement.querySelector('[role="alert"]');

      expect(alertError).withContext('alert error').toBeTruthy();
      expect(alertError?.textContent).toContain(
        'An unexpected error occurred. Please try again later.',
      );

      expect(authService.signIn).toHaveBeenCalled();
      expect(authService.setAuthToken).not.toHaveBeenCalled();
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('sign up link', () => {
    it('should render sign up link', () => {
      const signUpLink = nativeElement.querySelector(
        'a[href="/sign-up"]',
      ) as HTMLAnchorElement;
      expect(signUpLink).toBeTruthy();
      expect(signUpLink.textContent).toContain('Sign up');
    });
  });
});
