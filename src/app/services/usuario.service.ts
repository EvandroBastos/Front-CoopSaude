import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../Models/response';
import { Proponentes } from '../Models/proponentes';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `https://localhost:7124/api/Proponentes`; // Alterado para 'Proponentes'

  constructor(private http: HttpClient) {}

  // Método para obter a lista de proponentes
  getProponentes(): Observable<ApiResponse> { // Alterado nome do método
    return this.http.get<ApiResponse>(`${this.apiUrl}`); // Removido '/Pessoas'
  }

  // Método para excluir um proponente pelo ID
  excluirProponente(id: string): Observable<any> { // Alterado nome do método
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Método para cadastrar um novo proponente
  /* cadastrarProponente(proponente: Proponentes): Observable<any> { // Alterado nome do método
    return this.http.post<any>(`${this.apiUrl}`, proponente); // Alterado a URL
  } */
  cadastrarProponente(formData: FormData): Observable<any> { // Alterado nome do método
    return this.http.post<any>(`${this.apiUrl}`, formData); // Alterado a URL
  }

  // Método para obter os detalhes de um proponente por ID
  getProponentePorId(id: string): Observable<Proponentes> { // Alterado nome do método
    return this.http.get<Proponentes>(`${this.apiUrl}/${id}`).pipe(
      tap((res) => console.log('Proponente carregado:', res))
    );
  }
}
