import React from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../../components/private/AdminLayout';
import { orders } from '../../data/orders';
import { products } from '../../data/products';
import { useNotifications } from '../../context/NotificationsContext';

const AdminDashboard: React.FC = () => {
    const { notifications } = useNotifications();

    // Metrics calculations
    const today = '2026-02-12';
    const ventasPendientes = orders.filter(o => o.paymentStatus === 'Pendiente').length;
    const ventasPagadasHoy = orders.filter(o => o.orderDate === today && o.paymentStatus === 'Pagado').length;
    const totalMensual = orders.filter(o => o.paymentStatus === 'Pagado').reduce((sum, o) => sum + o.total, 0);
    const pedidosPendientes = orders.filter(o => o.status === 'Pendiente').length;
    const pedidosEnviados = orders.filter(o => o.status === 'Enviado' || o.status === 'Entregado').length;
    const ultimaCompra = orders.reduce((latest, o) => o.orderDate > latest.orderDate ? o : latest, orders[0]);
    const ultimoProducto = products.find(p => p.id === ultimaCompra.productId);

    return (
        <AdminLayout>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">Panel de Control</h1>
                <p className="text-gray-500 mt-1">Resumen general del sistema - {today}</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {/* Ventas Pendientes */}
                <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-yellow-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Ventas Pendientes</p>
                            <p className="text-3xl font-extrabold text-yellow-600 mt-1">{ventasPendientes}</p>
                            <p className="text-xs text-gray-400 mt-1">Aguardando pago</p>
                        </div>
                        <div className="bg-yellow-100 p-3 rounded-xl">
                            <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Ventas Pagadas Hoy */}
                <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-green-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Pagadas Hoy</p>
                            <p className="text-3xl font-extrabold text-green-600 mt-1">{ventasPagadasHoy}</p>
                            <p className="text-xs text-gray-400 mt-1">Confirmadas y cobradas</p>
                        </div>
                        <div className="bg-green-100 p-3 rounded-xl">
                            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Total Mensual */}
                <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-blue-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Mensual</p>
                            <p className="text-3xl font-extrabold text-blue-600 mt-1">${totalMensual.toLocaleString('es-AR')}</p>
                            <p className="text-xs text-gray-400 mt-1">Febrero 2026</p>
                        </div>
                        <div className="bg-blue-100 p-3 rounded-xl">
                            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Total Productos */}
                <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-purple-400">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Productos Activos</p>
                            <p className="text-3xl font-extrabold text-purple-600 mt-1">{products.length}</p>
                            <p className="text-xs text-gray-400 mt-1">En catálogo</p>
                        </div>
                        <div className="bg-purple-100 p-3 rounded-xl">
                            <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Second Row: Last Purchase + Quick Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Última compra */}
                <div className="lg:col-span-1 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
                    <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wide mb-4">💰 Última Compra Realizada</h3>
                    <div className="space-y-3">
                        <div>
                            <p className="text-xs text-blue-300">Cliente</p>
                            <p className="font-bold text-lg">{ultimaCompra.customerName}</p>
                        </div>
                        <div>
                            <p className="text-xs text-blue-300">Producto</p>
                            <p className="font-semibold">{ultimoProducto?.name || 'N/A'}</p>
                        </div>
                        <div>
                            <p className="text-xs text-blue-300">Fecha</p>
                            <p className="font-semibold">{ultimaCompra.orderDate}</p>
                        </div>
                        <div className="pt-2 border-t border-blue-600">
                            <p className="text-xs text-blue-300">Total</p>
                            <p className="text-3xl font-extrabold text-yellow-400">${ultimaCompra.total.toLocaleString('es-AR')}</p>
                        </div>
                    </div>
                </div>

                {/* Resumen de pedidos */}
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">📊 Estado de Pedidos</h3>
                    <div className="space-y-3">
                        {[
                            { label: 'Pendientes', value: pedidosPendientes, color: 'bg-yellow-400', total: orders.length },
                            { label: 'En preparación', value: orders.filter(o => o.status === 'En preparación').length, color: 'bg-purple-400', total: orders.length },
                            { label: 'Enviados', value: orders.filter(o => o.status === 'Enviado').length, color: 'bg-indigo-400', total: orders.length },
                            { label: 'Entregados', value: pedidosEnviados, color: 'bg-green-400', total: orders.length },
                            { label: 'Cancelados', value: orders.filter(o => o.status === 'Cancelado').length, color: 'bg-red-400', total: orders.length },
                        ].map(item => (
                            <div key={item.label} className="flex items-center gap-3">
                                <span className="text-sm text-gray-600 w-28">{item.label}</span>
                                <div className="flex-1 bg-gray-100 rounded-full h-2">
                                    <div className={`${item.color} h-2 rounded-full transition-all`} style={{ width: `${(item.value / item.total) * 100}%` }}></div>
                                </div>
                                <span className="text-sm font-bold text-gray-700 w-6 text-right">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Últimas notificaciones */}
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-md p-6">
                    <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">🔔 Últimas Notificaciones</h3>
                    <div className="space-y-3">
                        {notifications.slice(0, 4).map(n => (
                            <div key={n.id} className={`flex items-center gap-3 p-2 rounded-lg ${!n.read ? 'bg-green-50' : 'bg-gray-50'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${!n.read ? 'bg-green-100' : 'bg-gray-100'}`}>
                                    {!n.read ? '💰' : '✅'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-800 truncate">{n.customerName}</p>
                                    <p className="text-xs text-gray-400">${n.total.toLocaleString('es-AR')}</p>
                                </div>
                                <span className="text-xs text-gray-400">{n.timestamp.split(' ')[1]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Accesos rápidos */}
            <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-lg font-bold mb-4 text-gray-800">⚡ Accesos Rápidos</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link to="/admin/manage-products" className="flex items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition group">
                        <div className="bg-blue-500 group-hover:bg-blue-600 p-3 rounded-lg mr-3 transition">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Productos</h3>
                            <p className="text-xs text-gray-500">Gestionar catálogo</p>
                        </div>
                    </Link>

                    <Link to="/admin/manage-orders" className="flex items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition group">
                        <div className="bg-green-500 group-hover:bg-green-600 p-3 rounded-lg mr-3 transition">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Pedidos</h3>
                            <p className="text-xs text-gray-500">Administrar ventas</p>
                        </div>
                    </Link>

                    <Link to="/admin/comprobantes" className="flex items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition group">
                        <div className="bg-purple-500 group-hover:bg-purple-600 p-3 rounded-lg mr-3 transition">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Comprobantes</h3>
                            <p className="text-xs text-gray-500">Descargar PDFs</p>
                        </div>
                    </Link>

                    <Link to="/admin/messages" className="flex items-center p-4 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition group">
                        <div className="bg-yellow-500 group-hover:bg-yellow-600 p-3 rounded-lg mr-3 transition">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">Mensajes</h3>
                            <p className="text-xs text-gray-500">Bandeja de entrada</p>
                        </div>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
};

export default AdminDashboard;