import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUp } from './sign-up';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth/auth.service';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('SignUp', () => {
  let component: SignUp;
  let fixture: ComponentFixture<SignUp>;
  let nativeElement: HTMLElement;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUp],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(SignUp);
    component = fixture.componentInstance;
    nativeElement = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('form', () => {
    let nameInput: HTMLInputElement;
    let emailInput: HTMLInputElement;
    let passwordInput: HTMLInputElement;
    let submitButton: HTMLButtonElement;

    beforeEach(() => {
      nameInput = nativeElement.querySelector('#name') as HTMLInputElement;
      emailInput = nativeElement.querySelector('#email') as HTMLInputElement;
      passwordInput = nativeElement.querySelector(
        '#password',
      ) as HTMLInputElement;
      submitButton = nativeElement.querySelector(
        '#btn-sign-up',
      ) as HTMLButtonElement;
    });

    it('should render sign up form', () => {
      expect(nameInput).toBeTruthy();
      expect(emailInput).toBeTruthy();
      expect(passwordInput).toBeTruthy();
      expect(submitButton).toBeTruthy();
    });

    it('should render validation errors when form inputs are empty and submitted', () => {
      spyOn(authService, 'signUp');

      nameInput.value = '';
      nameInput.dispatchEvent(new Event('input'));

      emailInput.value = '';
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = '';
      passwordInput.dispatchEvent(new Event('input'));

      submitButton.click();
      fixture.detectChanges();

      const nameError = nativeElement.querySelector('#name + .validator-error');
      const emailError = nativeElement.querySelector(
        '#email + .validator-error',
      );
      const passwordError = nativeElement.querySelector(
        '#password + .validator-error',
      );

      expect(nameError?.textContent).toContain('Name is required.');
      expect(emailError?.textContent).toContain('Email is required.');
      expect(passwordError?.textContent).toContain('Password is required.');
      expect(authService.signUp).not.toHaveBeenCalled();
    });

    it('should render email validation error when email is invalid and form is submitted', () => {
      spyOn(authService, 'signUp');

      nameInput.value = 'Jo';
      nameInput.dispatchEvent(new Event('input'));

      emailInput.value = 'invalid-email';
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = '12345';
      passwordInput.dispatchEvent(new Event('input'));

      submitButton.click();
      fixture.detectChanges();

      const nameError = nativeElement.querySelector('#name + .validator-error');
      const emailError = nativeElement.querySelector(
        '#email + .validator-error',
      );
      const passwordError = nativeElement.querySelector(
        '#password + .validator-error',
      );

      expect(nameError?.textContent).toContain(
        'Name must be at least 3 characters long.',
      );
      expect(emailError?.textContent).toContain(
        'Email must be a valid email address.',
      );
      expect(passwordError?.textContent).toContain(
        'Password must be at least 6 characters long.',
      );
      expect(authService.signUp).not.toHaveBeenCalled();
    });

    it('should save auth token and navigate to books page when sign up successfully', () => {
      const user = {
        name: 'Nanthawut',
        email: 'nanthawut@email.com',
        password: 'password',
      };

      spyOn(authService, 'signUp').and.returnValue(
        of({
          data: {
            email: user.email,
          },
        }),
      );
      spyOn(authService, 'setAuthToken');
      spyOn(router, 'navigateByUrl');

      nameInput.value = user.name;
      nameInput.dispatchEvent(new Event('input'));

      emailInput.value = user.email;
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = user.password;
      passwordInput.dispatchEvent(new Event('input'));

      submitButton.click();
      fixture.detectChanges();

      expect(authService.signUp).toHaveBeenCalledOnceWith({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      expect(authService.setAuthToken).toHaveBeenCalledOnceWith(user.email);
      expect(router.navigateByUrl).toHaveBeenCalledOnceWith('/');
    });

    it('should show error message when sign up fails', () => {
      const user = {
        name: 'Nanthawut',
        email: 'nanthawut@email.com',
        password: 'password',
      };
      const errorMessage =
        'Email is already registered. Please use a different email.';

      spyOn(authService, 'signUp').and.returnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              error: { message: errorMessage },
              status: 400,
            }),
        ),
      );
      spyOn(authService, 'setAuthToken');
      spyOn(router, 'navigateByUrl');

      nameInput.value = user.name;
      nameInput.dispatchEvent(new Event('input'));

      emailInput.value = user.email;
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = user.password;
      passwordInput.dispatchEvent(new Event('input'));

      submitButton.click();
      fixture.detectChanges();

      const alertError = nativeElement.querySelector('[role="alert"]');

      expect(authService.signUp).toHaveBeenCalledOnceWith({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      expect(alertError?.textContent).toContain(errorMessage);
      expect(authService.setAuthToken).not.toHaveBeenCalled();
      expect(router.navigateByUrl).not.toHaveBeenCalled();
    });

    it('should show default error message when sign up fails without message', () => {
      const user = {
        name: 'Nanthawut',
        email: 'nanthawut@email.com',
        password: 'password',
      };
      const defaultErrorMessage =
        'An unexpected error occurred. Please try again.';

      spyOn(authService, 'signUp').and.returnValue(
        throwError(
          () =>
            new HttpErrorResponse({
              status: 500,
            }),
        ),
      );
      spyOn(authService, 'setAuthToken');
      spyOn(router, 'navigateByUrl');

      nameInput.value = user.name;
      nameInput.dispatchEvent(new Event('input'));

      emailInput.value = user.email;
      emailInput.dispatchEvent(new Event('input'));

      passwordInput.value = user.password;
      passwordInput.dispatchEvent(new Event('input'));

      submitButton.click();
      fixture.detectChanges();

      const alertError = nativeElement.querySelector('[role="alert"]');
      expect(alertError?.textContent).toContain(defaultErrorMessage);
    });
  });
});
