import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environment';
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest
} from './auth.model';

const AUTH_URL = `${environment.apiUrl}/auth`;
const TOKEN_KEY = 'goalify_token';
const USER_NAME_KEY = 'goalify_user_name';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  register(body: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AUTH_URL}/register`, body).pipe(
      tap((res) => {
        this.saveToken(res.token);
        this.saveUserInfo(res);
      })
    );
  }

  login(body: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${AUTH_URL}/login`, body).pipe(
      tap((res) => {
        this.saveToken(res.token);
        this.saveUserInfo(res);
      })
    );
  }
  getStoredUserName(): string | null {
    return localStorage.getItem(USER_NAME_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_NAME_KEY);
  }

  private saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  private saveUserInfo(res: AuthResponse): void {
    if (res.name != null) {
      localStorage.setItem(USER_NAME_KEY, res.name);
    }
  }
}