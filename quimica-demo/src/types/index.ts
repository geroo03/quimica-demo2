export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  brand: string;
  unit: string;
  stock: number;
  featured?: boolean;
  specs?: string[];
}

export interface Order {
  id: number;
  productId: number;
  quantity: number;
  customerName: string;
  customerEmail: string;
  orderDate: string;
  status: string;
  total: number;
  emailStatus: 'Enviado' | 'Pendiente';
  paymentStatus: 'Pagado' | 'Pendiente' | 'Rechazado';
}

export interface SaleNotification {
  id: number;
  orderId: number;
  customerName: string;
  productName: string;
  total: number;
  timestamp: string;
  read: boolean;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  slug: string;
}