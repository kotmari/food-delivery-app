import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { ShoppingCardsPage } from './pages/ShoppingCardsPage';
import { ShoppingCardsDetailsPage } from './pages/ShoppingCardsDetailsPage';
import { Header } from './components/Header';
import { OrdersPage } from './pages/OrdersPage';
import { Toaster } from 'react-hot-toast';


export default function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/products" element={<ShoppingCardsPage />} />
          <Route path="/products/:id" element={<ShoppingCardsDetailsPage />} />
        </Route>

        <Route 
          path="/orders" 
          element={
            <div className="flex h-screen flex-col bg-bg">
              <Header />
              <div className="flex-1 overflow-y-auto p-4 sm:p-8">
                <OrdersPage /> 
              </div>
            </div>
          } 
        />

        <Route path="/" element={<Navigate to="/products" replace />} />
      </Routes>
    </Router>
    <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
