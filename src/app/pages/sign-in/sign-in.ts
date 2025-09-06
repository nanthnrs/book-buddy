import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-in.html',
  styleUrl: './sign-in.css',
})
export class SignIn {
  private formBuilder = inject(FormBuilder);
  private router = inject(Router);
  private authService = inject(AuthService);

  protected form = this.formBuilder.group({
    email: this.formBuilder.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.formBuilder.nonNullable.control('', [Validators.required]),
  });

  protected error = signal<string | null>(null);

  get email() {
    return this.form.controls.email;
  }

  get invalidEmail() {
    return this.email.invalid && (this.email.dirty || this.email.touched);
  }

  get password() {
    return this.form.controls.password;
  }

  get invalidPassword() {
    return (
      this.password.invalid && (this.password.dirty || this.password.touched)
    );
  }

  signIn() {
    if (this.form.invalid) {
      return;
    }

    this.authService.signIn(this.form.getRawValue()).subscribe({
      next: (response) => {
        console.log('User signed in successfully', response);
        this.authService.setAuthToken(response.data.email);
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error signing in', error);
        this.error.set(
          error?.error?.message || 'Failed to sign in! Please try again.',
        );
      },
    });
  }
}
