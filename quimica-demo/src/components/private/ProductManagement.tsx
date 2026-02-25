import React, { useState } from 'react';
import { Product } from '../../types';
import { products as productsData } from '../../data/products';

const ProductManagement: React.FC = () => {
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
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Product Management</h1>
            <div className="mb-4">
                <h2 className="text-xl font-semibold">Add New Product</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={newProduct.description}
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={newProduct.imageUrl}
                    onChange={handleInputChange}
                    className="border p-2 mb-2 w-full"
                />
                <button
                    onClick={handleAddProduct}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Add Product
                </button>
            </div>
            <h2 className="text-xl font-semibold mb-2">Product List</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id} className="flex justify-between items-center border-b py-2">
                        <div>
                            <h3 className="font-bold">{product.name}</h3>
                            <p>{product.description}</p>
                            <p className="text-gray-500">${product.price}</p>
                        </div>
                        <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="bg-red-500 text-white p-1 rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductManagement;