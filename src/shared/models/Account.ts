// src/shared/models/Account.ts
export interface Account {
    id?: string;
    fullName: string;
    email: string;
    password?: string;
    role?: 'USER' | 'ADMIN';
  }