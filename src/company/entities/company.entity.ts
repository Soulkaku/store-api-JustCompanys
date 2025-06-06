import { Company } from '@prisma/client';

export class ICompany implements Company {
  id: number;
  name: string;
  email: string;
  password: string;
}
