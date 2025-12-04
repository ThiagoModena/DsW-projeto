// src/app/appointments/services/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '../models/appointment.model';

export interface AppointmentPayload { // Para o corpo do POST de criação
  date: string;
  client_cpf: string;
  esthetician_cpf: string;
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private apiUrlBase = 'http://localhost:8080/beauty-clinic-api/v1/appointment';

  constructor(private http: HttpClient) { }

  // GET appointment/list
  getAllAppointments(): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrlBase}/list`);
  }

  // GET appointment/{id}
  getAppointmentById(id: number): Observable<Appointment> {
    return this.http.get<Appointment>(`${this.apiUrlBase}/${id}`);
  }

  // POST appointment/register
  // Se a API retornar o objeto Appointment criado:
  addAppointment(appointmentData: AppointmentPayload): Observable<Appointment> {
    return this.http.post<Appointment>(`${this.apiUrlBase}/register`, appointmentData);
  }
  // Se a API retornar uma string de sucesso:
  // addAppointment(appointmentData: AppointmentPayload): Observable<string> {
  //   return this.http.post(`${this.apiUrlBase}/register`, appointmentData, { responseType: 'text' });
  // }


  // PATCH appointment/{id}/update-date
  // Se a API retornar o objeto Appointment atualizado:
  updateAppointmentDate(id: number, newDate: string): Observable<Appointment> {
    return this.http.patch<Appointment>(`${this.apiUrlBase}/${id}/update-date`, { date: newDate });
  }
  // Se a API retornar uma string de sucesso:
  // updateAppointmentDate(id: number, newDate: string): Observable<string> {
  //   return this.http.patch(`${this.apiUrlBase}/${id}/update-date`, { date: newDate }, { responseType: 'text' });
  // }


  // PATCH appointment/{id}/update-status
  // Se a API retornar o objeto Appointment atualizado:
  updateAppointmentStatus(id: number, newStatus: string): Observable<Appointment> {
    return this.http.patch<Appointment>(`${this.apiUrlBase}/${id}/update-status`, { status: newStatus });
  }
  // Se a API retornar uma string de sucesso:
  // updateAppointmentStatus(id: number, newStatus: string): Observable<string> {
  //   return this.http.patch(`${this.apiUrlBase}/${id}/update-status`, { status: newStatus }, { responseType: 'text' });
  // }

  // DELETE appointment/{id} - Adicionando este método
  deleteAppointment(id: number): Observable<any> {
    // Se a API retornar uma string de sucesso e não JSON, use { responseType: 'text' }
    return this.http.delete(`${this.apiUrlBase}/${id}`, { responseType: 'text' });
  }
}
