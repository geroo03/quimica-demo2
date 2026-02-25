import React from 'react';
import Sidebar from './Sidebar';
import ProductManagement from './ProductManagement';
import OrderList from './OrderList';

const Dashboard: React.FC = () => {
    return (
        <div className="flex">
            <Sidebar />
            <main className="flex-1 p-6">
                <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProductManagement />
                    <OrderList />
                </div>
            </main>
        </div>
    );
};

export default Dashboard;