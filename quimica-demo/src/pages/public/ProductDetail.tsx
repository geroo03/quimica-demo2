import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/public/ProductCard';

const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = products.find((item) => item.id === Number(id));
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [added, setAdded] = useState(false);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="text-center py-20 bg-gray-100 min-h-screen">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-xl text-gray-500 mb-4">Producto no encontrado</p>
                <Link to="/products" className="text-blue-600 hover:underline font-semibold">
                    ← Volver al catálogo
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };

    const handleBuyNow = () => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }
        navigate('/cart');
    };

    const related = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <nav className="text-sm text-gray-500 mb-4">
                    <Link to="/" className="hover:text-blue-600 transition">Inicio</Link>
                    <span className="mx-2">&gt;</span>
                    <Link to="/products" className="hover:text-blue-600 transition">Productos</Link>
                    <span className="mx-2">&gt;</span>
                    <Link to={`/products?cat=${product.category.toLowerCase()}`} className="hover:text-blue-600 transition">{product.category}</Link>
                    <span className="mx-2">&gt;</span>
                    <span className="text-gray-700">{product.name}</span>
                </nav>

                {/* Main card */}
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-0">
                        {/* Image - 2 cols */}
                        <div className="md:col-span-2 p-6 flex items-center justify-center bg-gray-50 border-r border-gray-100">
                            <img
                                src={product.imageUrl}
                                alt={product.name}
                                className="w-full max-w-sm h-64 sm:h-80 object-cover rounded-lg"
                            />
                        </div>

                        {/* Info - 2 cols */}
                        <div className="md:col-span-2 p-6 border-r border-gray-100">
                            <span className="text-xs text-gray-400 uppercase tracking-wider">{product.brand}</span>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1 mb-3">
                                {product.name}
                            </h1>

                            <div className="flex items-center gap-2 mb-4">
                                <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                                    {product.category}
                                </span>
                                <span className="text-xs text-gray-400">| {product.unit}</span>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6">
                                {product.description}
                            </p>

                            {/* Specs */}
                            {product.specs && product.specs.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-800 text-sm mb-2">Características:</h3>
                                    <ul className="space-y-1">
                                        {product.specs.map((spec, i) => (
                                            <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                                                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></span>
                                                {spec}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            <div className="bg-gray-50 rounded-lg p-3 text-sm">
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <span className="text-gray-400 text-xs">Presentación</span>
                                        <p className="font-semibold text-gray-700">{product.unit}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-400 text-xs">Marca</span>
                                        <p className="font-semibold text-gray-700">{product.brand}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Buy panel - 1 col */}
                        <div className="md:col-span-1 p-6 bg-gray-50">
                            <div className="sticky top-24 space-y-4">
                                <div>
                                    <p className="text-3xl font-bold text-gray-900">
                                        ${product.price.toLocaleString('es-AR')}
                                    </p>
                                    <p className="text-xs text-green-600 font-semibold mt-1">
                                        Hasta 12 cuotas sin interés
                                    </p>
                                </div>

                                <p className="text-sm text-green-600 flex items-center gap-1">
                                    🚚 Envío gratis a todo el país
                                </p>

                                <div>
                                    {product.stock > 0 ? (
                                        <p className="text-sm font-semibold text-green-700">
                                            Stock disponible ({product.stock} unidades)
                                        </p>
                                    ) : (
                                        <p className="text-sm font-semibold text-red-600">Sin stock</p>
                                    )}
                                </div>

                                {/* Quantity */}
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Cantidad:</label>
                                    <div className="flex items-center border border-gray-200 rounded w-28">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                                        >-</button>
                                        <span className="flex-1 text-center py-1 text-sm font-semibold">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition"
                                        >+</button>
                                    </div>
                                </div>

                                <button
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition disabled:opacity-50"
                                >
                                    Comprar ahora
                                </button>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={added || product.stock === 0}
                                    className={`w-full font-bold py-3 rounded-md transition border ${
                                        added
                                            ? 'bg-green-50 border-green-500 text-green-700'
                                            : 'bg-white border-blue-600 text-blue-600 hover:bg-blue-50'
                                    }`}
                                >
                                    {added ? '✓ ¡Agregado!' : 'Agregar al carrito'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related products */}
                {related.length > 0 && (
                    <section className="mt-10">
                        <h2 className="text-lg font-bold text-gray-800 mb-4">Productos relacionados</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
                            {related.map(p => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default ProductDetail;