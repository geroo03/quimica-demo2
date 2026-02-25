import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

const Hero: React.FC = () => {
    return (
        <div>
            {/* Banner principal */}
            <div className="bg-gradient-to-r from-blue-800 to-blue-600 text-white">
                <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1">
                            <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">ENVÍO GRATIS</span>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mt-4 mb-4 leading-tight">
                                Productos de Limpieza<br />
                                <span className="text-yellow-400">al Mejor Precio</span>
                            </h1>
                            <p className="text-blue-100 text-sm sm:text-base max-w-lg mb-6">
                                Lavandinas, detergentes, desinfectantes y más. Todo lo que tu empresa necesita con entrega rápida en todo el país.
                            </p>
                            <div className="flex gap-3">
                                <Link
                                    to="/products"
                                    className="bg-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg hover:bg-yellow-300 transition shadow-lg"
                                >
                                    Ver Ofertas
                                </Link>
                                <Link
                                    to="/contact"
                                    className="border-2 border-white text-white font-bold py-3 px-6 rounded-lg hover:bg-white hover:text-blue-800 transition"
                                >
                                    Cotizar
                                </Link>
                            </div>
                        </div>
                        <div className="hidden md:block flex-1">
                            <img
                                src="https://images.unsplash.com/photo-1563213126-a4273aed2016?w=600"
                                alt="Productos químicos"
                                className="rounded-2xl shadow-2xl max-w-md w-full object-cover h-72"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Categorías */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4">
                        {categories.map((cat) => (
                            <Link
                                key={cat.id}
                                to={`/products?cat=${cat.slug}`}
                                className="flex flex-col items-center p-3 rounded-xl hover:bg-blue-50 hover:shadow-md transition group"
                            >
                                <span className="text-3xl sm:text-4xl mb-2 group-hover:scale-110 transition-transform">{cat.icon}</span>
                                <span className="text-xs sm:text-sm font-semibold text-gray-700 text-center">{cat.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Beneficios */}
            <div className="bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center gap-3 p-3">
                            <span className="text-2xl">�</span>
                            <div>
                                <p className="font-bold text-sm text-gray-800">Envío Gratis</p>
                                <p className="text-xs text-gray-500">En compras +$10.000</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3">
                            <span className="text-2xl">🛡️</span>
                            <div>
                                <p className="font-bold text-sm text-gray-800">Calidad Certificada</p>
                                <p className="text-xs text-gray-500">Aprobado ANMAT</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3">
                            <span className="text-2xl">�</span>
                            <div>
                                <p className="font-bold text-sm text-gray-800">Pagá en Cuotas</p>
                                <p className="text-xs text-gray-500">Hasta 12 cuotas</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3">
                            <span className="text-2xl">⭐</span>
                            <div>
                                <p className="font-bold text-sm text-gray-800">+1000 Clientes</p>
                                <p className="text-xs text-gray-500">Confían en nosotros</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;