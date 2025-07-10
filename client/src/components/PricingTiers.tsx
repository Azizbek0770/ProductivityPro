import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

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
}

const PricingTiers: React.FC = () => {
  const { userTier } = useUser();

  const plans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'month',
      description: 'Perfect for getting started',
      features: [
        { name: 'Basic task management', included: true },
        { name: 'Pomodoro timer', included: true },
        { name: 'Simple notes', included: true },
        { name: 'Basic calendar', included: true },
        { name: 'Advanced analytics', included: false }
      ],
      buttonText: 'Get Started Free',
      buttonStyle: 'bg-white/25 backdrop-blur-[10px] border border-white/18 text-foreground'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 9,
      period: 'month',
      description: 'For serious productivity',
      features: [
        { name: 'Everything in Free', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Team collaboration', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Priority support', included: true }
      ],
      popular: true,
      buttonText: 'Start Pro Trial',
      buttonStyle: 'bg-gradient-to-r from-primary to-secondary text-primary-foreground'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 19,
      period: 'month',
      description: 'For teams and power users',
      features: [
        { name: 'Everything in Pro', included: true },
        { name: 'AI writing assistant', included: true },
        { name: 'Advanced automation', included: true },
        { name: 'White-label options', included: true },
        { name: 'Dedicated support', included: true }
      ],
      buttonText: 'Get Premium',
      buttonStyle: 'bg-gradient-to-r from-accent to-primary text-primary-foreground'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Productivity Plan</h2>
          <p className="text-xl text-muted-foreground">Unlock your full potential with our premium features</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 relative ${
                plan.popular ? 'border-primary' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
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
                  className={`w-full py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 ${plan.buttonStyle}`}
                >
                  {plan.buttonText}
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
