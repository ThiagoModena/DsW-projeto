// src/app/estheticians/estheticians-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EstheticiansAreaComponent } from './pages/estheticians-area/estheticians-area.component';
import { FormEstheticianComponent } from './components/form-esthetician/form-esthetician.component'; // Para rota de novo

const routes: Routes = [
  {
    path: '',
    component: EstheticiansAreaComponent
  },
  {
    path: 'new', // Rota para o formulário de novo esteticista
    component: FormEstheticianComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstheticiansRoutingModule { }
