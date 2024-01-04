import React from 'react';
import Footer from '@/components/core/footer';
import HomePage from '@/components/pages/home';

const Custom404 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <HomePage />

      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-lg mb-4">Could not find the requested resource.</p>
        <Link href="/">
          <a className="text-blue-500 hover:underline">Return Home</a>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default Custom404;