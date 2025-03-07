import { Component, OnInit } from '@angular/core';
import { ArquivoService } from '../../services/arquivo.service';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Anexo } from '../../Models/proponentes';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-anexos',
  standalone: true,
  templateUrl: './anexos.component.html',
  styleUrls: ['./anexos.component.css'],
  imports: [CommonModule] // Importa CommonModule para usar *ngIf e *ngFor
})
export class AnexosComponent implements OnInit {
  selectedFile: File | null = null;
  fileList: string[] = []; // Agora armazenará os nomes dos arquivos corretamente
  isUploading: boolean = false;
  uploadProgress: number = 0;
  pessoaId!: string;

  constructor(
    private route: ActivatedRoute,
    private arquivoService: ArquivoService
  ) {}

  ngOnInit(): void {
    this.pessoaId = this.route.snapshot.paramMap.get('id') || '';
    this.carregarArquivos();
  }

  /**
   * Método chamado quando um arquivo é selecionado
   */
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  /**
   * Método para fazer upload de um arquivo
   */
  uploadArquivo() {
    if (this.selectedFile) {
      this.isUploading = true;
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.arquivoService.uploadArquivo(formData, this.pessoaId).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round((100 * event.loaded) / (event.total ?? 1));
          } else if (event.type === HttpEventType.Response) {
            alert('Upload realizado com sucesso!');
            this.carregarArquivos();
            this.isUploading = false;
            this.selectedFile = null;
          }
        },
        error: (error: HttpErrorResponse) => {
          alert(`Erro ao fazer upload: ${error.message}`);
          this.isUploading = false;
        }
      });
    } else {
      alert('Selecione um arquivo primeiro!');
    }
  }

  /**
   * Método para carregar a lista de arquivos
   */
  carregarArquivos() {
    this.arquivoService.listarArquivos(this.pessoaId).subscribe({
      next: (files: Anexo[]) => {
        // Agora pega apenas os nomes dos arquivos para exibição
        this.fileList = files.map(file => file.nome);
      },
      error: (error: HttpErrorResponse) => {
        alert(`Erro ao carregar arquivos: ${error.message}`);
      }
    });
  }

  /**
   * Método para fazer download de um arquivo
   */
  downloadArquivo(fileName: string) {
    this.arquivoService.downloadArquivo(fileName).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error: HttpErrorResponse) => {
        alert(`Erro ao fazer download: ${error.message}`);
      }
    });
  }

  /**
   * Método para excluir um arquivo
   */
  excluirArquivo(fileName: string) {
    if (confirm(`Deseja realmente excluir o arquivo: ${fileName}?`)) {
      this.arquivoService.deletarArquivo(fileName).subscribe({
        next: () => {
          alert('Arquivo excluído com sucesso!');
          this.carregarArquivos();
        },
        error: (error: HttpErrorResponse) => {
          alert(`Erro ao excluir arquivo: ${error.message}`);
        }
      });
    }
  }
}
