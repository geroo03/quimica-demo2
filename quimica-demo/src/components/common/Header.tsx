import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Header: React.FC = () => {
    const { getCartCount } = useCart();
    const { user, isAuthenticated, logout } = useAuth();
    const cartCount = getCartCount();
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [mobileMenu, setMobileMenu] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/buscar?q=${encodeURIComponent(search.trim())}`);
            setSearch('');
        }
    };

    return (
        <header className="bg-yellow-400 shadow-md sticky top-0 z-50">
            {/* Top bar */}
            <div className="bg-gray-800 text-gray-300 text-xs">
                <div className="max-w-7xl mx-auto px-4 py-1 flex justify-between items-center">
                    <span>📍 Envíos a todo el país | 🕐 Lun-Vie 8 a 18hs</span>
                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <Link to="/admin" className="hover:text-white transition">👤 {user?.name}</Link>
                                <button onClick={logout} className="hover:text-white transition">Salir</button>
                            </>
                        ) : (
                            <Link to="/login" className="hover:text-white transition">Ingresá</Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Main header */}
            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex items-center gap-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 shrink-0">
                        <span className="text-3xl">🧪</span>
                        <div className="hidden sm:block">
                            <h1 className="text-gray-900 font-extrabold text-xl leading-tight">QuímicaPro</h1>
                            <p className="text-[10px] text-gray-700 -mt-0.5">Limpieza & Desinfección</p>
                        </div>
                    </Link>

                    {/* Search bar */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
                        <div className="flex">
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Buscar productos, marcas y más..."
                                className="flex-1 px-4 py-2.5 rounded-l-md border-0 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                            />
                            <button
                                type="submit"
                                className="bg-gray-800 hover:bg-gray-700 text-white px-5 rounded-r-md transition"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Cart */}
                    <Link to="/cart" className="relative p-2 hover:bg-yellow-500 rounded-lg transition shrink-0">
                        <svg className="w-7 h-7 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white font-bold text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="md:hidden p-2 hover:bg-yellow-500 rounded-lg transition"
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Navigation bar */}
            <div className="bg-gray-800 text-white hidden md:block">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex items-center gap-1 py-1 text-sm">
                        <Link to="/" className="px-3 py-2 rounded hover:bg-gray-700 transition">Inicio</Link>
                        <Link to="/products" className="px-3 py-2 rounded hover:bg-gray-700 transition">Productos</Link>
                        <Link to="/about" className="px-3 py-2 rounded hover:bg-gray-700 transition">Nosotros</Link>
                        <Link to="/contact" className="px-3 py-2 rounded hover:bg-gray-700 transition">Contacto</Link>
                    </nav>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenu && (
                <div className="md:hidden bg-gray-800 text-white border-t border-gray-700">
                    <nav className="flex flex-col px-4 py-2 text-sm">
                        <Link to="/" onClick={() => setMobileMenu(false)} className="py-3 border-b border-gray-700 hover:text-yellow-400 transition">Inicio</Link>
                        <Link to="/products" onClick={() => setMobileMenu(false)} className="py-3 border-b border-gray-700 hover:text-yellow-400 transition">Productos</Link>
                        <Link to="/about" onClick={() => setMobileMenu(false)} className="py-3 border-b border-gray-700 hover:text-yellow-400 transition">Nosotros</Link>
                        <Link to="/contact" onClick={() => setMobileMenu(false)} className="py-3 hover:text-yellow-400 transition">Contacto</Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;