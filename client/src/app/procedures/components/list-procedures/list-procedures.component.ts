import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProcedureService } from '../../services/procedure.service';
import { Procedure } from '../../models/procedure.model';
import { FormProcedureComponent } from '../form-procedure/form-procedure.component';

@Component({
  selector: 'app-list-procedures',
  templateUrl: './list-procedures.component.html',
  styleUrls: ['./list-procedures.component.css']
})
export class ListProceduresComponent implements OnInit {
  procedures: Procedure[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];

  procedureIdBusca: string = ''; // Para o input de busca por ID
  exibindoResultadoBusca: boolean = false; // Flag para controlar o estado da UI

  constructor(
    private procedureService: ProcedureService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarProcedures();
  }

  carregarProcedures(): void {
    this.isLoading = true;
    this.error = null;
    // this.exibindoResultadoBusca = false;
    this.procedureService.getAllProcedures().subscribe({
      next: (data) => {
        this.procedures = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Falha ao carregar a lista de procedimentos.';
        this.isLoading = false;
      }
    });
  }

  buscarPorId(): void {
    if (!this.procedureIdBusca || isNaN(Number(this.procedureIdBusca))) {
      this.error = 'Por favor, digite um ID numérico válido para buscar.';
      this.procedures = []; // Limpa a lista se a busca for inválida
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.procedures = []; // Limpa a lista atual antes da busca
    this.exibindoResultadoBusca = true;
    const id = Number(this.procedureIdBusca);

    this.procedureService.getProcedureById(id).subscribe({
      next: (procedureEncontrado) => {
        this.procedures = [procedureEncontrado]; // Exibe apenas o procedimento encontrado
        this.isLoading = false;
      },
      error: (err) => {
        this.procedures = []; // Garante que a lista esteja vazia em caso de erro
        if (err.status === 404) {
          this.error = `Nenhum procedimento encontrado para o ID: ${id}`;
        } else {
          this.error = 'Falha ao buscar procedimento por ID.';
        }
        console.error('Erro ao buscar procedimento por ID:', err);
        this.isLoading = false;
      }
    });
  }

  limparBuscaECarregarTodos(): void {
    this.procedureIdBusca = ''; // Limpa o campo de input
    this.exibindoResultadoBusca = false;
    this.carregarProcedures(); // Recarrega todos os procedimentos
  }

  formatPrice(price: number): string {
    return `R$ ${price.toFixed(2).replace('.', ',')}`;
  }

  editarProcedure(procedure: Procedure): void {
    const dialogRef = this.dialog.open(FormProcedureComponent, {
      width: '500px', // Ajuste conforme necessário
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: true,
      data: { ...procedure }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.carregarProcedures();
      }
    });
  }

  handleDeleteProcedure(procedure: Procedure): void {
    const confirmation = window.confirm(`Tem certeza que deseja deletar o procedimento "${procedure.name}"?`);
    if (confirmation) {
      this.isLoading = true;
      this.procedureService.deleteProcedure(procedure.id).subscribe({
        next: () => {
          this.isLoading = false;
          this.carregarProcedures();
          // Adicionar feedback de sucesso
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Falha ao deletar procedimento.';
          // Adicionar feedback de erro
        }
      });
    }
  }
}
