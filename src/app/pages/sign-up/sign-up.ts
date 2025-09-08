import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
})
export class SignUp {
  private formBuilder = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly error = signal('');

  readonly form = this.formBuilder.group({
    name: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  get name() {
    return this.form.controls.name;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  get invalidName() {
    return this.name.invalid && (this.name.dirty || this.name.touched);
  }

  get invalidEmail() {
    return this.email.invalid && (this.email.dirty || this.email.touched);
  }

  get invalidPassword() {
    return (
      this.password.invalid && (this.password.dirty || this.password.touched)
    );
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.signUp(this.form.getRawValue()).subscribe({
      next: (response) => {
        console.log('User signed up successfully', response);
        this.authService.setAuthToken(response.data.email);
        this.error.set('');
        this.navigateToBooksPage();
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error signing up', error);
        if (error.status === 400 && error.error?.message) {
          this.error.set(error.error.message);
        } else {
          this.error.set('An unexpected error occurred. Please try again.');
        }
      },
    });
  }

  navigateToBooksPage() {
    this.router.navigateByUrl('/');
  }
}
