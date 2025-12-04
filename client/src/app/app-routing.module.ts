import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';


const routes: Routes = [
  {
    path: 'auth', // Ou apenas 'login' se preferir /login diretamente na raiz
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'estheticians',
    loadChildren: () => import('./estheticians/estheticians.module').then(m => m.EstheticiansModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'procedures',
    loadChildren: () => import('./procedures/procedures.module').then(m => m.ProceduresModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sessions',
    loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'appointments',
    loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '', // Rota padrão, redireciona para uma das áreas ou uma dashboard
    redirectTo: '/clients', // Exemplo, redireciona para clientes
    pathMatch: 'full'
  },
  {
    path: '**', // Rota curinga para páginas não encontradas
    redirectTo: '/clients' // Ou para uma página 404 dedicada
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
