export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  birthdate: string | null;
  phone: string;
  createdAt: string;
  segment: string;
}

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
