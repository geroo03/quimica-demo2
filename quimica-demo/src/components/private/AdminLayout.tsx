import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import { useNotifications } from '../../context/NotificationsContext';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [bellOpen, setBellOpen] = useState(false);
    const bellRef = useRef<HTMLDivElement>(null);
    const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

    // Close bell dropdown on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
                setBellOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Overlay para móvil cuando sidebar está abierto */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar con transición */}
            <div
                className={`fixed lg:relative z-30 transition-all duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:-translate-x-full'
                }`}
                style={!sidebarOpen ? { marginLeft: '-18rem' } : {}}
            >
                <Sidebar />
            </div>

            {/* Contenido principal */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top bar con botón hamburguesa + campana */}
                <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-10 border-b border-gray-200">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 rounded-lg hover:bg-blue-100 transition-colors border border-gray-200"
                            aria-label="Toggle menú"
                            title={sidebarOpen ? 'Ocultar menú' : 'Mostrar menú'}
                        >
                            {sidebarOpen ? (
                                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                        <div>
                            <h1 className="text-lg font-bold text-blue-900">🧪 Panel de Administración</h1>
                            <p className="text-xs text-gray-400 hidden sm:block">QuímicaPro - Sistema de Gestión Empresarial</p>
                        </div>
                    </div>

                    {/* Right side: Bell + User info */}
                    <div className="flex items-center gap-3">
                        {/* Bell Notification */}
                        <div className="relative" ref={bellRef}>
                            <button
                                onClick={() => setBellOpen(!bellOpen)}
                                className="relative p-2 rounded-lg hover:bg-blue-50 transition-colors border border-gray-200"
                                title="Notificaciones de ventas"
                            >
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown */}
                            {bellOpen && (
                                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                                    <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-4 py-3 flex items-center justify-between">
                                        <h3 className="text-white font-bold text-sm">🔔 Nuevas Ventas</h3>
                                        {unreadCount > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-blue-200 hover:text-white text-xs font-medium transition"
                                            >
                                                Marcar todas como leídas
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-80 overflow-y-auto divide-y divide-gray-100">
                                        {notifications.slice(0, 5).map(n => (
                                            <div
                                                key={n.id}
                                                onClick={() => markAsRead(n.id)}
                                                className={`px-4 py-3 hover:bg-blue-50 cursor-pointer transition flex gap-3 ${!n.read ? 'bg-blue-50/50' : ''}`}
                                            >
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${!n.read ? 'bg-green-100' : 'bg-gray-100'}`}>
                                                    <span className="text-lg">{!n.read ? '💰' : '✅'}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={`text-sm ${!n.read ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                                                        {n.customerName}
                                                    </p>
                                                    <p className="text-xs text-gray-400 truncate">{n.productName}</p>
                                                    <div className="flex items-center justify-between mt-1">
                                                        <span className="text-sm font-bold text-green-600">${n.total.toLocaleString('es-AR')}</span>
                                                        <span className="text-xs text-gray-400">{n.timestamp.split(' ')[1]}</span>
                                                    </div>
                                                </div>
                                                {!n.read && (
                                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="bg-gray-50 px-4 py-2 text-center border-t">
                                        <span className="text-xs text-gray-400">Últimas 5 notificaciones de ventas</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Status indicator */}
                        <div className="hidden sm:flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span className="text-xs font-semibold text-green-700">Sistema activo</span>
                        </div>
                    </div>
                </header>

                {/* Contenido de la página */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
