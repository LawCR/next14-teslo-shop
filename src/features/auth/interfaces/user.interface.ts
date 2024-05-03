export interface User {
  id: string;
  name: string;
  // firstName: string;
  // lastName: string;
  isActive: boolean;
  email: string;
  emailVerified: string;
  image: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export type Role = 'admin' | 'employee' | 'client';