// src/app/auth/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Importe seu AuthService

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const basicAuthCredentials = this.authService.getBasicAuthCredentials();
    const isApiUrl = request.url.startsWith('http://localhost:8080/beauty-clinic-api/v1'); // Verifique se é uma URL da sua API

    if (basicAuthCredentials && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Basic ${basicAuthCredentials}`
        }
      });
    }

    return next.handle(request);
  }
}
