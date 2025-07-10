import React, { useEffect, useState } from 'react';
import { FaRocket } from 'react-icons/fa';

const OnboardingModal: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('onboarded')) {
      setTimeout(() => setOpen(true), 600);
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    localStorage.setItem('onboarded', '1');
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-md w-full text-center animate-fade-in">
        <FaRocket className="text-4xl text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Welcome to ProductivityPro!</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">Explore 12 powerful tools, upgrade your plan, and supercharge your productivity. Start by trying any unlocked tool below!</p>
        <button onClick={handleClose} className="mt-2 px-6 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90 transition-all">Get Started</button>
      </div>
    </div>
  );
};

export default OnboardingModal;
