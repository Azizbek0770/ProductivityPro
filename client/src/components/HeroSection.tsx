import React from 'react';
import { FaRocket, FaPlay } from 'react-icons/fa';
import { useToast } from '../hooks/use-toast';

const HeroSection: React.FC = () => {
  const { toast } = useToast();

  const handleStartTrial = () => {
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
    }
    toast({
      title: "Let's Get Started!",
      description: "Choose your plan below to begin your productivity journey",
      duration: 3000,
    });
  };

  const handleWatchDemo = () => {
    toast({
      title: "Demo Mode Activated",
      description: "Scroll down to interact with all the live demos and features!",
      duration: 4000,
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <div className="animate-float mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-white/30 backdrop-blur-md rounded-2xl shadow-xl flex items-center justify-center">
            <FaRocket className="text-3xl text-primary" />
          </div>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
          The Ultimate{' '}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Productivity Platform
          </span>
        </h1>
        <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Supercharge your workflow with AI-powered tools, smart automation, and seamless collaboration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handleStartTrial}
            className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            Start Free Trial
          </button>
          <button 
            onClick={handleWatchDemo}
            className="bg-white/25 backdrop-blur-[10px] border border-white/18 text-foreground px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <FaPlay className="inline mr-2" />
            Watch Demo
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
