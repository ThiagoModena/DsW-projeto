import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProceduresAreaComponent } from './pages/procedures-area/procedures-area.component';


const routes: Routes = [
  {
    path: '',
    component: ProceduresAreaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProceduresRoutingModule { }
