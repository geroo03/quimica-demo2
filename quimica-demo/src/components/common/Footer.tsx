import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Top section */}
            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-2xl">🧪</span>
                            <span className="text-white font-bold text-xl">QuímicaPro</span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                            Productos químicos de limpieza y desinfección para industrias, comercios y hogares. Calidad garantizada.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Navegación</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="hover:text-yellow-400 transition">Inicio</Link></li>
                            <li><Link to="/products" className="hover:text-yellow-400 transition">Productos</Link></li>
                            <li><Link to="/about" className="hover:text-yellow-400 transition">Nosotros</Link></li>
                            <li><Link to="/contact" className="hover:text-yellow-400 transition">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Categorías</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/products" className="hover:text-yellow-400 transition">Lavandinas</Link></li>
                            <li><Link to="/products" className="hover:text-yellow-400 transition">Detergentes</Link></li>
                            <li><Link to="/products" className="hover:text-yellow-400 transition">Desinfectantes</Link></li>
                            <li><Link to="/products" className="hover:text-yellow-400 transition">Ácidos</Link></li>
                            <li><Link to="/products" className="hover:text-yellow-400 transition">Solventes</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-3">Contacto</h4>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center gap-2">📍 Buenos Aires, Argentina</li>
                            <li className="flex items-center gap-2">📞 +54 11 1234-5678</li>
                            <li className="flex items-center gap-2">✉️ ventas@quimicapro.com</li>
                            <li className="flex items-center gap-2">🕐 Lun-Vie 8:00 - 18:00</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-700">
                <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} QuímicaPro. Todos los derechos reservados.</p>
                    <p className="mt-2 sm:mt-0">Demo educativa — Sin transacciones reales</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;