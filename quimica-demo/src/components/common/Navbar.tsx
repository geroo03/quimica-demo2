import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-blue-600 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-bold">
                    Quimica Store
                </Link>
                <div className="space-x-4">
                    <Link to="/" className="text-white hover:text-gray-200">Home</Link>
                    <Link to="/products" className="text-white hover:text-gray-200">Products</Link>
                    <Link to="/about" className="text-white hover:text-gray-200">About</Link>
                    <Link to="/contact" className="text-white hover:text-gray-200">Contact</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;