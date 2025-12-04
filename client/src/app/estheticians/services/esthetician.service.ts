// src/app/estheticians/services/esthetician.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Esthetician } from '../models/esthetician.model';

@Injectable({
  providedIn: 'root'
})
export class EstheticianService {
  private apiUrlBase = 'http://localhost:8080/beauty-clinic-api/v1/esthetician'; // Base da URL para esteticista

  constructor(private http: HttpClient) { }

  // GET esthetician/list
  getAllEstheticians(): Observable<Esthetician[]> {
    return this.http.get<Esthetician[]>(`${this.apiUrlBase}/list`);
  }

  // GET esthetician/{cpf}
  getEstheticianByCpf(cpf: string): Observable<Esthetician> {
    return this.http.get<Esthetician>(`${this.apiUrlBase}/${cpf}`);
  }

  // POST esthetician/register
  addEsthetician(estheticianData: Esthetician): Observable<Esthetician> { // Ou o tipo que sua API retorna
    // Se a API retornar uma string de sucesso e não JSON, use { responseType: 'text' }
    return this.http.post<Esthetician>(`${this.apiUrlBase}/register`, estheticianData);
  }

  // PATCH esthetician/update/{cpf} (Assumindo este endpoint e método)
  updateEsthetician(cpf: string, estheticianData: Partial<Esthetician>): Observable<Esthetician> { // Ou o tipo que sua API retorna
    // Usamos Partial<Esthetician> se a API aceitar apenas os campos modificados.
    // Se a API espera o objeto completo, use Esthetician.
    // Se a API retornar uma string de sucesso e não JSON, use { responseType: 'text' }
    return this.http.patch<Esthetician>(`${this.apiUrlBase}/update/${cpf}`, estheticianData);
  }

  // DELETE esthetician/delete/{cpf}
  deleteEsthetician(cpf: string): Observable<any> { // A API pode retornar 204 No Content ou uma mensagem
    // Se a API retornar uma string de sucesso e não JSON, use { responseType: 'text' }
    return this.http.delete(`${this.apiUrlBase}/${cpf}`, { responseType: 'text' });
  }
}
