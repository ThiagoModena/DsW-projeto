// src/app/sessions/sessions.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { SessionsRoutingModule } from './sessions-routing.module';
import { SessionsAreaComponent } from './pages/sessions-area/sessions-area.component';
import { ListSessionsComponent } from './components/list-sessions/list-sessions.component';
import { FormSessionComponent } from './components/form-session/form-session.component';

// Material
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select'; // Para o select de appointment_id
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    SessionsAreaComponent,
    ListSessionsComponent,
    FormSessionComponent
  ],
  imports: [
    CommonModule,
    SessionsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
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
  ],
  providers: [
    MatDatepickerModule,
  ]
})
export class SessionsModule { }
