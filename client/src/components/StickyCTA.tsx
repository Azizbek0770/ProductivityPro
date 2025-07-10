import React from 'react';
import { FaRocket } from 'react-icons/fa';
import { useToast } from '../hooks/use-toast';

const StickyCTA: React.FC = () => {
  const { toast } = useToast();

  const handleUpgrade = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: "Ready to Upgrade?",
      description: "Choose your perfect plan below!",
      duration: 3000,
    });
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <button 
        onClick={handleUpgrade}
        className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
      >
        <FaRocket className="inline mr-2" />
        Start Free Trial
      </button>
    </div>
  );
};

export default StickyCTA;
