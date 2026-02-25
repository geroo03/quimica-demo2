import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { MessagesProvider } from './context/MessagesContext';
import { NotificationsProvider } from './context/NotificationsContext';
import './styles/index.css';

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <MessagesProvider>
          <NotificationsProvider>
            <Router>
              <div className="flex flex-col min-h-screen bg-gray-50">
                <Header />
                <main className="flex-grow">
                  <Routes />
                </main>
                <Footer />
              </div>
            </Router>
          </NotificationsProvider>
        </MessagesProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;