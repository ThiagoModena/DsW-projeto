// src/app/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const BASIC_AUTH_CREDENTIALS_KEY = 'basicAuthCredentials';

export interface AppUserCredentials {
  username: string;
  password?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrlBase = 'http://localhost:8080/beauty-clinic-api/v1';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', username)
      .set('password', password);


      console.log("eae blz")
    return this.http.get(`${this.apiUrlBase}/adm/check`, { params }).pipe(
      tap(() => {
        // Se a chamada HTTP for bem-sucedida (entrar no 'tap' ou no 'next' do subscribe),
        // consideramos as credenciais válidas e as armazenamos para Basic Auth.
        const encodedCredentials = btoa(`${username}:${password}`);
        localStorage.setItem(BASIC_AUTH_CREDENTIALS_KEY, encodedCredentials);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(BASIC_AUTH_CREDENTIALS_KEY);
    this.router.navigate(['/auth/login']);
  }

  getBasicAuthCredentials(): string | null {
    return localStorage.getItem(BASIC_AUTH_CREDENTIALS_KEY);
  }

  isAuthenticated(): boolean {
    return !!this.getBasicAuthCredentials(); // Retorna true se houver credenciais
  }

  registerUser(credentials: AppUserCredentials): Observable<any> { // O 'any' pode ser trocado por um tipo específico de resposta da API
    return this.http.post(
      `${this.apiUrlBase}/adm/register`,
      credentials,
      { responseType: 'text' }
    );
  }
}
