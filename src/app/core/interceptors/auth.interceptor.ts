import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, from, switchMap } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private readonly AUTH_TOKEN_KEY = 'auth_token';

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Only add token to API requests
    if (!req.url.includes('/api/')) {
      return next.handle(req);
    }

    return from(Preferences.get({ key: this.AUTH_TOKEN_KEY })).pipe(
      switchMap(tokenData => {
        let authReq = req;
        
        if (tokenData.value) {
          authReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${tokenData.value}`
            }
          });
        }
        
        return next.handle(authReq);
      })
    );
  }
}
