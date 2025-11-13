import React from 'react';
import Header from '../Components/Header';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import { ToastContainer } from 'react-toastify';

const AuthLayout = () => {
    return (
       <div className="bg-base-200 min-h-screen">
      <header className="w-11/12 mx-auto py-4">
        <Header />
      </header>
      <main className="w-11/12 mx-auto py-5">
        <Outlet />
      </main>
      <Footer />
    
      <ToastContainer   position="top-right" autoClose={3000} />
    </div>
    );
};

export default AuthLayout;