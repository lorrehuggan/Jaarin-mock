type nn = number | null;
type sn = string | null;

export interface LoginInput {
  username: string;
  password: string;
}

export interface SignUpInput {
  username: string;
  email: string;
  currency: string;
  password: string;
  confirmPassword: string;
}

export interface AuthenticatedUser {
  id: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
  createdAt: number;
  currency: string;
}

export interface UserID {
  id: string;
  username: string;
  email: string;
  token: string;
}

export interface MenuState {
  isOpen: boolean;
}
