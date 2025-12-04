// src/app/appointments/components/list-appointments/list-appointments.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AppointmentService } from '../../services/appointment.service';
import { Appointment } from '../../models/appointment.model';
import { FormAppointmentComponent } from '../form-appointment/form-appointment.component';

@Component({
  selector: 'app-list-appointments',
  templateUrl: './list-appointments.component.html',
  styleUrls: ['./list-appointments.component.css']
})
export class ListAppointmentsComponent implements OnInit {
  appointments: Appointment[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  displayedColumns: string[] = ['id', 'date', 'client_cpf', 'esthetician_cpf', 'status', 'actions'];

  appointmentIdBusca: string = ''; // Para busca por ID
  exibindoResultadoBusca: boolean = false;

  appointmentStatuses: string[] = ['SCHEDULED', 'COMPLETED', 'CANCELLED', 'NOT_SHOWN']; // Exemplo de status

  constructor(
    private appointmentService: AppointmentService,
    private dialog: MatDialog,
    // private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.carregarAppointments();
  }

  carregarAppointments(): void {
    this.isLoading = true;
    this.error = null;
    this.exibindoResultadoBusca = false;
    // this.appointmentIdBusca = ''; // Opcional: limpar busca
    this.appointmentService.getAllAppointments().subscribe({
      next: (data) => {
        this.appointments = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Falha ao carregar agendamentos.';
        this.isLoading = false;
      }
    });
  }

  buscarPorId(): void {
    if (!this.appointmentIdBusca || isNaN(Number(this.appointmentIdBusca))) {
      this.error = 'Por favor, digite um ID numérico válido para buscar.';
      this.appointments = []; // Limpa a lista se a busca for inválida
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.appointments = [];
    this.exibindoResultadoBusca = true;
    const id = Number(this.appointmentIdBusca);

    this.appointmentService.getAppointmentById(id).subscribe({
      next: (data) => {
        this.appointments = [data]; // Mostra apenas o encontrado
        this.isLoading = false;
      },
      error: (err) => {
        this.appointments = [];
        if (err.status === 404) {
          this.error = `Nenhum agendamento encontrado para o ID: ${id}`;
        } else {
          this.error = 'Falha ao buscar agendamento por ID.';
        }
        this.isLoading = false;
      }
    });
  }

  limparBuscaECarregarTodos(): void {
    this.appointmentIdBusca = '';
    this.exibindoResultadoBusca = false;
    this.carregarAppointments();
  }

  formatDateTime(dateTimeString: string): string {
    if (!dateTimeString) return 'N/A';
    try {
      const date = new Date(dateTimeString.replace(' ', 'T'));
      return date.toLocaleString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    } catch (e) { return dateTimeString; }
  }

  editarAppointment(appointment: Appointment): void { // Edita apenas a data
    const dialogRef = this.dialog.open(FormAppointmentComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: true,
      data: { ...appointment }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.carregarAppointments();
      }
    });
  }

  updateStatus(appointment: Appointment, newStatus: string): void {
    if (!appointment.id || !newStatus) return;
    this.isLoading = true;
    this.appointmentService.updateAppointmentStatus(appointment.id, newStatus).subscribe({
        next: () => { // Assumindo que a API de update de status pode não retornar o objeto completo
            this.isLoading = false;
            // this.openSnackBar(`Status atualizado para ${newStatus}!`, 'Fechar');
            this.carregarAppointments();
        },
        error: (err) => {
            this.isLoading = false;
            this.error = `Falha ao atualizar status do agendamento ${appointment.id}.`;
            console.error(err);
        }
    });
}

  handleDeleteAppointment(appointment: Appointment): void {
    const confirmation = window.confirm(`Tem certeza que deseja deletar o agendamento ID ${appointment.id} do dia ${this.formatDateTime(appointment.date)}?`);
    if (confirmation) {
      this.isLoading = true;
      this.appointmentService.deleteAppointment(appointment.id).subscribe({
        next: () => {
          this.isLoading = false;
          // this.openSnackBar('Agendamento deletado com sucesso!', 'Fechar');
          this.carregarAppointments();
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Falha ao deletar agendamento.';
          console.error(err);
        }
      });
    }
  }
}
