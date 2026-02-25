import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ContactMessage {
    id: number;
    name: string;
    email: string;
    message: string;
    date: string;
    read: boolean;
}

interface MessagesContextType {
    messages: ContactMessage[];
    addMessage: (name: string, email: string, message: string) => void;
    markAsRead: (id: number) => void;
    deleteMessage: (id: number) => void;
    unreadCount: number;
}

const MessagesContext = createContext<MessagesContextType | undefined>(undefined);

// Mensajes simulados precargados
const initialMessages: ContactMessage[] = [
    {
        id: 1,
        name: 'Carlos Méndez',
        email: 'carlos.mendez@empresa.com',
        message: 'Buenos días, necesito una cotización de 50 kg de Cloruro de Sodio grado analítico para nuestro laboratorio. ¿Realizan envíos a Córdoba?',
        date: '2026-02-05 10:30',
        read: false,
    },
    {
        id: 2,
        name: 'Laura Fernández',
        email: 'lfernandez@labquim.com.ar',
        message: 'Hola, quisiera saber si tienen Ácido Clorhídrico al 37% en presentación de 2.5L. También me interesa el certificado de análisis.',
        date: '2026-02-04 15:45',
        read: false,
    },
    {
        id: 3,
        name: 'Ing. Roberto Gómez',
        email: 'rgomez@industrialsa.com',
        message: 'Estimados, somos una empresa industrial y necesitamos proveedores de solventes (etanol y acetona) en grandes cantidades. ¿Podemos agendar una reunión?',
        date: '2026-02-03 09:15',
        read: true,
    },
    {
        id: 4,
        name: 'María José Torres',
        email: 'mjtorres@universidad.edu',
        message: 'Soy docente de química y necesito Sulfato de Cobre y Carbonato de Calcio para las prácticas de laboratorio del semestre. ¿Tienen precios especiales para instituciones educativas?',
        date: '2026-02-02 14:20',
        read: true,
    },
    {
        id: 5,
        name: 'Pedro Alvarado',
        email: 'palvarado@farmacia.com',
        message: 'Necesito información sobre la disponibilidad de Hidróxido de Sodio en perlas grado reactivo. También quisiera saber los tiempos de entrega para Buenos Aires.',
        date: '2026-02-01 11:00',
        read: false,
    },
];

export const MessagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [messages, setMessages] = useState<ContactMessage[]>(initialMessages);

    const addMessage = (name: string, email: string, message: string) => {
        const newMsg: ContactMessage = {
            id: Date.now(),
            name,
            email,
            message,
            date: new Date().toLocaleString('es-AR'),
            read: false,
        };
        setMessages(prev => [newMsg, ...prev]);
    };

    const markAsRead = (id: number) => {
        setMessages(prev =>
            prev.map(msg => (msg.id === id ? { ...msg, read: true } : msg))
        );
    };

    const deleteMessage = (id: number) => {
        setMessages(prev => prev.filter(msg => msg.id !== id));
    };

    const unreadCount = messages.filter(m => !m.read).length;

    return (
        <MessagesContext.Provider value={{ messages, addMessage, markAsRead, deleteMessage, unreadCount }}>
            {children}
        </MessagesContext.Provider>
    );
};

export const useMessages = () => {
    const context = useContext(MessagesContext);
    if (!context) throw new Error('useMessages debe usarse dentro de MessagesProvider');
    return context;
};
