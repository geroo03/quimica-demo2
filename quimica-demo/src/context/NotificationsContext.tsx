import React, { createContext, useContext, useState } from 'react';
import { SaleNotification } from '../types';

interface NotificationsContextType {
  notifications: SaleNotification[];
  unreadCount: number;
  markAsRead: (id: number) => void;
  markAllAsRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | undefined>(undefined);

const initialNotifications: SaleNotification[] = [
  {
    id: 1,
    orderId: 1010,
    customerName: 'Gastronomia Norte SA',
    productName: 'Detergente Espumante x 1L',
    total: 26700,
    timestamp: '2026-02-12 14:32',
    read: false,
  },
  {
    id: 2,
    orderId: 1001,
    customerName: 'Juan Perez',
    productName: 'Lavandina Concentrada x 5L',
    total: 18500,
    timestamp: '2026-02-12 11:15',
    read: false,
  },
  {
    id: 3,
    orderId: 1002,
    customerName: 'Maria Garcia',
    productName: 'Detergente Industrial x 5L',
    total: 7200,
    timestamp: '2026-02-12 09:45',
    read: false,
  },
  {
    id: 4,
    orderId: 1004,
    customerName: 'Ana Martinez',
    productName: 'Soda Caustica Escamas x 1kg',
    total: 32000,
    timestamp: '2026-02-11 16:20',
    read: true,
  },
  {
    id: 5,
    orderId: 1005,
    customerName: 'Roberto Diaz',
    productName: 'Desinfectante Pisos x 5L',
    total: 24800,
    timestamp: '2026-02-10 10:05',
    read: true,
  },
];

export const NotificationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<SaleNotification[]>(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: number) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markAsRead, markAllAsRead }}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) throw new Error('useNotifications must be used within a NotificationsProvider');
  return context;
};
