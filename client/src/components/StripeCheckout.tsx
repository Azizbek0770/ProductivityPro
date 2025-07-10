import React from 'react';

interface StripeCheckoutProps {
  plan: 'standard' | 'pro';
  onSuccess: () => void;
}

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ plan, onSuccess }) => {
  const handleCheckout = async () => {
    // This is a placeholder for Stripe integration
    // In production, redirect to Stripe Checkout session
    alert(`Simulating Stripe checkout for ${plan} plan. Replace with real Stripe integration.`);
    onSuccess();
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full py-2 px-4 rounded-lg font-medium bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg transition-all duration-300"
    >
      Upgrade to {plan.charAt(0).toUpperCase() + plan.slice(1)}
    </button>
  );
};

export default StripeCheckout;
