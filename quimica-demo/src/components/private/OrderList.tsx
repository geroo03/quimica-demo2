import React from 'react';
import { useEffect, useState } from 'react';
import { Order } from '../../types';
import { orders as ordersData } from '../../data/orders';
import { products } from '../../data/products';

const OrderList: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        setOrders(ordersData);
    }, []);

    const getProductName = (productId: number) => {
        const product = products.find(p => p.id === productId);
        return product ? product.name : 'Producto no encontrado';
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Lista de Pedidos</h1>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="py-3 px-4 text-left">ID</th>
                            <th className="py-3 px-4 text-left">Cliente</th>
                            <th className="py-3 px-4 text-left">Email</th>
                            <th className="py-3 px-4 text-left">Producto</th>
                            <th className="py-3 px-4 text-left">Cantidad</th>
                            <th className="py-3 px-4 text-left">Total</th>
                            <th className="py-3 px-4 text-left">Fecha</th>
                            <th className="py-3 px-4 text-left">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="border-b hover:bg-gray-50">
                                <td className="py-3 px-4">{order.id}</td>
                                <td className="py-3 px-4">{order.customerName}</td>
                                <td className="py-3 px-4 text-sm text-gray-600">{order.customerEmail}</td>
                                <td className="py-3 px-4">{getProductName(order.productId)}</td>
                                <td className="py-3 px-4">{order.quantity}</td>
                                <td className="py-3 px-4 font-bold">${order.total.toFixed(2)}</td>
                                <td className="py-3 px-4 text-sm">{order.orderDate}</td>
                                <td className="py-3 px-4">
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                        order.status === 'Entregado' ? 'bg-green-100 text-green-800' :
                                        order.status === 'Enviado' ? 'bg-blue-100 text-blue-800' :
                                        order.status === 'Pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-red-100 text-red-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderList;