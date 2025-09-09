import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LocalStorage } from '../local-storage/local-storage';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let storage: LocalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()],
    });
    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    storage = TestBed.inject(LocalStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signIn', () => {
    it('should call sign in api', (done) => {
      const signInData = { email: 'test@mail.com', password: 'password' };
      const spy = spyOn(httpClient, 'post').and.returnValue(
        of({
          data: {
            email: signInData.email,
          },
        }),
      );

      service.signIn(signInData).subscribe((res) => {
        expect(spy).toHaveBeenCalledOnceWith(
          `${environment.baseAuthApiUrl}/sign-in`,
          signInData,
        );
        expect(res.data.email).toBe(signInData.email);
        done();
      });
    });
  });

  describe('signUp', () => {
    it('should call sign up api', (done) => {
      const signUpData = {
        name: 'Nanthawut',
        email: 'test@mail.com',
        password: 'password',
      };
      const spy = spyOn(httpClient, 'post').and.returnValue(
        of({
          data: {
            email: signUpData.email,
          },
        }),
      );

      service.signUp(signUpData).subscribe((res) => {
        expect(spy).toHaveBeenCalledOnceWith(
          `${environment.baseAuthApiUrl}/sign-up`,
          signUpData,
        );
        expect(res.data.email).toBe(signUpData.email);
        done();
      });
    });
  });

  describe('signOut', () => {
    it('should remove auth token from local storage', () => {
      const spy = spyOn(storage, 'removeItem').and.callThrough();
      service.signOut();
      expect(spy).toHaveBeenCalledOnceWith('authToken');
    });
  });

  describe('getProfile', () => {
    it('should call get profile api with auth token', (done) => {
      const user = { name: 'User', email: 'user@email.com' };

      spyOn(service, 'getAuthToken').and.returnValue('auth-token');
      spyOn(httpClient, 'get').and.returnValue(
        of({
          data: user,
        }),
      );

      service.getProfile().subscribe((res) => {
        expect(httpClient.get).toHaveBeenCalledOnceWith(
          `${environment.baseAuthApiUrl}/profile`,
          {
            headers: {
              Authorization: 'Bearer auth-token',
            },
          },
        );
        expect(res).toEqual({ data: user });
        done();
      });
    });

    it('should throw error if no auth token found', (done) => {
      spyOn(service, 'getAuthToken').and.returnValue(null);
      service.getProfile().subscribe({
        next: () => {
          done.fail('expected an error');
        },
        error: (error) => {
          expect(error).toBeInstanceOf(Error);
          expect(error.message).toBe('No auth token found');
          done();
        },
      });
    });
  });
});
