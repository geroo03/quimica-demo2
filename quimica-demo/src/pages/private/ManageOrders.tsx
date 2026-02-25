import React, { useEffect, useState } from 'react';
import { Order } from '../../types';
import { orders as ordersData } from '../../data/orders';
import { products } from '../../data/products';
import AdminLayout from '../../components/private/AdminLayout';
import jsPDF from 'jspdf';

const ESTADOS = ['Pendiente', 'Confirmado', 'En preparación', 'Enviado', 'Entregado', 'Cancelado'] as const;

const getStatusColor = (status: string) => {
    switch (status) {
        case 'Pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
        case 'Confirmado': return 'bg-blue-100 text-blue-800 border-blue-300';
        case 'En preparación': return 'bg-purple-100 text-purple-800 border-purple-300';
        case 'Enviado': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
        case 'Entregado': return 'bg-green-100 text-green-800 border-green-300';
        case 'Cancelado': return 'bg-red-100 text-red-800 border-red-300';
        default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'Pendiente': return '⏳';
        case 'Confirmado': return '✅';
        case 'En preparación': return '📦';
        case 'Enviado': return '🚚';
        case 'Entregado': return '✔️';
        case 'Cancelado': return '❌';
        default: return '❓';
    }
};

const ManageOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [filterStatus, setFilterStatus] = useState<string>('Todos');
    const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
    const [notification, setNotification] = useState<string>('');

    useEffect(() => {
        setOrders(ordersData);
    }, []);

    const showNotification = (msg: string) => {
        setNotification(msg);
        setTimeout(() => setNotification(''), 2500);
    };

    const handleChangeStatus = (orderId: number, newStatus: string) => {
        setOrders(prev =>
            prev.map(o => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
        if (selectedOrder?.id === orderId) {
            setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
        }
        showNotification(`Pedido #${orderId} → ${getStatusIcon(newStatus)} ${newStatus}`);
    };

    const handleDeleteOrder = (orderId: number) => {
        setOrders(prev => prev.filter(o => o.id !== orderId));
        if (selectedOrder?.id === orderId) setSelectedOrder(null);
        setConfirmDelete(null);
        showNotification(`Pedido #${orderId} eliminado`);
    };

    const getProductName = (productId: number) => {
        return products.find(p => p.id === productId)?.name || `Producto #${productId}`;
    };

    const handleDownloadPDF = (order: Order) => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();

        // Header azul
        doc.setFillColor(30, 58, 138);
        doc.rect(0, 0, pageWidth, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text('QuimicaPro', 20, 20);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('Soluciones Quimicas Profesionales', 20, 28);
        doc.text('CUIT: 30-12345678-9 | Av. Industrial 1234, Buenos Aires', 20, 35);

        // Título comprobante
        doc.setTextColor(30, 58, 138);
        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text(`COMPROBANTE DE VENTA`, 20, 55);
        doc.setFontSize(11);
        doc.setTextColor(100, 100, 100);
        doc.text(`Nro: COMP-${order.id}`, 20, 63);
        doc.text(`Fecha: ${order.orderDate}`, pageWidth - 20, 63, { align: 'right' });

        // Línea separadora
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 68, pageWidth - 20, 68);

        // Datos del cliente
        doc.setTextColor(60, 60, 60);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        doc.text('DATOS DEL CLIENTE', 20, 78);
        doc.setFont('helvetica', 'normal');
        doc.text(`Nombre: ${order.customerName}`, 20, 86);
        doc.text(`Email: ${order.customerEmail}`, 20, 93);

        // Línea separadora
        doc.line(20, 99, pageWidth - 20, 99);

        // Detalle del pedido
        doc.setFont('helvetica', 'bold');
        doc.text('DETALLE DEL PEDIDO', 20, 109);

        // Tabla header
        doc.setFillColor(240, 240, 240);
        doc.rect(20, 114, pageWidth - 40, 10, 'F');
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(80, 80, 80);
        doc.text('Producto', 25, 120);
        doc.text('Cantidad', 120, 120);
        doc.text('Total', 160, 120);

        // Tabla fila
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(60, 60, 60);
        doc.setFontSize(10);
        doc.text(getProductName(order.productId), 25, 132);
        doc.text(`${order.quantity}`, 125, 132);
        doc.setFont('helvetica', 'bold');
        doc.text(`$${order.total.toLocaleString('es-AR')}`, 160, 132);

        // Línea separadora
        doc.line(20, 138, pageWidth - 20, 138);

        // Total grande
        doc.setFillColor(239, 246, 255);
        doc.rect(20, 143, pageWidth - 40, 18, 'F');
        doc.setFontSize(14);
        doc.setTextColor(30, 58, 138);
        doc.setFont('helvetica', 'bold');
        doc.text('TOTAL:', 25, 155);
        doc.text(`$${order.total.toLocaleString('es-AR')}`, pageWidth - 25, 155, { align: 'right' });

        // Estados
        doc.setFontSize(10);
        doc.setTextColor(80, 80, 80);
        doc.setFont('helvetica', 'normal');
        doc.text(`Estado del Pedido: ${order.status}`, 20, 175);
        doc.text(`Estado de Pago: ${order.paymentStatus}`, 20, 183);
        doc.text(`Email al cliente: ${order.emailStatus}`, 20, 191);

        // Footer
        doc.setDrawColor(200, 200, 200);
        doc.line(20, 260, pageWidth - 20, 260);
        doc.setFontSize(8);
        doc.setTextColor(150, 150, 150);
        doc.text('Este comprobante fue generado automaticamente por el sistema QuimicaPro.', pageWidth / 2, 268, { align: 'center' });
        doc.text('www.quimicapro.com | info@quimicapro.com | Tel: (011) 4567-8901', pageWidth / 2, 274, { align: 'center' });

        doc.save(`comprobante-${order.id}.pdf`);
        showNotification(`📄 Comprobante #${order.id} descargado como PDF`);
    };

    const filteredOrders = filterStatus === 'Todos'
        ? orders
        : orders.filter(o => o.status === filterStatus);

    const stats = {
        total: orders.length,
        pendientes: orders.filter(o => o.status === 'Pendiente').length,
        enviados: orders.filter(o => o.status === 'Enviado').length,
        entregados: orders.filter(o => o.status === 'Entregado').length,
    };

    return (
        <AdminLayout>
            {/* Notificación */}
            {notification && (
                <div className="fixed top-20 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce text-sm font-semibold">
                    {notification}
                </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2">📋 Gestión de Pedidos</h1>
            <p className="text-gray-500 mb-6">Administra el estado de los pedidos de tus clientes</p>

            {/* Estadísticas rápidas */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {[
                    { label: 'Total', value: stats.total, color: 'bg-blue-50 text-blue-700', icon: '📦' },
                    { label: 'Pendientes', value: stats.pendientes, color: 'bg-yellow-50 text-yellow-700', icon: '⏳' },
                    { label: 'Enviados', value: stats.enviados, color: 'bg-indigo-50 text-indigo-700', icon: '🚚' },
                    { label: 'Entregados', value: stats.entregados, color: 'bg-green-50 text-green-700', icon: '✔️' },
                ].map(s => (
                    <div key={s.label} className={`${s.color} rounded-xl p-4 text-center`}>
                        <p className="text-2xl font-bold">{s.icon} {s.value}</p>
                        <p className="text-xs font-semibold mt-1">{s.label}</p>
                    </div>
                ))}
            </div>

            {/* Filtros por estado */}
            <div className="flex flex-wrap gap-2 mb-6">
                {['Todos', ...ESTADOS].map(st => (
                    <button
                        key={st}
                        onClick={() => setFilterStatus(st)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                            filterStatus === st
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-gray-500 border border-gray-200 hover:border-blue-300'
                        }`}
                    >
                        {st !== 'Todos' && getStatusIcon(st)} {st}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                {/* Lista de pedidos */}
                <div className="xl:col-span-2">
                    <div className="bg-white rounded-2xl shadow-md overflow-hidden">

                        {/* === DESKTOP: tabla horizontal con scroll === */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full min-w-[800px]">
                                <thead>
                                    <tr className="bg-blue-50 text-xs font-bold text-blue-900 uppercase tracking-wide">
                                        <th className="text-left px-4 py-3">#</th>
                                        <th className="text-left px-3 py-3">Cliente</th>
                                        <th className="text-left px-3 py-3">Producto</th>
                                        <th className="text-left px-3 py-3">Total</th>
                                        <th className="text-left px-3 py-3">Estado</th>
                                        <th className="text-left px-3 py-3">Email</th>
                                        <th className="text-left px-3 py-3">Pago</th>
                                        <th className="text-center px-3 py-3">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredOrders.length === 0 ? (
                                        <tr>
                                            <td colSpan={8} className="p-8 text-center text-gray-400">
                                                <p className="text-4xl mb-2">📭</p>
                                                <p>No hay pedidos con este filtro</p>
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredOrders.map(order => (
                                            <tr
                                                key={order.id}
                                                onClick={() => setSelectedOrder(order)}
                                                className={`border-b border-gray-50 hover:bg-blue-50/50 cursor-pointer transition ${
                                                    selectedOrder?.id === order.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                                }`}
                                            >
                                                <td className="px-4 py-3 text-gray-400 font-mono text-sm font-bold whitespace-nowrap">#{order.id}</td>
                                                <td className="px-3 py-3">
                                                    <p className="font-semibold text-gray-800 text-sm">{order.customerName}</p>
                                                    <p className="text-xs text-gray-400 truncate max-w-[140px]">{order.customerEmail}</p>
                                                </td>
                                                <td className="px-3 py-3 text-sm text-gray-600 max-w-[150px] truncate">{getProductName(order.productId)}</td>
                                                <td className="px-3 py-3 font-bold text-gray-800 text-sm whitespace-nowrap">${order.total.toLocaleString('es-AR')}</td>
                                                <td className="px-3 py-3">
                                                    <select
                                                        value={order.status}
                                                        onChange={(e) => { e.stopPropagation(); handleChangeStatus(order.id, e.target.value); }}
                                                        onClick={(e) => e.stopPropagation()}
                                                        className={`${getStatusColor(order.status)} border rounded-lg px-2 py-1 text-xs font-bold cursor-pointer focus:ring-2 focus:ring-blue-400 outline-none`}
                                                    >
                                                        {ESTADOS.map(st => (
                                                            <option key={st} value={st}>{getStatusIcon(st)} {st}</option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                                                        order.emailStatus === 'Enviado' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                                    }`}>
                                                        {order.emailStatus === 'Enviado' ? '✉️' : '⏳'} {order.emailStatus}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold ${
                                                        order.paymentStatus === 'Pagado' ? 'bg-green-100 text-green-700' :
                                                        order.paymentStatus === 'Rechazado' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {order.paymentStatus === 'Pagado' ? '💳' : order.paymentStatus === 'Rechazado' ? '❌' : '⏳'} {order.paymentStatus}
                                                    </span>
                                                </td>
                                                <td className="px-3 py-3">
                                                    <div className="flex gap-1 justify-center">
                                                        <button onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                                                            className="text-blue-500 hover:bg-blue-100 p-1.5 rounded-lg transition" title="Ver detalle">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                            </svg>
                                                        </button>
                                                        <button onClick={(e) => { e.stopPropagation(); handleDownloadPDF(order); }}
                                                            className="text-purple-500 hover:bg-purple-100 p-1.5 rounded-lg transition" title="Descargar comprobante">
                                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                        </button>
                                                        {confirmDelete === order.id ? (
                                                            <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                                                <button onClick={() => handleDeleteOrder(order.id)}
                                                                    className="text-xs bg-red-500 text-white px-2 py-1 rounded-lg font-bold hover:bg-red-600">Sí</button>
                                                                <button onClick={() => setConfirmDelete(null)}
                                                                    className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-lg font-bold hover:bg-gray-300">No</button>
                                                            </div>
                                                        ) : (
                                                            <button onClick={(e) => { e.stopPropagation(); setConfirmDelete(order.id); }}
                                                                className="text-red-400 hover:bg-red-100 p-1.5 rounded-lg transition" title="Eliminar">
                                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                </svg>
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* === MOBILE: tarjetas === */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {filteredOrders.length === 0 ? (
                                <div className="p-8 text-center text-gray-400">
                                    <p className="text-4xl mb-2">📭</p>
                                    <p>No hay pedidos con este filtro</p>
                                </div>
                            ) : (
                                filteredOrders.map(order => (
                                    <div
                                        key={order.id}
                                        onClick={() => setSelectedOrder(order)}
                                        className={`p-4 hover:bg-blue-50/50 cursor-pointer transition ${
                                            selectedOrder?.id === order.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                                        }`}
                                    >
                                        {/* Cabecera tarjeta */}
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                <span className="text-gray-400 font-mono text-sm font-bold">#{order.id}</span>
                                                <span className="font-semibold text-gray-800 text-sm">{order.customerName}</span>
                                            </div>
                                            <span className="font-bold text-gray-800 text-sm">${order.total.toLocaleString('es-AR')}</span>
                                        </div>

                                        {/* Info */}
                                        <p className="text-xs text-gray-500 mb-2 truncate">{getProductName(order.productId)}</p>

                                        {/* Badges */}
                                        <div className="flex flex-wrap gap-1.5 mb-3">
                                            <span className={`${getStatusColor(order.status)} border rounded-full px-2 py-0.5 text-xs font-bold`}>
                                                {getStatusIcon(order.status)} {order.status}
                                            </span>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                                                order.emailStatus === 'Enviado' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                            }`}>
                                                {order.emailStatus === 'Enviado' ? '✉️' : '⏳'} {order.emailStatus}
                                            </span>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold ${
                                                order.paymentStatus === 'Pagado' ? 'bg-green-100 text-green-700' :
                                                order.paymentStatus === 'Rechazado' ? 'bg-red-100 text-red-700' :
                                                'bg-yellow-100 text-yellow-700'
                                            }`}>
                                                {order.paymentStatus === 'Pagado' ? '💳' : order.paymentStatus === 'Rechazado' ? '❌' : '⏳'} {order.paymentStatus}
                                            </span>
                                        </div>

                                        {/* Acciones mobile */}
                                        <div className="flex gap-2">
                                            <button onClick={(e) => { e.stopPropagation(); setSelectedOrder(order); }}
                                                className="flex-1 text-xs bg-blue-50 text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-100 transition">
                                                👁️ Ver
                                            </button>
                                            <button onClick={(e) => { e.stopPropagation(); handleDownloadPDF(order); }}
                                                className="flex-1 text-xs bg-purple-50 text-purple-600 font-semibold py-2 rounded-lg hover:bg-purple-100 transition">
                                                📄 PDF
                                            </button>
                                            {confirmDelete === order.id ? (
                                                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                                                    <button onClick={() => handleDeleteOrder(order.id)}
                                                        className="text-xs bg-red-500 text-white px-3 py-2 rounded-lg font-bold">Sí</button>
                                                    <button onClick={() => setConfirmDelete(null)}
                                                        className="text-xs bg-gray-200 text-gray-600 px-3 py-2 rounded-lg font-bold">No</button>
                                                </div>
                                            ) : (
                                                <button onClick={(e) => { e.stopPropagation(); setConfirmDelete(order.id); }}
                                                    className="text-xs bg-red-50 text-red-500 font-semibold py-2 px-3 rounded-lg hover:bg-red-100 transition">
                                                    🗑️
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Panel de detalle */}
                <div className="xl:col-span-1">
                    {selectedOrder ? (
                        <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">
                                Pedido #{selectedOrder.id}
                            </h3>

                            <div className="space-y-4">
                                {/* Cliente */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-400 font-semibold mb-1">👤 Cliente</p>
                                    <p className="font-bold text-gray-800">{selectedOrder.customerName}</p>
                                    <a href={`mailto:${selectedOrder.customerEmail}`} className="text-xs text-blue-500 hover:underline">
                                        {selectedOrder.customerEmail}
                                    </a>
                                </div>

                                {/* Producto */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-400 font-semibold mb-1">📦 Producto</p>
                                    <p className="font-bold text-gray-800">{getProductName(selectedOrder.productId)}</p>
                                    <p className="text-sm text-gray-500">Cantidad: {selectedOrder.quantity} unidades</p>
                                </div>

                                {/* Fecha */}
                                <div className="bg-gray-50 rounded-xl p-4">
                                    <p className="text-xs text-gray-400 font-semibold mb-1">📅 Fecha del pedido</p>
                                    <p className="font-bold text-gray-800">{selectedOrder.orderDate}</p>
                                </div>

                                {/* Email & Pago Status */}
                                <div className="grid grid-cols-2 gap-3">
                                    <div className={`rounded-xl p-3 ${selectedOrder.emailStatus === 'Enviado' ? 'bg-green-50' : 'bg-orange-50'}`}>
                                        <p className="text-xs text-gray-400 font-semibold mb-1">✉️ Email</p>
                                        <span className={`text-sm font-bold ${selectedOrder.emailStatus === 'Enviado' ? 'text-green-700' : 'text-orange-700'}`}>
                                            {selectedOrder.emailStatus}
                                        </span>
                                    </div>
                                    <div className={`rounded-xl p-3 ${selectedOrder.paymentStatus === 'Pagado' ? 'bg-green-50' : selectedOrder.paymentStatus === 'Rechazado' ? 'bg-red-50' : 'bg-yellow-50'}`}>
                                        <p className="text-xs text-gray-400 font-semibold mb-1">💳 Pago</p>
                                        <span className={`text-sm font-bold ${selectedOrder.paymentStatus === 'Pagado' ? 'text-green-700' : selectedOrder.paymentStatus === 'Rechazado' ? 'text-red-700' : 'text-yellow-700'}`}>
                                            {selectedOrder.paymentStatus}
                                        </span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="bg-blue-50 rounded-xl p-4">
                                    <p className="text-xs text-blue-400 font-semibold mb-1">💰 Total</p>
                                    <p className="text-2xl font-extrabold text-blue-700">${selectedOrder.total.toLocaleString('es-AR')}</p>
                                </div>

                                {/* Descargar comprobante */}
                                <button
                                    onClick={() => handleDownloadPDF(selectedOrder)}
                                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-3 px-4 rounded-xl font-bold text-sm transition-all shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Descargar Comprobante PDF
                                </button>

                                {/* Cambiar estado */}
                                <div>
                                    <p className="text-xs text-gray-400 font-semibold mb-2">🔄 Cambiar estado</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {ESTADOS.map(st => (
                                            <button
                                                key={st}
                                                onClick={() => handleChangeStatus(selectedOrder.id, st)}
                                                className={`text-xs font-bold py-2 px-2 rounded-lg border transition-all ${
                                                    selectedOrder.status === st
                                                        ? `${getStatusColor(st)} ring-2 ring-offset-1 ring-blue-400 scale-105`
                                                        : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'
                                                }`}
                                            >
                                                {getStatusIcon(st)} {st}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                            <div className="text-5xl mb-3">📋</div>
                            <h3 className="font-bold text-gray-700 mb-1">Detalle del pedido</h3>
                            <p className="text-sm text-gray-400">Selecciona un pedido de la lista para ver sus detalles y cambiar su estado</p>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageOrders;