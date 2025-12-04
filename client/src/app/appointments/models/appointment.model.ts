export interface Appointment {
  id: number; // Assumindo que a API retorna um ID
  date: string; // Formato "YYYY-MM-DD HH:MM:SS"
  client_cpf: string;
  esthetician_cpf: string;
  status?: string; // Ex: SCHEDULED, COMPLETED, CANCELLED. A API de lista deve retornar isso.
}
