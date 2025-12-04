// src/app/clientes/services/cliente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Importe o HttpClient
import { Observable } from 'rxjs';
import { Client } from '../models/client.model'; // Importe a interface

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'http://localhost:8080/beauty-clinic-api/v1/client';

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/list`);
  }

  getClienteByCpf(cpf: string): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${cpf}`);
  }

  addClient(clientData: Client): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/register`, clientData);
  }

  deleteClient(cpf: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${cpf}`, { responseType: 'text' });
  }

  updateClient(cpf: string, clientData: Client): Observable<any> {
    return this.http.patch(`${this.apiUrl}/update/${cpf}`, clientData);
  }
}
