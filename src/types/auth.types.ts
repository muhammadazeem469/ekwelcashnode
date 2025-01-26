export interface TokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  token_type: string;
  "not-before-policy": number;
  scope: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
