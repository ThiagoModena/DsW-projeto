import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)] se usar na busca da lista

import { ProceduresRoutingModule } from './procedures-routing.module';
import { ProceduresAreaComponent } from './pages/procedures-area/procedures-area.component';
import { ListProceduresComponent } from './components/list-procedures/list-procedures.component';
import { FormProcedureComponent } from './components/form-procedure/form-procedure.component';

// Imports do Angular Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
// MatSelectModule se usar para algum campo no futuro

@NgModule({
  declarations: [
    ProceduresAreaComponent,
    ListProceduresComponent,
    FormProcedureComponent
  ],
  imports: [
    CommonModule,
    ProceduresRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    // Material
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class ProceduresModule { }
