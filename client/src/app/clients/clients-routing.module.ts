import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientsAreaComponent } from './pages/clients-area/clients-area.component';


const routes: Routes = [
  {
    path: '',
    component: ClientsAreaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
