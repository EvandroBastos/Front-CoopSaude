import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { Proponentes } from '../../../Models/proponentes';
import { ProponentesDetalhesComponent } from '../proponentes-detalhes/proponentes-detalhes.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ProponenteCadastrosComponent } from '../proponentes-cadastros/proponentes-cadastros.component';
import { ArquivoService } from '../../../services/arquivo.service';



declare var bootstrap: any;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule  // <-- Adicione Aqui
  ],
  templateUrl: './proponentes-home.component.html',
  styleUrls: ['./proponentes-home.component.css']
})

export class HomeComponent implements OnInit, AfterViewInit {
  proponentes: Proponentes[] = [];
  modalInstance: any;
  contatoSelecionado: Proponentes | null = null;
  tipoContatoSelecionado: 'telefone' | 'email' | '' = '';
  proponenteSelecionado: Proponentes | null = null;
  arquivosProponente: any[] = []; // Lista de arquivos do proponente

  constructor(private usuarioService: UsuarioService, private dialog: MatDialog, private arquivoService: ArquivoService) {}

  ngOnInit(): void {
    this.carregarProponentes();
  }

  ngAfterViewInit(): void {
    const modalElement = document.getElementById('modalVisualizarArquivos');
    if (modalElement) {
      this.modalInstance = new bootstrap.Modal(modalElement);
    }
  }


  carregarProponentes(): void {
    this.usuarioService.getProponentes().subscribe({
      next: (response) => {
        if (response && response.objetosRetorno) {
          this.proponentes = response.objetosRetorno;
        } else {
          this.proponentes = [];
        }
      },
      error: (error) => {
        console.error('Erro ao carregar proponentes:', error);
        alert('Erro ao carregar dados das proponentes.');
      }
    });
  }

  abrirModalCadastroProponentes(): void {
    const dialogRef = this.dialog.open(ProponenteCadastrosComponent, {
      width: '1200vw', // Defina a largura do modal como 90% da tela
      maxHeight: '90vh', // Defina a altura máxima como 90% da tela
      disableClose: true, // Impede fechar ao clicar fora
      panelClass: 'custom-modal', // Adiciona uma classe CSS personalizada
      data: {} // Pode enviar dados, se necessário
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.carregarProponentes(); // Atualiza a lista após o fechamento
      }
    });
  }

  detalhesProponente(proponente: Proponentes): void {
    this.dialog.open(ProponentesDetalhesComponent, {
      width: '600px',
      data: proponente
    });
  }

  mostrarContato(proponente: Proponentes, tipo: 'telefone' | 'email'): void {
    this.contatoSelecionado = proponente;
    this.tipoContatoSelecionado = tipo;
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  fecharModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
    this.contatoSelecionado = null;
    this.tipoContatoSelecionado = '';
  }

  selecionarTodos(event: any): void {
    const selecionado = event.target.checked;
    this.proponentes.forEach(proponente => (proponente.selecionado = selecionado));
  }

  editarProponente(proponente: Proponentes): void {
    console.log('Editando:', proponente);
    alert('Funcionalidade de edição em desenvolvimento.');
  }
  abrirModalVisualizar(proponente: Proponentes): void {
    this.proponenteSelecionado = proponente;
    this.listarArquivos(proponente.id!);
  }

  verArquivo(id: string): void {
    const url = `https://localhost:7124/api/Arquivo/visualizar/${id}`;
    window.open(url, '_blank'); // Abre em nova aba
  }



  downloadArquivo(id: string): void {
    this.arquivoService.downloadArquivo(id).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'documento.pdf'; // Nome do arquivo
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Erro ao baixar arquivo:', error);
        alert('Erro ao baixar arquivo.');
      }
    });
  }

  excluirArquivo(id: string): void {
    if (confirm('Tem certeza que deseja excluir este arquivo?')) {
      this.arquivoService.deletarArquivo(id).subscribe({
        next: () => {
          alert('Arquivo excluído com sucesso!');
          this.listarArquivos(this.proponenteSelecionado!.id!);
        },
        error: (error) => {
          console.error('Erro ao excluir arquivo:', error);
          alert('Erro ao excluir arquivo.');
        }
      });
    }
  }

  listarArquivos(proponenteId: string): void {
    this.arquivoService.listarArquivos(proponenteId).subscribe({
      next: (arquivos) => {
        console.log("Arquivos carregados:", arquivos);
        this.arquivosProponente = arquivos; // Atualiza a variável que armazena os arquivos no front
        this.modalInstance.show();
      },
      error: (error) => {
        console.error('Erro ao buscar arquivos:', error);
        alert('Erro ao buscar arquivos.');
      }
    });
  }


  abrirModalAdicionar(proponente: Proponentes): void {
    console.log(`Abrindo modal para adicionar documentos de: ${proponente.nome}`);
    alert('Funcionalidade de adicionar documentos em desenvolvimento.');
  }


  excluirProponente(proponente: Proponentes): void {
    if (confirm(`Deseja realmente excluir o proponente: ${proponente.nome}?`)) {
      this.usuarioService.excluirProponente(proponente.id!).subscribe({
        next: () => {
          alert('proponente excluído com sucesso!');
          this.carregarProponentes();
        },
        error: (error) => {
          console.error('Erro ao excluir proponente:', error);
          alert('Erro ao excluir proponente.');
        }
      });
    }
  }
}
