export interface SignUpInput {
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
}

export interface AuthResponse {
  user: AuthenticatedUser;
  tokens: AuthTokens;
}
