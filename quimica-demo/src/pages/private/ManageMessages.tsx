import React, { useState } from 'react';
import AdminLayout from '../../components/private/AdminLayout';
import { useMessages, ContactMessage } from '../../context/MessagesContext';

const ManageMessages: React.FC = () => {
    const { messages, markAsRead, deleteMessage, unreadCount } = useMessages();
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
    const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

    const filteredMessages = messages.filter(msg => {
        if (filter === 'unread') return !msg.read;
        if (filter === 'read') return msg.read;
        return true;
    });

    const handleSelect = (msg: ContactMessage) => {
        setSelectedMessage(msg);
        if (!msg.read) markAsRead(msg.id);
    };

    return (
        <AdminLayout>
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">📬 Mensajes de Contacto</h1>
                <p className="text-gray-500 mt-1">
                    {unreadCount > 0
                        ? `Tienes ${unreadCount} mensaje${unreadCount > 1 ? 's' : ''} sin leer`
                        : 'Todos los mensajes han sido leídos'}
                </p>
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap gap-2 mb-6">
                {[
                    { key: 'all' as const, label: 'Todos', count: messages.length },
                    { key: 'unread' as const, label: 'Sin leer', count: messages.filter(m => !m.read).length },
                    { key: 'read' as const, label: 'Leídos', count: messages.filter(m => m.read).length },
                ].map(f => (
                    <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                            filter === f.key
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300'
                        }`}
                    >
                        {f.label} ({f.count})
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Lista de mensajes */}
                <div className="lg:col-span-1 space-y-3 max-h-[600px] overflow-y-auto pr-1">
                    {filteredMessages.length === 0 ? (
                        <div className="bg-white rounded-xl p-8 text-center text-gray-400">
                            <p className="text-4xl mb-2">📭</p>
                            <p>No hay mensajes</p>
                        </div>
                    ) : (
                        filteredMessages.map(msg => (
                            <div
                                key={msg.id}
                                onClick={() => handleSelect(msg)}
                                className={`bg-white rounded-xl p-4 cursor-pointer transition-all border-2 ${
                                    selectedMessage?.id === msg.id
                                        ? 'border-blue-500 shadow-lg'
                                        : 'border-transparent hover:border-blue-200 hover:shadow-md'
                                } ${!msg.read ? 'ring-2 ring-blue-200' : ''}`}
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            {!msg.read && (
                                                <span className="w-2.5 h-2.5 bg-blue-500 rounded-full flex-shrink-0" />
                                            )}
                                            <h3 className={`text-sm truncate ${!msg.read ? 'font-bold text-gray-900' : 'font-medium text-gray-600'}`}>
                                                {msg.name}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-0.5">{msg.email}</p>
                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{msg.message}</p>
                                    </div>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap flex-shrink-0">
                                        {msg.date}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Detalle del mensaje seleccionado */}
                <div className="lg:col-span-2">
                    {selectedMessage ? (
                        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
                            {/* Encabezado */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-gray-100">
                                <div>
                                    <div className="flex items-center gap-3">
                                        <div className="bg-blue-100 text-blue-700 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg">
                                            {selectedMessage.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900">{selectedMessage.name}</h2>
                                            <a href={`mailto:${selectedMessage.email}`} className="text-sm text-blue-600 hover:underline">
                                                {selectedMessage.email}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                                        📅 {selectedMessage.date}
                                    </span>
                                    <button
                                        onClick={() => {
                                            deleteMessage(selectedMessage.id);
                                            setSelectedMessage(null);
                                        }}
                                        className="text-red-400 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                                        title="Eliminar mensaje"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Cuerpo del mensaje */}
                            <div className="bg-gray-50 rounded-xl p-5 sm:p-6">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {selectedMessage.message}
                                </p>
                            </div>

                            {/* Acciones */}
                            <div className="mt-6 flex flex-wrap gap-3">
                                <a
                                    href={`mailto:${selectedMessage.email}?subject=Re: Consulta - QuímicaPro`}
                                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-5 rounded-xl font-semibold text-sm transition"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    Responder por email
                                </a>
                                <button
                                    onClick={() => {
                                        deleteMessage(selectedMessage.id);
                                        setSelectedMessage(null);
                                    }}
                                    className="inline-flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-700 py-2.5 px-5 rounded-xl font-semibold text-sm transition"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
                            <div className="text-6xl mb-4">💬</div>
                            <h3 className="text-xl font-bold text-gray-700 mb-2">Selecciona un mensaje</h3>
                            <p className="text-gray-400">Haz click en un mensaje de la lista para ver su contenido completo</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageMessages;
