// src/app/auth/auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // Para o formulário de login

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';

// Imports do Angular Material que você usará no LoginComponent
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RegisterUserComponent } from './components/register-user/register-user.component';
// MatCardModule pode ser bom para estilizar o container do login
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterUserComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    // Módulos do Material
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class AuthModule { }
