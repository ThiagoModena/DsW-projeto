// src/app/auth/components/register-user/register-user.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, AppUserCredentials } from '../../services/auth.service'; // Ajuste AppUserCredentials se criar interface

// Função para validar se as senhas coincidem
export function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  registerForm: FormGroup;
  registrationError: string | null = null;
  isSubmitting: boolean = false;
  registrationSuccess: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]], // Exemplo: mínimo 6 caracteres
      confirmPassword: ['', Validators.required]
    }, { validators: passwordMatchValidator }); // Adiciona o validador no nível do FormGroup
  }

  ngOnInit(): void { }

  // Getters para fácil acesso no template
  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched(); // Marca todos para mostrar erros
      return;
    }

    this.isSubmitting = true;
    this.registrationError = null;
    this.registrationSuccess = false;

    // Pegamos apenas username e password para enviar para a API
    const credentials: AppUserCredentials = { // Crie esta interface no auth.service.ts ou em um arquivo de modelos
      username: this.registerForm.value.username,
      password: this.registerForm.value.password
    };

    this.authService.registerUser(credentials).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.registrationSuccess = true;
        console.log('Usuário da aplicação registrado com sucesso:', response);
        // Opcional: redirecionar para o login ou mostrar mensagem de sucesso e limpar form

        this.authService.login(credentials.username, credentials.password);

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000); // Redireciona após 2 segundos
      },
      error: (err) => {
        this.isSubmitting = false;
        if (err.error && typeof err.error.message === 'string') {
          this.registrationError = err.error.message;
        } else if (err.error && typeof err.error === 'string') {
          this.registrationError = err.error;
        } else if (err.message) {
          this.registrationError = err.message;
        } else {
          this.registrationError = 'Falha ao registrar usuário. Tente novamente.';
        }
        console.error('Erro ao registrar usuário da aplicação:', err);
      }
    });
  }
}
