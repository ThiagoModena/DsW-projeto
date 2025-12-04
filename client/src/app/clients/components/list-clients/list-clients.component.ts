// src/app/clients/components/list-clients/list-clients.component.ts
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../service/client.service';
import { Client } from '../../models/client.model';
import { FormClientComponent } from '../form-client/form-client.component';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  clientes: Client[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  displayedColumns: string[] = ['cpf', 'nomeCompleto', 'cep', 'email', 'phone', 'number', 'how_found_us', 'actions'];

  // Mapeamento para how_found_us
  howFoundUsMap: { [key: string]: string } = {
    'INSTAGRAM_AD': 'Anúncio no Instagram',
    'YOUTUBE_AD': 'Anúncio no YouTube',
    'GOOGLE_AD': 'Anúncio no Google',
    'FACEBOOK_AD': 'Anúncio no Facebook',
    'TWITTER_AD': 'Anúncio no Twitter',
    'WHATSAPP_REFERRAL': 'Indicação (WhatsApp)',
    'PROMOTER': 'Promoter/Evento',
    'RECOMMENDATION': 'Indicação (Amigo/Família)'
  };

  cpfBusca: string = ''; // Para o input de busca por CPF
  exibindoResultadoBusca: boolean = false; // Flag para controlar o estado da UI

  constructor(
    private clientService: ClientService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadClients(); // Carrega todos os clientes inicialmente
  }

  loadClients(): void {
    this.isLoading = true;
    this.error = null;
    this.exibindoResultadoBusca = false; // Reseta a flag de busca
    // this.cpfBusca = ''; // Opcional: limpar o campo de busca ao carregar todos
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clientes = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Falha ao carregar a lista de clientes.';
        console.error('Erro ao buscar todos os clientes:', err);
        this.isLoading = false;
      }
    });
  }

  findByCPF(): void {
    if (!this.cpfBusca || this.cpfBusca.trim() === '') {
      this.error = 'Por favor, digite um CPF para buscar.';
      return;
    }
    this.isLoading = true;
    this.error = null;
    this.clientes = []; // Limpa a lista atual antes da busca
    this.exibindoResultadoBusca = true;

    this.clientService.getClienteByCpf(this.cpfBusca.trim()).subscribe({
      next: (clienteEncontrado) => {
        this.clientes = [clienteEncontrado]; // Exibe apenas o cliente encontrado
        this.isLoading = false;
      },
      error: (err) => {
        if (err.status === 404) {
          this.error = `Nenhum cliente encontrado para o CPF: ${this.cpfBusca.trim()}`;
        } else {
          this.error = 'Falha ao buscar cliente por CPF.';
        }
        console.error('Erro ao buscar cliente por CPF:', err);
        this.clientes = []; // Garante que a lista esteja vazia em caso de erro
        this.isLoading = false;
      }
    });
  }

  cleanSearchAndLoadAll(): void {
    this.cpfBusca = ''; // Limpa o campo de input
    this.exibindoResultadoBusca = false;
    this.loadClients(); // Recarrega todos os clientes
  }

  getFullName(cliente: Client): string {
    return `${cliente.first_name} ${cliente.last_name}`;
  }

  editClient(cliente: Client): void {
    console.log('Abrindo modal para editar cliente:', cliente);

    const dialogRef = this.dialog.open(FormClientComponent, {
      width: '650px', // Ajuste a largura conforme necessário
      maxWidth: '90vw', // Garante que não ultrapasse a largura da tela em dispositivos menores
      maxHeight: '90vh', // Para permitir rolagem se o conteúdo for muito alto
      disableClose: true, // Opcional: impede fechar clicando fora ou com ESC
      data: { ...cliente } // Passa uma CÓPIA dos dados do cliente para o modal
                           // O {...cliente} cria uma cópia superficial. Se precisar de cópia profunda, use outras técnicas.
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo de edição fechado. Resultado:', result);
      if (result === true) { // 'true' indica que a atualização foi bem-sucedida no FormClientComponent
        this.loadClients(); // Recarrega a lista para mostrar os dados atualizados
        // this.openSnackBar('Cliente atualizado com sucesso!', 'Fechar'); // Opcional
      }
    });
  }

  deleteClient(cliente: Client): void {
    console.log('Deletar cliente:', cliente);
    alert('Funcionalidade de deletar ainda não implementada.');
  }

  getHowFoundUsDisplayText(key: string): string {
    return this.howFoundUsMap[key] || key; // Retorna o valor mapeado ou a própria chave se não encontrar
  }

  handleDeleteClient(cliente: Client): void {
    // Confirmação simples do navegador
    const confirmation = window.confirm(`Tem certeza que deseja deletar o cliente ${this.getFullName(cliente)} (CPF: ${cliente.cpf})?`);

    if (confirmation) {
      this.isLoading = true; // Pode ser útil ter um loading específico para a ação
      this.clientService.deleteClient(cliente.cpf).subscribe({
        next: (response) => {
          this.isLoading = false;
          console.log('Cliente deletado com sucesso:', response);
          // alert('Cliente deletado com sucesso!'); // Feedback simples
          // this.openSnackBar('Cliente deletado com sucesso!', 'Fechar');
          this.loadClients(); // Recarrega a lista para refletir a deleção
        },
        error: (err) => {
          this.isLoading = false;
          console.error('Erro ao deletar cliente:', err);
          const errorMessage = err.error || 'Falha ao deletar cliente. Tente novamente.';
          alert(`Erro: ${errorMessage}`);
          // this.openSnackBar(`Erro: ${errorMessage}`, 'Fechar');
        }
      });
    }
  }
}
