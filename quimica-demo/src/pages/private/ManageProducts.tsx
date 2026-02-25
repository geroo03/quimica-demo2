import React, { useState } from 'react';
import { Product } from '../../types';
import { products as productsData } from '../../data/products';
import AdminLayout from '../../components/private/AdminLayout';

const ManageProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>(productsData);
    const [newProduct, setNewProduct] = useState<Product>({
        id: 0,
        name: '',
        price: 0,
        description: '',
        category: '',
        imageUrl: '',
        brand: 'QuimicaPro',
        unit: '',
        stock: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = () => {
        setProducts([...products, { ...newProduct, id: products.length + 1 }]);
        setNewProduct({ id: 0, name: '', price: 0, description: '', category: '', imageUrl: '', brand: 'QuimicaPro', unit: '', stock: 0 });
    };

    const handleDeleteProduct = (id: number) => {
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <AdminLayout>
            <h1 className="text-2xl font-bold mb-6 text-blue-900">Gestión de Productos</h1>
            
            {/* Formulario agregar producto */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Agregar Nuevo Producto</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre del Producto"
                        value={newProduct.name}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Precio"
                        value={newProduct.price}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Categoría"
                        value={newProduct.category}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder="URL de Imagen"
                        value={newProduct.imageUrl}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <textarea
                        name="description"
                        placeholder="Descripción del producto"
                        value={newProduct.description}
                        onChange={handleInputChange}
                        className="border border-gray-300 rounded-lg p-3 w-full md:col-span-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        rows={3}
                    />
                </div>
                <button
                    onClick={handleAddProduct}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                    + Agregar Producto
                </button>
            </div>

            {/* Lista de productos */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Lista de Productos</h2>
                <div className="space-y-3">
                    {products.map(product => (
                        <div key={product.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800">{product.name}</h3>
                                <p className="text-sm text-gray-500">{product.description}</p>
                                <div className="flex gap-4 mt-1">
                                    <span className="text-blue-600 font-semibold">${product.price}</span>
                                    <span className="text-gray-400 text-sm">{product.category}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ManageProducts;