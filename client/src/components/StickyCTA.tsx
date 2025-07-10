import React from 'react';
import { FaRocket } from 'react-icons/fa';

const StickyCTA: React.FC = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300">
        <FaRocket className="inline mr-2" />
        Start Free Trial
      </button>
    </div>
  );
};

export default StickyCTA;
