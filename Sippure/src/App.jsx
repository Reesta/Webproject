import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import Welcome from './pages/Welcome.jsx';
import Gallery from './pages/Gallery.jsx';

import Product from './pages/Products.jsx';
import Menu from './pages/Menu.jsx';
import About from './pages/About.jsx';
import WhyChoose from './pages/WhyChoose.jsx';
import Contact from './pages/Contact.jsx';  
import SignUpForm from './pages/SignUp.jsx';  
import SignInForm from './pages/Signin.jsx'; 
import CartForm from './pages/cart.jsx'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Welcome />
      </MainLayout>
    ),
  },
  {
    path: '/gallery',
    element: (
      <MainLayout>
        <Gallery />
      </MainLayout>
    ),
  },
 
  {
    path: '/menu',
    element: (
      <MainLayout>
        <Menu />
      </MainLayout>
    ),
  },
  {
    path: '/whychoose',
    element: (
      <MainLayout>
        <WhyChoose />
      </MainLayout>
    ),
  },
  {
    path: '/contact',
    element: (
      <MainLayout>
        <Contact />
      </MainLayout>
    ),
  },
  {
    path: '/products',
    element: (
      <MainLayout>
        <Product />
      </MainLayout>
    ),
  },
  {
    path: '/about',
    element: (
      <MainLayout>
        <About />
      </MainLayout>
    ),
  },
  {
    path: '/signup',
    element: (
      <MainLayout>
        <SignUpForm />
      </MainLayout>
    ),
  },
  {
    path: '/signin',
    element: (
      <MainLayout>
        <SignInForm />
      </MainLayout>
    ),
  },
  {
    path: '/Cart',
    element: (
      <MainLayout>
        <CartForm />
      </MainLayout>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
