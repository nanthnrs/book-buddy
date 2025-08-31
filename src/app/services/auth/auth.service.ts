import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LocalStorage } from '../local-storage/local-storage';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storage = inject(LocalStorage);

  setAuthToken(token: string) {
    this.storage.setItem('authToken', token);
  }

  getAuthToken(): string | null {
    return this.storage.getItem('authToken');
  }

  removeAuthToken(): void {
    this.storage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  signIn(data: { email: string; password: string }) {
    return this.http.post<{ data: { email: string } }>(
      `${environment.baseAuthApiUrl}/sign-in`,
      data
    );
  }

  signUp(data: { email: string; password: string }) {
    return this.http.post<{ data: { email: string } }>(
      `${environment.baseAuthApiUrl}/sign-up`,
      data
    );
  }
}
