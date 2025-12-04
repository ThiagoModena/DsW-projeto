// src/app/sessions/components/form-session/form-session.component.ts
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SessionService, SessionPayload } from '../../services/session.service';
import { Session } from '../../models/session.model';
import { AppointmentService } from '../../../appointments/services/appointment.service'; // Para buscar agendamentos
import { Appointment } from '../../../appointments/models/appointment.model'; // Modelo de agendamento
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-form-session',
  templateUrl: './form-session.component.html',
  styleUrls: ['./form-session.component.css']
})
export class FormSessionComponent implements OnInit {
  sessionForm: FormGroup;
  isSubmitting: boolean = false;
  submissionError: string | null = null;
  submissionSuccess: boolean = false;
  isEditMode: boolean = false;
  originalId?: number;

  appointments: Appointment[] = []; // Para popular o select de agendamentos

  constructor(
    private fb: FormBuilder,
    private sessionService: SessionService,
    private appointmentService: AppointmentService, // Injetar serviço de agendamento
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<FormSessionComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public editData: Session
  ) {
    this.sessionForm = this.fb.group({
      appointment_id: [null, Validators.required],
      date: [null, Validators.required], // Para o MatDatePicker
      time: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]] // Formato HH:MM
    });

    if (this.editData) {
      this.isEditMode = true;
      this.originalId = this.editData.id;
      const dateTimeParts = this.editData.date.split(' ');
      const datePart = dateTimeParts[0];
      const timePart = dateTimeParts[1] ? dateTimeParts[1].substring(0, 5) : '';

      this.sessionForm.patchValue({
        appointment_id: this.editData.appointment ? this.editData.appointment.id : null, 
        date: datePart ? new Date(datePart + 'T00:00:00') : null,
        time: timePart
      });
    }
  }

  ngOnInit(): void {
    this.loadAppointments();
  }

  loadAppointments(): void {
    this.appointmentService.getAllAppointments().subscribe(
      data => this.appointments = data,
      error => console.error('Erro ao carregar agendamentos para o formulário de sessão:', error)
    );
  }

  get appointment_id() { return this.sessionForm.get('appointment_id'); }
  get date() { return this.sessionForm.get('date'); }
  get time() { return this.sessionForm.get('time'); }

  onSubmit(): void {
    if (this.sessionForm.invalid) {
      this.sessionForm.markAllAsTouched();
      this.submissionError = "Por favor, corrija os erros no formulário.";
      return;
    }

    this.isSubmitting = true;
    this.submissionError = null;
    this.submissionSuccess = false;

    const formValues = this.sessionForm.value;
    const selectedDate = formatDate(formValues.date, 'yyyy-MM-dd', 'en-US');
    const fullDateTime = `${selectedDate} ${formValues.time}:00`;

    const sessionPayload: SessionPayload = {
      appointment_id: Number(formValues.appointment_id),
      date: fullDateTime
    };

    if (this.isEditMode && this.originalId !== undefined) {
      this.sessionService.updateSession(this.originalId, sessionPayload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submissionSuccess = true;
          console.log('Sessão atualizada com sucesso:', response);
          if (this.dialogRef) {
            this.dialogRef.close(true);
          } else {
            this.router.navigate(['/sessions']);
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submissionError = err.error?.message || err.error || err.message || 'Falha ao atualizar sessão.';
          console.error('Erro ao atualizar sessão:', err);
        }
      });
    } else {
      // Criação
      this.sessionService.addSession(sessionPayload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submissionSuccess = true;
          console.log('Sessão cadastrada com sucesso:', response);
          this.sessionForm.reset();
          Object.keys(this.sessionForm.controls).forEach(key => {
            this.sessionForm.get(key)?.setErrors(null);
            this.sessionForm.get(key)?.markAsPristine();
            this.sessionForm.get(key)?.markAsUntouched();
          });
          this.sessionForm.updateValueAndValidity();
          if (this.dialogRef) {
            this.dialogRef.close(true);
          } else {
            setTimeout(() => { this.router.navigate(['/sessions']); }, 2000);
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submissionError = err.error?.message || err.error || err.message || 'Falha ao cadastrar sessão.';
          console.error('Erro ao cadastrar sessão:', err);
        }
      });
    }
  }

  onCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.router.navigate(['/sessions']);
    }
  }
}
