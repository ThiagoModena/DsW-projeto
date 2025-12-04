import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Procedure } from '../models/procedure.model';

@Injectable({
  providedIn: 'root'
})
export class ProcedureService {
  // Ajuste a URL base se a sua API tiver um prefixo diferente para 'procedure'
  private apiUrlBase = 'http://localhost:8080/beauty-clinic-api/v1/procedure';

  constructor(private http: HttpClient) { }

  // GET /procedure/list
  getAllProcedures(): Observable<Procedure[]> {
    return this.http.get<Procedure[]>(`${this.apiUrlBase}/list`);
  }

  // GET /procedure/{id}
  getProcedureById(id: number): Observable<Procedure> {
    return this.http.get<Procedure>(`${this.apiUrlBase}/${id}`);
  }

  // POST procedure/register
  // A API retorna o objeto Procedure criado ou apenas uma mensagem de sucesso?
  // Vou assumir que retorna o Procedure criado. Se for uma string, ajuste o tipo de retorno e adicione { responseType: 'text' }.
  addProcedure(procedureData: { name: string; price: number }): Observable<Procedure> {
    return this.http.post<Procedure>(`${this.apiUrlBase}/register`, procedureData);
  }

  // PATCH procedure/{id}
  // O corpo do PATCH pode ser apenas os campos que mudaram.
  updateProcedure(id: number, procedureData: Partial<Procedure>): Observable<Procedure> { // Ou o tipo que sua API retorna
    // Se a API retornar uma string de sucesso e não JSON, use { responseType: 'text' }
    return this.http.patch<Procedure>(`${this.apiUrlBase}/${id}`, procedureData);
  }

  // DELETE procedure/{id}
  deleteProcedure(id: number): Observable<any> {
    // Se a API retornar uma string de sucesso e não JSON, use { responseType: 'text' }
    return this.http.delete(`${this.apiUrlBase}/${id}`, { responseType: 'text' });
  }
}
