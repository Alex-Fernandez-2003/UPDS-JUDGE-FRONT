export interface LoginRequest {
  correo: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  expiraEn: string;
}

export interface RegisterRequest {
  nombre: string;
  correo: string;
  contrasena: string;
}

export interface RegisterResponse {
  mensaje: string;
}