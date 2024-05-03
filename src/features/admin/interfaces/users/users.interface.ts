import { Role } from '@/features/auth';

export interface User {
  id: string;
  name: string | null;
  isActive: boolean;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  role: Role;
  createdAt: Date;
}
