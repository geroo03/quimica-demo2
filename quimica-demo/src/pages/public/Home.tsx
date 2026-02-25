import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../../components/public/Hero';
import ProductCard from '../../components/public/ProductCard';
import { products } from '../../data/products';

const Home: React.FC = () => {
    const featured = products.filter(p => p.featured);
    const recentProducts = products.slice(0, 8);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Hero />

            {/* Productos Destacados */}
            <section className="max-w-7xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">⭐ Productos Destacados</h2>
                    <Link to="/products" className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                        Ver todos →
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                    {featured.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Más productos */}
            <section className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">🛒 Más Productos</h2>
                    <Link to="/products" className="text-blue-600 hover:text-blue-800 text-sm font-semibold">
                        Ver catálogo completo →
                    </Link>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
                    {recentProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </section>

            {/* Banner CTA */}
            <section className="max-w-7xl mx-auto px-4 py-8 mb-8">
                <div className="bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-8 sm:p-12 text-white text-center">
                    <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">¿Necesitás un presupuesto mayorista?</h2>
                    <p className="text-blue-200 mb-6 max-w-xl mx-auto">
                        Hacemos precios especiales para empresas, instituciones y revendedores. Contactanos y te cotizamos en el día.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-lg hover:bg-yellow-300 transition shadow-lg"
                    >
                        Solicitar Cotización
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Home;