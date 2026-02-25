import React, { useState } from 'react';
import AdminLayout from '../../components/private/AdminLayout';
import { orders } from '../../data/orders';
import { products } from '../../data/products';
import { Order } from '../../types';
import jsPDF from 'jspdf';

const Comprobantes: React.FC = () => {
    const [notification, setNotification] = useState('');

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
        setNotification(`Comprobante #${order.id} descargado como PDF`);
        setTimeout(() => setNotification(''), 2500);
    };

    const paidOrders = orders.filter(o => o.paymentStatus === 'Pagado');
    const totalPaid = paidOrders.reduce((sum, o) => sum + o.total, 0);

    return (
        <AdminLayout>
            {/* Notification */}
            {notification && (
                <div className="fixed top-20 right-6 z-50 bg-green-600 text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce text-sm font-semibold">
                    {notification}
                </div>
            )}

            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-blue-900">📄 Comprobantes de Venta</h1>
                <p className="text-gray-500 mt-1">Descarga los comprobantes de las ventas realizadas</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-green-400">
                    <p className="text-xs font-semibold text-gray-400 uppercase">Ventas Pagadas</p>
                    <p className="text-3xl font-extrabold text-green-600 mt-1">{paidOrders.length}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-blue-400">
                    <p className="text-xs font-semibold text-gray-400 uppercase">Total Facturado</p>
                    <p className="text-3xl font-extrabold text-blue-600 mt-1">${totalPaid.toLocaleString('es-AR')}</p>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-5 border-l-4 border-purple-400">
                    <p className="text-xs font-semibold text-gray-400 uppercase">Total Comprobantes</p>
                    <p className="text-3xl font-extrabold text-purple-600 mt-1">{orders.length}</p>
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-6 py-4">
                    <h2 className="text-white font-bold">Lista de Comprobantes</h2>
                </div>

                {/* Table header */}
                <div className="hidden sm:grid grid-cols-12 gap-2 bg-blue-50 px-6 py-3 text-xs font-bold text-blue-900 uppercase tracking-wide">
                    <div className="col-span-2">Nro.</div>
                    <div className="col-span-2">Fecha</div>
                    <div className="col-span-2">Cliente</div>
                    <div className="col-span-2">Producto</div>
                    <div className="col-span-1">Total</div>
                    <div className="col-span-1">Pago</div>
                    <div className="col-span-2">Acciones</div>
                </div>

                {/* Rows */}
                {orders.map(order => (
                    <div
                        key={order.id}
                        className="grid grid-cols-1 sm:grid-cols-12 gap-2 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition items-center"
                    >
                        <div className="sm:col-span-2">
                            <span className="font-mono text-sm font-bold text-gray-700">COMP-{order.id}</span>
                        </div>
                        <div className="sm:col-span-2 text-sm text-gray-600">
                            {order.orderDate}
                        </div>
                        <div className="sm:col-span-2">
                            <p className="font-semibold text-gray-800 text-sm truncate">{order.customerName}</p>
                            <p className="text-xs text-gray-400 truncate">{order.customerEmail}</p>
                        </div>
                        <div className="sm:col-span-2 text-sm text-gray-600 truncate">
                            {getProductName(order.productId)}
                        </div>
                        <div className="sm:col-span-1 font-bold text-gray-800 text-sm">
                            ${order.total.toLocaleString('es-AR')}
                        </div>
                        <div className="sm:col-span-1">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-bold ${
                                order.paymentStatus === 'Pagado' ? 'bg-green-100 text-green-700' :
                                order.paymentStatus === 'Rechazado' ? 'bg-red-100 text-red-700' :
                                'bg-yellow-100 text-yellow-700'
                            }`}>
                                {order.paymentStatus}
                            </span>
                        </div>
                        <div className="sm:col-span-2 flex gap-2">
                            <button
                                onClick={() => handleDownloadPDF(order)}
                                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-2 px-4 rounded-lg text-xs font-bold transition-all shadow-md"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Descargar
                            </button>
                        </div>
                    </div>
                ))}

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-3 text-center">
                    <p className="text-xs text-gray-400">
                        Mostrando {orders.length} comprobantes | Los comprobantes se generan en formato texto simulado
                    </p>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Comprobantes;
