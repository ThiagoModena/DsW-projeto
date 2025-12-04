// src/app/auth/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service'; // Importe seu AuthService

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated()) {
      return true; // Usuário está autenticado, permite acesso
    } else {
      // Usuário não está autenticado, redireciona para a página de login
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      // O queryParams returnUrl é opcional, mas útil para redirecionar de volta após o login
      return false;
    }
  }
}
