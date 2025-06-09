import { Product } from '@prisma/client';

export class IProduct implements Product {
  id: number;
  name: string;
  description: string;
  images: string[];
  companyId: number
}
