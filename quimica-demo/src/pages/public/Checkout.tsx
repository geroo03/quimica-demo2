import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const Checkout: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'transferencia'>('mercadopago');
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulación de procesamiento de pago
    setTimeout(() => {
      setProcessing(false);
      clearCart();
      alert('¡Pedido realizado con éxito! Recibirás un email de confirmación.');
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Información de Contacto */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Información de Contacto</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre Completo *"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="border p-3 rounded"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="border p-3 rounded"
                />
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono *"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  className="border p-3 rounded md:col-span-2"
                />
              </div>
            </div>

            {/* Dirección de Envío */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Dirección de Envío</h2>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  name="direccion"
                  placeholder="Dirección *"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  required
                  className="border p-3 rounded"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="ciudad"
                    placeholder="Ciudad *"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    required
                    className="border p-3 rounded"
                  />
                  <input
                    type="text"
                    name="codigoPostal"
                    placeholder="Código Postal *"
                    value={formData.codigoPostal}
                    onChange={handleInputChange}
                    required
                    className="border p-3 rounded"
                  />
                </div>
              </div>
            </div>

            {/* Método de Pago */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold mb-4">Método de Pago</h2>
              <div className="space-y-3">
                <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="mercadopago"
                    checked={paymentMethod === 'mercadopago'}
                    onChange={() => setPaymentMethod('mercadopago')}
                    className="mr-3"
                  />
                  <div className="flex-grow">
                    <div className="font-bold">Mercado Pago</div>
                    <div className="text-sm text-gray-600">Paga con tarjeta de crédito/débito</div>
                  </div>
                  <span className="text-2xl">💳</span>
                </label>
                
                <label className="flex items-center p-4 border rounded cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="transferencia"
                    checked={paymentMethod === 'transferencia'}
                    onChange={() => setPaymentMethod('transferencia')}
                    className="mr-3"
                  />
                  <div className="flex-grow">
                    <div className="font-bold">Transferencia Bancaria</div>
                    <div className="text-sm text-gray-600">Recibirás los datos por email</div>
                  </div>
                  <span className="text-2xl">🏦</span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={processing}
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition text-lg font-bold disabled:bg-gray-400"
            >
              {processing ? 'Procesando...' : `Confirmar Pedido - $${getCartTotal().toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Resumen del Pedido */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow sticky top-4">
            <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Envío:</span>
                <span className="text-green-600">Gratis</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
