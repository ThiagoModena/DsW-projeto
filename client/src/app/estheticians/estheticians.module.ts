// src/app/estheticians/estheticians.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)] na busca da lista

import { EstheticiansRoutingModule } from './estheticians-routing.module';
import { EstheticiansAreaComponent } from './pages/estheticians-area/estheticians-area.component';
import { ListEstheticiansComponent } from './components/list-estheticians/list-estheticians.component';
import { FormEstheticianComponent } from './components/form-esthetician/form-esthetician.component';

// Imports do Angular Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
// Adicione MatSelectModule se 'specialty' for um select
// import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    EstheticiansAreaComponent,
    ListEstheticiansComponent,
    FormEstheticianComponent
  ],
  imports: [
    CommonModule,
    EstheticiansRoutingModule,
    ReactiveFormsModule,
    FormsModule, // Para [(ngModel)]
    // Material
    MatTabsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    // MatSelectModule
  ]
})
export class EstheticiansModule { }
