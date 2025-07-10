import React, { useState } from 'react';
import { FaUserFriends, FaGift, FaShare } from 'react-icons/fa';
import { useUser } from '../context/UserContext';

const InviteSection: React.FC = () => {
  const { inviteCount } = useUser();
  const [inviteEmail, setInviteEmail] = useState('');

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle invite logic here
    setInviteEmail('');
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Invite Friends & Earn Rewards</h2>
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                <FaUserFriends className="text-white text-2xl" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-4">Share the Productivity</h3>
                <p className="text-muted-foreground mb-6">
                  Invite your friends and colleagues to join our platform. For every successful invite, 
                  you'll earn premium features and exclusive rewards.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-accent to-primary rounded-lg flex items-center justify-center">
                    <FaGift className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Earn Premium Days</h4>
                    <p className="text-sm text-muted-foreground">Get 7 days of premium access for each invite</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-secondary to-accent rounded-lg flex items-center justify-center">
                    <FaShare className="text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">Exclusive Features</h4>
                    <p className="text-sm text-muted-foreground">Unlock special tools and integrations</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/50 p-4 rounded-xl">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{inviteCount}</div>
                  <div className="text-sm text-muted-foreground">Successful Invites</div>
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
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Send Invite
                </button>
              </form>
              
              <div className="border-t border-white/20 pt-6">
                <h4 className="font-semibold text-foreground mb-4">Share Your Invite Link</h4>
                <div className="bg-white/50 p-4 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value="https://productivitypro.com/invite/abc123"
                      readOnly
                      className="flex-1 px-3 py-2 bg-white/70 rounded-lg border border-white/20 text-sm"
                    />
                    <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
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
