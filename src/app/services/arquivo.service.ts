import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Anexo } from '../Models/proponentes';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {
  private apiUrl = `https://localhost:7124/api/Arquivo`;

  constructor(private http: HttpClient) {}

  /**
   * Lista os arquivos de um proponente pelo ID da pessoa
   * @param pessoaId - ID do proponente
   */
  listarArquivos(pessoaId: string): Observable<Anexo[]> {
    return this.http.get<Anexo[]>(`${this.apiUrl}/listar/${pessoaId}`);
  }

  /**
   * Faz o download de um arquivo pelo ID do arquivo
   * @param id - ID do arquivo
   */
  downloadArquivo(id: string): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/download/${id}`, { responseType: 'blob' });
  }

  uploadArquivo(formData: FormData, pessoaId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/upload?pessoaId=${pessoaId}`, formData);
  }

  deletarArquivo(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }
  visualizarArquivo(id: string): string {
    return `${this.apiUrl}/visualizar/${id}`;
  }


}
