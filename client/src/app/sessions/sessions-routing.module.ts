// src/app/sessions/sessions-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SessionsAreaComponent } from './pages/sessions-area/sessions-area.component';

const routes: Routes = [
  { path: '', component: SessionsAreaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionsRoutingModule { }
