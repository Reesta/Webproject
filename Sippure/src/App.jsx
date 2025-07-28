import { Navigate, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Slide from './pages/Slide.jsx';
import Gallery from './pages/Gallery.jsx';
import Product from './pages/Products.jsx';

import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import SignUpForm from './pages/SignUp.jsx';
import SignInForm from './pages/Signin.jsx';

// Protected User Pages
import CartForm from './pages/cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Myprofile from './pages/Myprofile.jsx';
import Accountsetting from './pages/Accountsetting.jsx';

// Admin Pages
import Adminlogin from './pages/Adminlogin.jsx';
import Admindashboard from './pages/Admindashboard.jsx';
import Admindprofile from './pages/AdminProfile.jsx';
import Admindsetting from './pages/Adminsetting.jsx';


// Auth Guards
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem('userRole') === 'admin';
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  const token = localStorage.getItem('token');
  
  console.log('Admin Route Check:', { isAdmin, isAuthenticated, token }); // Debug log
  
  if (!isAuthenticated || !token) {
    console.log('Not authenticated, redirecting to login'); // Debug log
    return <Navigate to="/adminlogin" replace />;
  }
  
  if (!isAdmin) {
    console.log('Not admin, redirecting to home'); // Debug log
    return <Navigate to="/" replace />;
  }
  
  return children;
};


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout><Slide /></MainLayout>} />
      <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
      
      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
      <Route path="/products" element={<MainLayout><Product /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/signup" element={<MainLayout><SignUpForm /></MainLayout>} />
      <Route path="/signin" element={<MainLayout><SignInForm /></MainLayout>} />
      <Route path="/adminlogin" element={<Adminlogin />} />


      {/* Protected User Routes */}
      <Route path="/cart" element={
        <ProtectedRoute>
          <MainLayout><CartForm /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/checkout" element={
        <ProtectedRoute>
          <MainLayout><Checkout /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/myprofile" element={
        <ProtectedRoute>
          <MainLayout><Myprofile /></MainLayout>
        </ProtectedRoute>
      } />
      <Route path="/accountsetting" element={
        <ProtectedRoute>
          <MainLayout><Accountsetting /></MainLayout>
        </ProtectedRoute>
      } />

      {/* Protected Admin Routes */}
      <Route path="/admindashboard" element={
        <AdminRoute>
          <AdminLayout>
            <Admindashboard />
          </AdminLayout>
        </AdminRoute>
      } />
      <Route path="/adminprofile" element={
        <AdminRoute>
          <AdminLayout>
            <Admindprofile />
          </AdminLayout>
        </AdminRoute>
      } />
      <Route path="/adminsetting" element={
        <AdminRoute>
          <AdminLayout>
            <Admindsetting />
          </AdminLayout>
        </AdminRoute>
      } />
      



      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;