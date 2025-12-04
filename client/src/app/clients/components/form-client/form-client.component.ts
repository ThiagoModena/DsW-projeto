// src/app/clients/components/form-client/form-client.component.ts
import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../service/client.service';
import { Client } from '../../models/client.model';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

interface HowFoundUsOption {
  value: string; // O valor que será salvo (ex: 'INSTAGRAM_AD')
  label: string; // O texto que o usuário verá (ex: 'Anúncio no Instagram')
}

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.css']
})
export class FormClientComponent implements OnInit {
  clientForm: FormGroup;
  isSubmitting: boolean = false;
  submissionError: string | null = null;
  submissionSuccess: boolean = false;

  isEditMode: boolean = false;
  originalCpf?: string; // Para guardar o CPF original no modo de edição

  howFoundUsOptions: HowFoundUsOption[] = [
    { value: 'INSTAGRAM_AD', label: 'Anúncio no Instagram' },
    { value: 'YOUTUBE_AD', label: 'Anúncio no YouTube' },
    { value: 'GOOGLE_AD', label: 'Anúncio no Google' },
    { value: 'FACEBOOK_AD', label: 'Anúncio no Facebook' },
    { value: 'TWITTER_AD', label: 'Anúncio no Twitter' },
    { value: 'WHATSAPP_REFERRAL', label: 'Indicação (WhatsApp)' },
    { value: 'PROMOTER', label: 'Promoter/Evento' },
    { value: 'RECOMMENDATION', label: 'Indicação (Amigo/Família)' }
  ];

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    @Optional() public dialogRef: MatDialogRef<FormClientComponent>, // Opcional para que possa ser usado fora de um diálogo também
    @Optional() @Inject(MAT_DIALOG_DATA) public editData: Client
  ) {
    this.clientForm = this.fb.group({
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      cep: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
      number: ['', Validators.required],
      how_found_us: ['', Validators.required]
    });

    if (this.editData) {
      this.isEditMode = true;
      this.originalCpf = this.editData.cpf;
      this.clientForm.patchValue(this.editData);
      this.clientForm.get('cpf')?.disable(); // Desabilitar edição do CPF
    }
  }

  ngOnInit(): void {
  }

  // Métodos getter para fácil acesso aos form controls no template (para validação)
  get cpf() { return this.clientForm.get('cpf'); }
  get first_name() { return this.clientForm.get('first_name'); }
  get last_name() { return this.clientForm.get('last_name'); }
  get email() { return this.clientForm.get('email'); }
  get phone() { return this.clientForm.get('phone'); }
  get cep() { return this.clientForm.get('cep'); }
  get number() { return this.clientForm.get('number'); }
  get how_found_us() { return this.clientForm.get('how_found_us'); }

  onSubmit(): void {
    if (this.clientForm.invalid) {
      this.clientForm.markAllAsTouched();
      this.submissionError = "Por favor, corrija os erros no formulário.";
      return;
    }

    this.isSubmitting = true;
    this.submissionError = null;
    this.submissionSuccess = false;

    // Habilitar CPF temporariamente para pegar o valor se estiver desabilitado
    const formData = this.clientForm.getRawValue(); // Pega todos os valores, incluindo os desabilitados
    const clientDataToSubmit: Client = formData;

    if (this.isEditMode && this.originalCpf) {
      // Lógica de Atualização
      this.clientService.updateClient(this.originalCpf, clientDataToSubmit).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submissionSuccess = true;
          console.log('Cliente atualizado com sucesso:', response);
          if (this.dialogRef) {
            this.dialogRef.close(true); // Fecha o diálogo e retorna 'true' para indicar sucesso
          } else {
            // Lógica se não estiver em um diálogo (ex: redirecionar)
            this.router.navigate(['/clients']);
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submissionError = err.error?.message || err.error || err.message || 'Falha ao atualizar cliente.';
          console.error('Erro ao atualizar cliente:', err);
        }
      });
    } else {
      // Lógica de Criação (como antes)
      this.clientService.addClient(clientDataToSubmit).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.submissionSuccess = true;
          console.log('Cliente cadastrado com sucesso:', response);
          this.clientForm.reset();
          Object.keys(this.clientForm.controls).forEach(key => {
            this.clientForm.get(key)?.setErrors(null);
            this.clientForm.get(key)?.markAsPristine();
            this.clientForm.get(key)?.markAsUntouched();
          });
          this.clientForm.updateValueAndValidity();

          if (this.dialogRef) { // Se estiver em um diálogo (improvável para 'novo' a menos que você queira)
            this.dialogRef.close(true);
          } else {
            setTimeout(() => { this.router.navigate(['/clients']); }, 2000);
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          this.submissionError = err.error?.message || err.error || err.message || 'Falha ao cadastrar cliente.';
          console.error('Erro ao cadastrar cliente:', err);
        }
      });
    }
  }

  onCancel(): void { // Método para fechar o diálogo se estiver em um
    if (this.dialogRef) {
      this.dialogRef.close();
    } else {
      // Se não estiver em um diálogo, talvez voltar para a lista
      this.router.navigate(['/clients']);
    }
  }
}
