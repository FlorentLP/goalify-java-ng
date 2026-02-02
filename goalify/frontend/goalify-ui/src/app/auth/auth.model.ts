export interface RegisterRequest {
    email: string;
    password: string;
    name: string;
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    userId: number;
    email: string;
    name: string;
    token: string;
  }