export interface ClientInAppointment {
  cpf: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  cep: string;
  complement: string | null;
  number: string;
  how_found_us: string;
}

// Interface para o esteticista dentro do agendamento da sessão
export interface EstheticianInAppointment {
  cpf: string;
  first_name: string;
  last_name: string;
  specialty: string;
}

// Interface para o agendamento dentro da sessão
export interface AppointmentInSession {
  id: number;
  date: string;
  status: string;
  client: ClientInAppointment;
  esthetician: EstheticianInAppointment;
}

// Interface para um procedimento dentro da sessão
export interface ProcedureInSession {
  id: number;
  name: string;
  price: number;
}

// Interface principal da Sessão
export interface Session {
  id: number; // ID da própria sessão
  date: string; // Data da sessão "YYYY-MM-DD HH:MM:SS"
  appointment: AppointmentInSession; // Objeto de agendamento aninhado
  procedures: ProcedureInSession[]; // Array de procedimentos
}

