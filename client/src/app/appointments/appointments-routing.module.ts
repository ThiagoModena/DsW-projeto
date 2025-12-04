import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentsAreaComponent } from './pages/appointments-area/appointments-area.component';


const routes: Routes = [
  {
    path: '',
    component: AppointmentsAreaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentsRoutingModule { }
