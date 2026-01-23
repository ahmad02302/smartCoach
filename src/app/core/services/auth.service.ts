import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface AuthResponse {
  message: string;
  user: User;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly AUTH_TOKEN_KEY = 'auth_token';
  private readonly API_URL = `${environment.apiUrl}/auth`;
  
  private authStateSubject = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null
  });
  
  public authState$: Observable<AuthState> = this.authStateSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.checkAuthState();
  }

  private async checkAuthState(): Promise<void> {
    try {
      const token = await Preferences.get({ key: this.AUTH_TOKEN_KEY });
      
      if (token.value) {
        // Verify token and get user data
        const user = await this.getCurrentUserFromApi(token.value);
        if (user) {
          this.authStateSubject.next({
            isAuthenticated: true,
            user
          });
          return;
        }
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
      // Clear invalid token
      await Preferences.remove({ key: this.AUTH_TOKEN_KEY });
    }
    
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null
    });
  }

  private async getCurrentUserFromApi(token: string): Promise<User | null> {
    try {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      
      const user = await firstValueFrom(
        this.http.get<User>(`${this.API_URL}/me`, { headers })
      );
      return user;
    } catch (error) {
      console.error('Error fetching user from API:', error);
      return null;
    }
  }

  async register(email: string, password: string, firstName: string, lastName: string): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.API_URL}/register`, {
          email,
          password,
          firstName,
          lastName
        })
      );

      // Store token securely
      await Preferences.set({ key: this.AUTH_TOKEN_KEY, value: response.token });

      // Update auth state
      this.authStateSubject.next({
        isAuthenticated: true,
        user: response.user
      });
    } catch (error: any) {
      const errorMessage = error.error?.error || error.error?.message || 'Registration failed';
      throw new Error(errorMessage);
    }
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const response = await firstValueFrom(
        this.http.post<AuthResponse>(`${this.API_URL}/login`, {
          email,
          password
        })
      );

      // Store token securely
      await Preferences.set({ key: this.AUTH_TOKEN_KEY, value: response.token });

      // Update auth state
      this.authStateSubject.next({
        isAuthenticated: true,
        user: response.user
      });
    } catch (error: any) {
      const errorMessage = error.error?.error || error.error?.message || 'Login failed';
      throw new Error(errorMessage);
    }
  }

  async logout(): Promise<void> {
    await Preferences.remove({ key: this.AUTH_TOKEN_KEY });
    
    this.authStateSubject.next({
      isAuthenticated: false,
      user: null
    });

    this.router.navigate(['/login']);
  }

  getCurrentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  async getAuthToken(): Promise<string | null> {
    try {
      const token = await Preferences.get({ key: this.AUTH_TOKEN_KEY });
      return token.value;
    } catch (error) {
      return null;
    }
  }

  getAuthHeaders(): HttpHeaders {
    // This is a synchronous method, but token is async
    // For immediate use, you might need to handle this differently
    // or use an interceptor
    return new HttpHeaders();
  }
}
