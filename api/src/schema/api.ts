export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  roleKey: string;
  permissions: string[];
}

export interface Session {
  user: AuthUser;
  expiresAt: string;
}
