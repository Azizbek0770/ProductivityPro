import React, { useState } from 'react';
import { FaUserFriends, FaGift, FaShare, FaCopy, FaStar } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import { useToast } from '../hooks/use-toast';

const InviteSection: React.FC = () => {
  const { inviteCount, setInviteCount, referralCode, userTier } = useUser();
  const { toast } = useToast();
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsInviting(true);
    
    // Simulate sending invite
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Increment invite count
    setInviteCount(inviteCount + 1);
    
    toast({
      title: "Invite Sent!",
      description: `Invitation sent to ${inviteEmail}. You now have ${inviteCount + 1} successful invites!`,
      duration: 3000,
    });
    
    setInviteEmail('');
    setIsInviting(false);
  };

  const copyReferralLink = () => {
    const referralLink = `https://productivitypro.com/invite/${referralCode}`;
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link Copied!",
      description: "Referral link copied to clipboard",
      duration: 2000,
    });
  };

  const getTierBadge = () => {
    if (userTier === 'pro') {
      return (
        <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          <FaStar className="mr-1" />
          Pro Unlocked!
        </div>
      );
    } else if (userTier === 'standard') {
      return (
        <div className="flex items-center bg-gradient-to-r from-blue-400 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
          <FaStar className="mr-1" />
          Standard Unlocked!
        </div>
      );
    }
    return null;
  };

  return (
    <section id="invite" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">Invite Friends & Earn Rewards</h2>
          {getTierBadge()}
        </div>
        
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <FaUserFriends className="text-white text-2xl" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Share the Productivity</h3>
                <p className="text-muted-foreground mb-6">
                  Invite your friends and colleagues to join our platform. Unlock premium features through invites:
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center">
                    <FaGift className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">2 Invites → Standard Tier</h4>
                    <p className="text-sm text-muted-foreground">Unlock task manager, notes, calendar, habits</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center">
                    <FaShare className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">5 Invites → Pro Tier</h4>
                    <p className="text-sm text-muted-foreground">Unlock all premium tools and features</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/50 p-4 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{inviteCount}</div>
                  <div className="text-sm text-muted-foreground">Successful Invites</div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    {inviteCount < 2 ? `${2 - inviteCount} more for Standard` : 
                     inviteCount < 5 ? `${5 - inviteCount} more for Pro` : 
                     'All tiers unlocked!'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Send an Invite</h3>
              
              <form onSubmit={handleInvite} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Friend's Email Address
                  </label>
                  <input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full px-4 py-3 bg-white/70 rounded-xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                    disabled={isInviting}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isInviting}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isInviting ? 'Sending...' : 'Send Invite'}
                </button>
              </form>
              
              <div className="border-t border-white/20 pt-6">
                <h4 className="font-semibold text-foreground mb-4">Share Your Invite Link</h4>
                <div className="bg-white/50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={`https://productivitypro.com/invite/${referralCode}`}
                      readOnly
                      className="flex-1 px-3 py-2 bg-white/70 rounded-lg border border-white/20 text-sm"
                    />
                    <button 
                      onClick={copyReferralLink}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                    >
                      <FaCopy className="inline mr-1" />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InviteSection;
