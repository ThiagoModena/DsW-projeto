// src/app/sessions/services/session.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Session } from '../models/session.model';

export interface SessionPayload { // Para o corpo do POST de criação
  appointment_id: number;
  date: string;
}

export interface SessionPatch {
  date: string;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private apiUrlBase = 'http://localhost:8080/beauty-clinic-api/v1/session';

  constructor(private http: HttpClient) { }

  // GET /session/list
  getAllSessions(): Observable<Session[]> {
    return this.http.get<Session[]>(`${this.apiUrlBase}/list`);
  }

  // GET /session/{id}
  getSessionById(id: number): Observable<Session> {
    return this.http.get<Session>(`${this.apiUrlBase}/${id}`);
  }

  // POST /session/register
  // Assumindo que a API retorna o objeto Session criado.
  // Se retornar string, mude Observable<Session> para Observable<string> e adicione { responseType: 'text' }.
  addSession(sessionData: SessionPayload): Observable<Session> {
    return this.http.post<Session>(`${this.apiUrlBase}/register`, sessionData);
  }

  // PATCH /session/{id} (Assumindo que podemos atualizar appointment_id e date)
  // Se a API aceitar apenas campos parciais, o tipo do payload pode ser Partial<SessionPayload> ou um tipo específico.
  // Assumindo que a API retorna o objeto Session atualizado.
  updateSession(id: number, sessionData: Partial<SessionPayload>): Observable<Session> {
    return this.http.patch<Session>(`${this.apiUrlBase}/${id}`, sessionData);
  }

  // DELETE /session/{id}
  deleteSession(id: number): Observable<any> {
    // Se a API retornar string, adicione { responseType: 'text' }
    return this.http.delete(`${this.apiUrlBase}/${id}`, { responseType: 'text' });
  }
}
