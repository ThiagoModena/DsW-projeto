// src/app/sessions/components/list-sessions/list-sessions.component.ts
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from '../../services/session.service';
import { Session } from '../../models/session.model';
import { FormSessionComponent } from '../form-session/form-session.component';
// Para formatar data
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-list-sessions',
  templateUrl: './list-sessions.component.html',
  styleUrls: ['./list-sessions.component.css'],
  providers: [DatePipe] // Adicionar DatePipe aos providers do componente
})
export class ListSessionsComponent implements OnInit {
  sessions: Session[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  displayedColumns: string[] = ['id', 'clientName', 'estheticianName', 'sessionDate', 'procedures', 'actions'];
  // displayedColumns: string[] = ['id', 'nome do cliente', 'nome do esteticista', 'date', 'procedimentos'];

  sessionIdBusca: string = '';
  exibindoResultadoBusca: boolean = false;

  constructor(
    private sessionService: SessionService,
    private dialog: MatDialog,
    private datePipe: DatePipe // Injetar DatePipe
  ) { }

  ngOnInit(): void {
    this.carregarSessions();
  }

  carregarSessions(): void {
    this.isLoading = true;
    this.error = null;
    this.exibindoResultadoBusca = false;
    this.sessionService.getAllSessions().subscribe({
      next: (data) => {
        this.sessions = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Falha ao carregar sessões.';
        this.isLoading = false;
      }
    });
  }

  buscarPorId(): void {
    if (!this.sessionIdBusca || isNaN(Number(this.sessionIdBusca))) {
      this.error = 'Por favor, digite um ID numérico válido.';
      this.sessions = [];
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.sessions = [];
    this.exibindoResultadoBusca = true;
    const id = Number(this.sessionIdBusca);

    this.sessionService.getSessionById(id).subscribe({
      next: (data) => {
        this.sessions = [data];
        this.isLoading = false;
      },
      error: (err) => {
        this.sessions = [];
        if (err.status === 404) { this.error = `Nenhuma sessão encontrada para o ID: ${id}`; }
        else { this.error = 'Falha ao buscar sessão por ID.'; }
        this.isLoading = false;
      }
    });
  }

  limparBuscaECarregarTodos(): void {
    this.sessionIdBusca = '';
    this.exibindoResultadoBusca = false;
    this.carregarSessions();
  }

  formatSessionDateTime(dateTimeString: string): string {
    if (!dateTimeString) return 'N/A';
    // Usando DatePipe para formatar
    return this.datePipe.transform(dateTimeString.replace(' ', 'T'), 'dd/MM/yyyy HH:mm') || dateTimeString;
  }

  getClientName(session: Session): string {
    if (session && session.appointment && session.appointment.client) {
      return `${session.appointment.client.first_name} ${session.appointment.client.last_name}`;
    }
    return 'N/A'; // Ou uma string vazia, ou o CPF se preferir
  }

  getEstheticianName(session: Session): string {
    if (session && session.appointment && session.appointment.esthetician) {
      return `${session.appointment.esthetician.first_name} ${session.appointment.esthetician.last_name}`;
    }
    return 'N/A'; // Ou uma string vazia, ou o CPF
  }

  getProcedureNames(session: Session): string {
    if (session && session.procedures && session.procedures.length > 0) {
      return session.procedures.map(p => p.name).join(', '); // Junta os nomes com vírgula
    }
    return 'Nenhum'; // Ou uma string vazia
  }

  editarSession(session: Session): void {
    const dialogRef = this.dialog.open(FormSessionComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: true,
      data: { ...session }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.carregarSessions();
      }
    });
  }

  handleDeleteSession(session: Session): void {
    const confirmation = window.confirm(`Tem certeza que deseja deletar a sessão ID ${session.id}?`);
    if (confirmation) {
      this.isLoading = true;
      this.sessionService.deleteSession(session.id).subscribe({
        next: () => {
          this.isLoading = false;
          this.carregarSessions();
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Falha ao deletar sessão.';
        }
      });
    }
  }
}
