"use client";

import React, { useState, useEffect } from 'react';

const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  },  [toggleVisibility]);
  
  return (
    <div className="fixed bottom-9 right-5 z-50">
      {isVisible && (
        <button 
          type="button"
          onClick={scrollToTop}
          className="bg-primary hover:bg-primary-105 text-white p-2 rounded-full h-12 w-12 flex items-center justify-center shadow-lg transition-transform transform hover:scale-110"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default ScrollToTop;
