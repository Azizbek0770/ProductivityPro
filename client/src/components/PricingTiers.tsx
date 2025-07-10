import React from 'react';
import { FaCheck, FaTimes, FaCrown } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import { useToast } from '../hooks/use-toast';
import { useSubscription } from '../context/SubscriptionContext';
import StripeCheckout from './StripeCheckout';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: { name: string; included: boolean }[];
  popular?: boolean;
  buttonText: string;
  buttonStyle: string;
  tierValue: 'basic' | 'standard' | 'pro';
}

const PricingTiers: React.FC = () => {
  const { tier, setTier } = useSubscription();
  const { toast } = useToast();

  const plans: PricingPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 0,
      period: 'month',
      description: 'Perfect for getting started',
      features: [
        { name: 'Pomodoro timer', included: true },
        { name: 'Time tracker', included: true },
        { name: 'Basic tools only', included: true },
        { name: 'Task management', included: false },
        { name: 'Smart notes', included: false },
        { name: 'Analytics dashboard', included: false }
      ],
      buttonText: 'Current Plan',
      buttonStyle: 'bg-white/25 backdrop-blur-[10px] border border-white/18 text-foreground',
      tierValue: 'basic'
    },
    {
      id: 'standard',
      name: 'Standard',
      price: 9,
      period: 'month',
      description: 'For productivity enthusiasts',
      features: [
        { name: 'Everything in Basic', included: true },
        { name: 'Task management', included: true },
        { name: 'Smart notes', included: true },
        { name: 'Calendar integration', included: true },
        { name: 'Habit tracker', included: true },
        { name: 'AI features', included: false }
      ],
      popular: true,
      buttonText: 'Upgrade to Standard',
      buttonStyle: 'bg-gradient-to-r from-primary to-secondary text-primary-foreground',
      tierValue: 'standard'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 19,
      period: 'month',
      description: 'For teams and power users',
      features: [
        { name: 'Everything in Standard', included: true },
        { name: 'Analytics dashboard', included: true },
        { name: 'Team collaboration', included: true },
        { name: 'AI writing assistant', included: true },
        { name: 'Voice recorder', included: true },
        { name: 'All premium tools', included: true }
      ],
      buttonText: 'Upgrade to Pro',
      buttonStyle: 'bg-gradient-to-r from-accent to-primary text-primary-foreground',
      tierValue: 'pro'
    }
  ];

  const handlePurchase = (plan: PricingPlan) => {
    if (plan.tierValue === tier) {
      toast({
        title: "Already Active",
        description: `You're already on the ${plan.name} plan!`,
        duration: 2000,
      });
      return;
    }
    // StripeCheckout will handle payment and upgrade
  };

  const getButtonText = (plan: PricingPlan) => {
    if (plan.tierValue === tier) {
      return 'Current Plan';
    }
    return plan.buttonText;
  };

  const getButtonStyle = (plan: PricingPlan) => {
    if (plan.tierValue === tier) {
      return 'bg-green-500 text-white cursor-default';
    }
    return plan.buttonStyle;
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8" id="pricing">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Choose Your Plan</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map(plan => (
            <div key={plan.id} className={`rounded-2xl shadow-xl p-8 bg-white/40 ${plan.popular ? 'border-2 border-primary' : 'border border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-bold">{plan.name}</span>
                {plan.popular && <span className="px-2 py-1 bg-primary text-white rounded text-xs">Most Popular</span>}
                {plan.tierValue === 'pro' && <FaCrown className="text-yellow-400 ml-2" />}
              </div>
              <div className="text-4xl font-bold mb-2">{plan.price === 0 ? 'Free' : `$${plan.price}`}</div>
              <div className="text-gray-500 mb-4">per {plan.period}</div>
              <div className="mb-4 text-gray-700">{plan.description}</div>
              <ul className="mb-6 space-y-2">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {f.included ? <FaCheck className="text-green-500" /> : <FaTimes className="text-gray-400" />}
                    <span className={f.included ? '' : 'line-through text-gray-400'}>{f.name}</span>
                  </li>
                ))}
              </ul>
              {plan.tierValue === tier ? (
                <button className="w-full py-2 px-4 rounded-lg font-medium bg-green-500 text-white cursor-default">Current Plan</button>
              ) : plan.tierValue === 'basic' ? (
                <button className="w-full py-2 px-4 rounded-lg font-medium bg-gray-200 text-gray-600 cursor-default">Free</button>
              ) : (
                <StripeCheckout plan={plan.tierValue as 'standard' | 'pro'} onSuccess={() => setTier(plan.tierValue)} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
