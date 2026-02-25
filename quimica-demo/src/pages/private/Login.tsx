import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const success = login(email, password);
        if (success) {
            navigate('/admin');
        } else {
            setError('Email o contraseña inválidos');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-900">Iniciar Sesión</h2>
                {error && <p className="text-red-500 mb-4 text-center bg-red-50 p-2 rounded">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2 font-semibold" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="admin@quimica.com"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 mb-2 font-semibold" htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border rounded w-full py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="1234"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-lg py-3 w-full hover:bg-blue-700 font-bold transition"
                    >
                        Ingresar
                    </button>
                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    <p>Usuarios de prueba:</p>
                    <p className="mt-2"><strong>Admin:</strong> admin@quimica.com / 1234</p>
                    <p><strong>Empleado:</strong> empleado@quimica.com / 1234</p>
                </div>
            </div>
        </div>
    );
};

export default Login;