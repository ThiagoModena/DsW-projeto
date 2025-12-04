// src/app/appointments/appointments.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms'; // Para [(ngModel)] na busca da lista

import { AppointmentsRoutingModule } from './appointments-routing.module';
import { AppointmentsAreaComponent } from './pages/appointments-area/appointments-area.component';
import { ListAppointmentsComponent } from './components/list-appointments/list-appointments.component';
import { FormAppointmentComponent } from './components/form-appointment/form-appointment.component';

// Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // Necessário para MatDatepicker


@NgModule({
  declarations: [
    AppointmentsAreaComponent,
    ListAppointmentsComponent,
    FormAppointmentComponent
  ],
  imports: [
    CommonModule,
    AppointmentsRoutingModule,
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
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
    // MatSnackBarModule
  ],
  providers: [
    MatDatepickerModule, // Alguns guias recomendam prover aqui também
  ]
})
export class AppointmentsModule { }
