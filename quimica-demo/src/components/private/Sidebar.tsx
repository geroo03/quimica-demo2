import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useMessages } from '../../context/MessagesContext';

const Sidebar: React.FC = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { unreadCount } = useMessages();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        {
            to: '/admin',
            label: 'Inicio',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" />
                </svg>
            ),
        },
        {
            to: '/admin/manage-products',
            label: 'Gestión de Productos',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
            ),
        },
        {
            to: '/admin/manage-orders',
            label: 'Gestión de Pedidos',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
            ),
        },
        {
            to: '/admin/messages',
            label: 'Mensajes',
            badge: unreadCount > 0 ? unreadCount : undefined,
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            to: '/admin/comprobantes',
            label: 'Comprobantes',
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
    ];

    return (
        <div className="bg-gray-900 text-white w-72 min-h-screen p-6 flex flex-col">
            {/* Título */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-yellow-400">🧪 Panel Admin</h2>
                <p className="text-gray-400 text-sm mt-1">Gestión del sistema</p>
            </div>

            {/* Tarjetas de navegación */}
            <nav className="flex-1 space-y-3">
                {menuItems.map((item) => (
                    <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-4 bg-gray-800 hover:bg-blue-700 transition-colors rounded-xl p-4 group relative"
                    >
                        <div className="bg-blue-600 group-hover:bg-yellow-400 text-white group-hover:text-gray-900 rounded-lg p-2 transition-colors">
                            {item.icon}
                        </div>
                        <span className="font-medium text-sm">{item.label}</span>
                        {item.badge && (
                            <span className="absolute right-3 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">
                                {item.badge}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>

            {/* Botón Cerrar Sesión */}
            <div className="mt-6 pt-6 border-t border-gray-700">
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-4 bg-red-600/20 hover:bg-red-600 transition-colors rounded-xl p-4 w-full group"
                >
                    <div className="bg-red-600 group-hover:bg-red-700 text-white rounded-lg p-2 transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <span className="font-medium text-sm text-red-400 group-hover:text-white">Cerrar Sesión</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;