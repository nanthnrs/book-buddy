import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

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
