import { Route, Routes } from 'react-router-dom';
import Home from '../pages/public/Home';
import Products from '../pages/public/Products';
import ProductDetail from '../pages/public/ProductDetail';
import SearchResults from '../pages/public/SearchResults';
import About from '../pages/public/About';
import Contact from '../pages/public/Contact';
import Cart from '../pages/public/Cart';
import Checkout from '../pages/public/Checkout';
import AdminDashboard from '../pages/private/AdminDashboard';
import ManageProducts from '../pages/private/ManageProducts';
import ManageOrders from '../pages/private/ManageOrders';
import ManageMessages from '../pages/private/ManageMessages';
import Comprobantes from '../pages/private/Comprobantes';
import Login from '../pages/private/Login';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/buscar" element={<SearchResults />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/manage-products" element={<ManageProducts />} />
            <Route path="/admin/manage-orders" element={<ManageOrders />} />
            <Route path="/admin/messages" element={<ManageMessages />} />
            <Route path="/admin/comprobantes" element={<Comprobantes />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default AppRoutes;