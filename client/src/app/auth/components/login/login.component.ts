// src/app/auth/components/login/login.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service'; // Criaremos este serviço

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: string | null = null;
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
     private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    // Se já estiver logado, redirecionar (opcional)
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/clients']); // Ou para a página principal
    }
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.isSubmitting = true;
    this.loginError = null;

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;

    // No seu caso, não há uma chamada de API de "login" que retorna token.
    // Vamos "logar" armazenando as credenciais para Basic Auth.
    this.authService.login(username, password).subscribe({
      next: (response) => { // A API de validação retornou sucesso
        this.isSubmitting = false;
        // As credenciais já foram salvas no localStorage pelo 'tap' no AuthService
        console.log('Login validado pelo backend, credenciais salvas:', response); // response é o que a API GET /adm retornou
        this.router.navigate(['/clients']); // Navegue para a primeira página protegida
      },
      error: (err) => { // A API de validação retornou erro (ex: 401, 404) ou houve outro erro HTTP
        this.isSubmitting = false;
        // Limpar quaisquer credenciais que possam ter sido salvas por engano ou de tentativas anteriores
        localStorage.removeItem('basicAuthCredentials'); // Garante que não fique lixo no storage

        if (err.status === 401 || err.status === 403 || err.status === 404) {
          this.loginError = 'Usuário ou senha inválidos.';
        } else if (err.error && typeof err.error.message === 'string') {
            this.loginError = err.error.message;
        } else if (err.error && typeof err.error === 'string') {
            this.loginError = err.error; // Se o erro for uma string simples no corpo
        } else {
          this.loginError = 'Falha ao tentar fazer login. Tente novamente mais tarde.';
        }
        console.error("Erro na validação do login via API:", err);
      }
    });
  }
}
