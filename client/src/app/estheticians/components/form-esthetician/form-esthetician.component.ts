import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EstheticianService } from '../../services/esthetician.service';
import { Esthetician } from '../../models/esthetician.model';

@Component({
  selector: 'app-form-esthetician',
  templateUrl: './form-esthetician.component.html',
  styleUrls: ['./form-esthetician.component.css']
})
export class FormEstheticianComponent implements OnInit {
  estheticianForm: FormGroup;
  isSubmitting: boolean = false;
  submissionError: string | null = null;
  submissionSuccess: boolean = false;
  isEditMode: boolean = false;
  originalCpf?: string;

  // Se 'specialty' tiver opções fixas, crie um array como fizemos para 'howFoundUsOptions'
  // specialtyOptions: any[] = [ {value: 'SKIN', label: 'Cuidados com a Pele'}, /* ... */ ];

  constructor(
    private fb: FormBuilder,
    private estheticianService: EstheticianService,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<FormEstheticianComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public editData: Esthetician
  ) {
    this.estheticianForm = this.fb.group({
      cpf: [{value: '', disabled: false}, [Validators.required, Validators.pattern(/^\d{11}$/)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      specialty: ['', Validators.required]
    });

    if (this.editData) {
      this.isEditMode = true;
      this.originalCpf = this.editData.cpf;
      this.estheticianForm.patchValue(this.editData);
      this.estheticianForm.get('cpf')?.disable();
    }
  }

  ngOnInit(): void { }

  get cpf() { return this.estheticianForm.get('cpf'); }
  get first_name() { return this.estheticianForm.get('first_name'); }
  get last_name() { return this.estheticianForm.get('last_name'); }
  get specialty() { return this.estheticianForm.get('specialty'); }

  onSubmit(): void {
    if (this.estheticianForm.invalid) {
      this.estheticianForm.markAllAsTouched();
      this.submissionError = "Por favor, corrija os erros no formulário.";
      return;
    }

    this.isSubmitting = true;
    this.submissionError = null;
    this.submissionSuccess = false;
    const formData = this.estheticianForm.getRawValue();
    const estheticianDataToSubmit: Esthetician = formData;

    if (this.isEditMode && this.originalCpf) {
      this.estheticianService.updateEsthetician(this.originalCpf, estheticianDataToSubmit).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submissionSuccess = true;
          console.log('Esteticista atualizado(a) com sucesso:', response);
          if (this.dialogRef) {
            this.dialogRef.close(true);
          } else {
            this.router.navigate(['/estheticians']);
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submissionError = err.error?.message || err.error || err.message || 'Falha ao atualizar esteticista.';
          console.error('Erro ao atualizar esteticista:', err);
        }
      });
    } else {
      this.estheticianService.addEsthetician(estheticianDataToSubmit).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submissionSuccess = true;
          console.log('Esteticista cadastrado(a) com sucesso:', response);
          this.estheticianForm.reset();
          Object.keys(this.estheticianForm.controls).forEach(key => {
            this.estheticianForm.get(key)?.setErrors(null);
            this.estheticianForm.get(key)?.markAsPristine();
            this.estheticianForm.get(key)?.markAsUntouched();
          });
          this.estheticianForm.updateValueAndValidity();
          if (this.dialogRef) {
            this.dialogRef.close(true);
          } else {
            setTimeout(() => { this.router.navigate(['/estheticians']); }, 2000);
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submissionError = err.error?.message || err.error || err.message || 'Falha ao cadastrar esteticista.';
          console.error('Erro ao cadastrar esteticista:', err);
        }
      });
    }
  }

  onCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.router.navigate(['/estheticians']);
    }
  }
}
