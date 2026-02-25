import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const { addToCart } = useCart();
    const [added, setAdded] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    };

    return (
        <Link to={`/products/${product.id}`} className="block group">
            <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
                {/* Image */}
                <div className="relative overflow-hidden">
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-40 sm:h-44 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.featured && (
                        <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            DESTACADO
                        </span>
                    )}
                    {product.stock > 0 && product.stock <= 50 && (
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                            ÚLTIMAS UNIDADES
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">{product.brand}</p>
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800 group-hover:text-blue-600 transition line-clamp-2 mb-2 flex-1">
                        {product.name}
                    </h2>

                    {/* Price */}
                    <div className="mb-2">
                        <p className="text-lg sm:text-xl font-bold text-gray-900">
                            ${product.price.toLocaleString('es-AR')}
                        </p>
                        <p className="text-xs text-green-600 font-semibold">
                            Hasta 12 cuotas sin interés
                        </p>
                    </div>

                    {/* Shipping */}
                    <p className="text-xs text-green-600 mb-3 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"/>
                            <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-5a1 1 0 00-.293-.707l-3-3A1 1 0 0016 4H3z"/>
                        </svg>
                        Envío gratis
                    </p>

                    {/* Add to cart */}
                    <button
                        onClick={handleAddToCart}
                        disabled={added}
                        className={`w-full py-2 rounded-md text-xs sm:text-sm font-semibold transition-all duration-200 ${
                            added
                                ? 'bg-green-500 text-white'
                                : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95'
                        }`}
                    >
                        {added ? '✓ ¡Agregado!' : 'Agregar al carrito'}
                    </button>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;