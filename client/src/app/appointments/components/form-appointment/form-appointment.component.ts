// src/app/appointments/components/form-appointment/form-appointment.component.ts
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentService, AppointmentPayload } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-form-appointment',
  templateUrl: './form-appointment.component.html',
  styleUrls: ['./form-appointment.component.css']
})
export class FormAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  isSubmitting: boolean = false;
  submissionError: string | null = null;
  submissionSuccess: boolean = false;
  isEditMode: boolean = false;
  originalId?: number;

  constructor(
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<FormAppointmentComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public editData: Appointment
  ) {
    this.appointmentForm = this.fb.group({
      date: [null, Validators.required], // Para o MatDatePicker
      time: ['', [Validators.required, Validators.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)]], // Formato HH:MM
      client_cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      esthetician_cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]]
    });

    if (this.editData) {
      this.isEditMode = true;
      this.originalId = this.editData.id;
      const dateTimeParts = this.editData.date.split(' ');
      const datePart = dateTimeParts[0];
      const timePart = dateTimeParts[1] ? dateTimeParts[1].substring(0, 5) : '';

      this.appointmentForm.patchValue({
        date: datePart ? new Date(datePart + 'T00:00:00') : null,
        time: timePart,
        client_cpf: this.editData.client_cpf,
        esthetician_cpf: this.editData.esthetician_cpf
      });
      // No modo de edição, cliente e esteticista não são alteráveis via este form,
      // pois não há endpoint para isso. Apenas a data.
      this.appointmentForm.get('client_cpf')?.disable();
      this.appointmentForm.get('esthetician_cpf')?.disable();
    }
  }

  ngOnInit(): void { }

  get date() { return this.appointmentForm.get('date'); }
  get time() { return this.appointmentForm.get('time'); }
  get client_cpf() { return this.appointmentForm.get('client_cpf'); }
  get esthetician_cpf() { return this.appointmentForm.get('esthetician_cpf'); }

  onSubmit(): void {
    if (this.appointmentForm.invalid) {
      this.appointmentForm.markAllAsTouched();
      this.submissionError = "Por favor, corrija os erros no formulário.";
      return;
    }

    this.isSubmitting = true;
    this.submissionError = null;
    this.submissionSuccess = false;

    const formValues = this.appointmentForm.getRawValue(); // Usar getRawValue para pegar campos desabilitados
    const selectedDate = formatDate(formValues.date, 'yyyy-MM-dd', 'en-US');
    const fullDateTime = `${selectedDate} ${formValues.time}:00`;

    if (this.isEditMode && this.originalId !== undefined) {
      // Apenas a data é atualizável através deste formulário
      this.appointmentService.updateAppointmentDate(this.originalId, fullDateTime).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submissionSuccess = true;
          console.log('Data do agendamento atualizada:', response);
          if (this.dialogRef) {
            this.dialogRef.close(true);
          } else {
            this.router.navigate(['/appointments']);
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submissionError = err.error?.message || err.error || err.message || 'Falha ao atualizar data.';
          console.error('Erro ao atualizar data:', err);
        }
      });
    } else {
      // Criação
      const appointmentPayload: AppointmentPayload = {
        date: fullDateTime,
        client_cpf: formValues.client_cpf,
        esthetician_cpf: formValues.esthetician_cpf
      };
      this.appointmentService.addAppointment(appointmentPayload).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submissionSuccess = true;
          console.log('Agendamento cadastrado:', response);
          this.appointmentForm.reset();
          Object.keys(this.appointmentForm.controls).forEach(key => {
            this.appointmentForm.get(key)?.setErrors(null);
            this.appointmentForm.get(key)?.markAsPristine();
            this.appointmentForm.get(key)?.markAsUntouched();
          });
          this.appointmentForm.updateValueAndValidity();
          if (this.dialogRef) {
            this.dialogRef.close(true);
          } else {
            setTimeout(() => { this.router.navigate(['/appointments']); }, 2000);
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submissionError = err.error?.message || err.error || err.message || 'Falha ao cadastrar.';
          console.error('Erro ao cadastrar:', err);
        }
      });
    }
  }

  onCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.router.navigate(['/appointments']);
    }
  }
}
