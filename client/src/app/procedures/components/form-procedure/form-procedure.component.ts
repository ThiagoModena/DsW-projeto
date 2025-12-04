import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcedureService } from '../../services/procedure.service';
import { Procedure } from '../../models/procedure.model';

@Component({
  selector: 'app-form-procedure',
  templateUrl: './form-procedure.component.html',
  styleUrls: ['./form-procedure.component.css']
})
export class FormProcedureComponent implements OnInit {
  procedureForm: FormGroup;
  isSubmitting: boolean = false;
  submissionError: string | null = null;
  submissionSuccess: boolean = false;
  isEditMode: boolean = false;
  originalId?: number; // Para guardar o ID original no modo de edição

  constructor(
    private fb: FormBuilder,
    private procedureService: ProcedureService,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<FormProcedureComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public editData: Procedure
  ) {
    this.procedureForm = this.fb.group({
      // O ID não é um campo de formulário para criação,
      // e geralmente não é editável. Ele será usado apenas para o update.
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]] // Valida número com até 2 casas decimais
    });

    if (this.editData) {
      this.isEditMode = true;
      this.originalId = this.editData.id;
      // Se o formulário tivesse um campo 'id', seria this.procedureForm.get('id')?.disable();
      this.procedureForm.patchValue({
        name: this.editData.name,
        price: this.editData.price
      });
    }
  }

  ngOnInit(): void { }

  get name() { return this.procedureForm.get('name'); }
  get price() { return this.procedureForm.get('price'); }

  onSubmit(): void {
    if (this.procedureForm.invalid) {
      this.procedureForm.markAllAsTouched();
      this.submissionError = "Por favor, corrija os erros no formulário.";
      return;
    }

    this.isSubmitting = true;
    this.submissionError = null;
    this.submissionSuccess = false;

    const procedureDataFromForm = {
      name: this.procedureForm.value.name,
      price: parseFloat(this.procedureForm.value.price) // Garante que o preço seja número
    };

    if (this.isEditMode && this.originalId !== undefined) {
      // Para o PATCH, podemos enviar só o que mudou, ou o objeto completo.
      // O seu exemplo de body para PATCH é só o preço.
      // Se você sempre edita nome e preço no form, pode enviar ambos.
      // Se a API aceita só o preço para PATCH, você teria que ajustar `procedureDataFromForm`
      // ou ter um formulário de edição diferente. Por simplicidade, vamos enviar o que o form tem.
      this.procedureService.updateProcedure(this.originalId, procedureDataFromForm).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submissionSuccess = true;
          console.log('Procedimento atualizado com sucesso:', response);
          if (this.dialogRef) {
            this.dialogRef.close(true);
          } else {
            this.router.navigate(['/procedures']);
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submissionError = err.error?.message || err.error || err.message || 'Falha ao atualizar procedimento.';
          console.error('Erro ao atualizar procedimento:', err);
        }
      });
    } else {
      // Criação
      this.procedureService.addProcedure(procedureDataFromForm).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submissionSuccess = true;
          console.log('Procedimento cadastrado com sucesso:', response);
          this.procedureForm.reset();
          Object.keys(this.procedureForm.controls).forEach(key => {
            this.procedureForm.get(key)?.setErrors(null);
            this.procedureForm.get(key)?.markAsPristine();
            this.procedureForm.get(key)?.markAsUntouched();
          });
          this.procedureForm.updateValueAndValidity();
          if (this.dialogRef) {
            this.dialogRef.close(true); // Se aberto em diálogo para criar (incomum)
          } else {
            setTimeout(() => { this.router.navigate(['/procedures']); }, 2000);
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submissionError = err.error?.message || err.error || err.message || 'Falha ao cadastrar procedimento.';
          console.error('Erro ao cadastrar procedimento:', err);
        }
      });
    }
  }

  onCancel(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      this.router.navigate(['/procedures']);
    }
  }
}
