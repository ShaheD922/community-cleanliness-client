import React from 'react';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';

const HomeLayout = () => {
    return (
        <div>
      <header>
        <Header />
        <nav className="w-11/12 mx-auto my-4">
          <Navbar />
        </nav>
      </header>

      <main className="w-11/12 mx-auto my-4">
        <section>
          <Outlet />
        </section>
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
    );
};

export default HomeLayout;