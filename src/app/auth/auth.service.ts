import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { UserInterface } from '../data/interfaces/userInterface';
import { CookieService } from 'ngx-cookie-service';
import { TokenResponse } from '../data/interfaces/authInterface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseApiUrl = 'http://localhost:3000';
  user = signal<UserInterface | null>(null);
  cookieService = inject(CookieService);
  token: string | null = null;
  refreshToken: string | null = null;

  login(payload: { email: string; password: string }) {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}/user/login`, payload)
      .pipe(tap((value: TokenResponse) => this.saveTokens(value)));
  }

  saveTokens(res: TokenResponse) {
    this.token = res.accessToken;
    this.refreshToken = res.refreshToken;
    this.cookieService.set('token', this.token);
    this.cookieService.set('refreshToken', this.refreshToken);
  }
}
