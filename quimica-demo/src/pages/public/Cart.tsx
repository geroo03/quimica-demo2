import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center py-16 px-8 bg-white rounded-lg shadow-sm max-w-md">
          <p className="text-5xl mb-4">🛒</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Tu carrito está vacío</h1>
          <p className="text-gray-500 mb-6">¡Descubrí los mejores productos de limpieza y desinfección!</p>
          <Link to="/products" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-semibold transition">
            Ir a comprar
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">
          Carrito de compras ({cart.reduce((acc, item) => acc + item.quantity, 0)} productos)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products */}
          <div className="lg:col-span-2 space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex gap-4">
                  <Link to={`/products/${item.id}`}>
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md shrink-0" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${item.id}`} className="hover:text-blue-600 transition">
                      <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">{item.name}</h3>
                    </Link>
                    <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                    <p className="text-xs text-green-600 mt-1">🚚 Envío gratis</p>

                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-gray-200 rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition text-sm"
                        >-</button>
                        <span className="px-3 py-1 text-sm font-semibold border-x border-gray-200">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition text-sm"
                        >+</button>
                      </div>

                      <p className="text-lg font-bold text-gray-900">
                        ${(item.price * item.quantity).toLocaleString('es-AR')}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 self-start transition shrink-0"
                    title="Eliminar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="text-sm text-red-500 hover:text-red-700 transition font-medium"
            >
              Vaciar carrito
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-5 sticky top-24">
              <h2 className="font-bold text-gray-800 mb-4">Resumen de compra</h2>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Productos ({cart.reduce((acc, item) => acc + item.quantity, 0)})</span>
                  <span>${getCartTotal().toLocaleString('es-AR')}</span>
                </div>
                <div className="flex justify-between text-green-600">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
              </div>

              <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900 mb-5">
                <span>Total</span>
                <span>${getCartTotal().toLocaleString('es-AR')}</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition"
              >
                Continuar compra
              </button>

              <Link to="/products" className="block text-center mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium transition">
                ← Seguir comprando
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
