import React from 'react';
import { FaCheck, FaTimes, FaCrown } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import { useToast } from '../hooks/use-toast';

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
  const { userTier, setUserTier } = useUser();
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
    if (plan.tierValue === userTier) {
      toast({
        title: "Already Active",
        description: `You're already on the ${plan.name} plan!`,
        duration: 2000,
      });
      return;
    }

    // Simulate payment process
    toast({
      title: "Processing Payment",
      description: `Upgrading to ${plan.name}...`,
      duration: 2000,
    });

    setTimeout(() => {
      setUserTier(plan.tierValue);
      toast({
        title: "Upgrade Successful!",
        description: `Welcome to ${plan.name}! All features are now unlocked.`,
        duration: 4000,
      });
    }, 2000);
  };

  const getButtonText = (plan: PricingPlan) => {
    if (plan.tierValue === userTier) {
      return 'Current Plan';
    }
    return plan.buttonText;
  };

  const getButtonStyle = (plan: PricingPlan) => {
    if (plan.tierValue === userTier) {
      return 'bg-green-500 text-white cursor-default';
    }
    return plan.buttonStyle;
  };

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Productivity Plan</h2>
          <p className="text-xl text-muted-foreground">Unlock your full potential with our premium features</p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-primary-foreground font-medium">
            <FaCrown className="mr-2" />
            Current: {userTier.charAt(0).toUpperCase() + userTier.slice(1)}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 relative ${
                plan.popular ? 'border-primary' : ''
              } ${plan.tierValue === userTier ? 'ring-2 ring-green-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              
              {plan.tierValue === userTier && (
                <div className="absolute -top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Active
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-foreground mb-4">
                  ${plan.price}
                  <span className="text-lg font-normal text-muted-foreground">/{plan.period}</span>
                </div>
                <p className="text-muted-foreground mb-6">{plan.description}</p>
                
                <ul className="text-left space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      {feature.included ? (
                        <FaCheck className="text-green-500 mr-3" />
                      ) : (
                        <FaTimes className="text-muted-foreground mr-3" />
                      )}
                      <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <button
                  onClick={() => handlePurchase(plan)}
                  disabled={plan.tierValue === userTier}
                  className={`w-full py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 ${getButtonStyle(plan)} ${
                    plan.tierValue === userTier ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                >
                  {getButtonText(plan)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingTiers;
