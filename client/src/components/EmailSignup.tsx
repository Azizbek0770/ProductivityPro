import React, { useState } from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import { useToast } from '../hooks/use-toast';

const EmailSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call with validation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success feedback
      toast({
        title: "Welcome aboard!",
        description: "Freebie sent! Check your email for your productivity guide.",
        duration: 4000,
      });
      
      // Reset form
      setEmail('');
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "Please try again later.",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Join 50,000+ Productive Professionals</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Get productivity tips, feature updates, and exclusive content delivered weekly.
        </p>
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-6 py-4 bg-white/70 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          <p className="text-sm text-muted-foreground mt-4">
            <FaShieldAlt className="inline mr-2" />
            Your email is safe with us. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmailSignup;
