import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EstheticianService } from '../../services/esthetician.service';
import { Esthetician } from '../../models/esthetician.model';
import { FormEstheticianComponent } from '../form-esthetician/form-esthetician.component'; // Para o modal

@Component({
  selector: 'app-list-estheticians',
  templateUrl: './list-estheticians.component.html',
  styleUrls: ['./list-estheticians.component.css']
})
export class ListEstheticiansComponent implements OnInit {
  estheticians: Esthetician[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  displayedColumns: string[] = ['cpf', 'nomeCompleto', 'specialty', 'actions'];
  // Se 'specialty' tiver um mapeamento para display text, adicione aqui

  cpfBusca: string = '';
  exibindoResultadoBusca: boolean = false;

  constructor(
    private estheticianService: EstheticianService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.carregarEstheticians();
  }

  carregarEstheticians(): void {
    this.isLoading = true;
    this.error = null;
    this.exibindoResultadoBusca = false;
    this.estheticianService.getAllEstheticians().subscribe({
      next: (data) => {
        this.estheticians = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Falha ao carregar a lista de esteticistas.';
        this.isLoading = false;
      }
    });
  }

  buscarPorCpf(): void {
    if (!this.cpfBusca || this.cpfBusca.trim() === '') {
      this.error = 'Por favor, digite um CPF para buscar.';
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.estheticians = [];
    this.exibindoResultadoBusca = true;
    this.estheticianService.getEstheticianByCpf(this.cpfBusca.trim()).subscribe({
      next: (data) => {
        this.estheticians = [data];
        this.isLoading = false;
      },
      error: (err) => {
        this.estheticians = [];
        if (err.status === 404) {
          this.error = `Nenhum(a) esteticista encontrado(a) para o CPF: ${this.cpfBusca.trim()}`;
        } else {
          this.error = 'Falha ao buscar esteticista por CPF.';
        }
        this.isLoading = false;
      }
    });
  }

  limparBuscaECarregarTodos(): void {
    this.cpfBusca = '';
    this.exibindoResultadoBusca = false;
    this.carregarEstheticians();
  }

  getNomeCompleto(esthetician: Esthetician): string {
    return `${esthetician.first_name} ${esthetician.last_name}`;
  }

  editarEsthetician(esthetician: Esthetician): void {
    const dialogRef = this.dialog.open(FormEstheticianComponent, {
      width: '600px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: true,
      data: { ...esthetician }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.carregarEstheticians();
      }
    });
  }

  handleDeleteEsthetician(esthetician: Esthetician): void {
    const confirmation = window.confirm(`Tem certeza que deseja deletar o(a) esteticista ${this.getNomeCompleto(esthetician)} (CPF: ${esthetician.cpf})?`);
    if (confirmation) {
      this.isLoading = true;
      this.estheticianService.deleteEsthetician(esthetician.cpf).subscribe({
        next: () => {
          this.isLoading = false;
          this.carregarEstheticians();
          // Adicionar feedback de sucesso (ex: MatSnackBar)
        },
        error: (err) => {
          this.isLoading = false;
          this.error = 'Falha ao deletar esteticista.';
          // Adicionar feedback de erro
        }
      });
    }
  }
}
