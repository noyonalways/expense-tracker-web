interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  _id: string;
  name: string;
  description: string;
  amount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Limit {
  _id: string;
  amount: number;
  period: string;
  startDate: string;
  endDate: string;
  status: string;
  category: Category;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface LimitResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Limit;
}
