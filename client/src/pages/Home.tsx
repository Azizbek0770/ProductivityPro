import React, { useState } from 'react';
import HeroSection from '../components/HeroSection';
import ToolGrid from '../components/ToolGrid';
import PomodoroTimer from '../components/PomodoroTimer';
import TaskManager from '../components/TaskManager';
import SmartNotes from '../components/SmartNotes';
import Calendar from '../components/Calendar';
import AnalyticsDashboard from '../components/AnalyticsDashboard';
import TeamCollab from '../components/TeamCollab';
import AIWritingAssistant from '../components/AIWritingAssistant';
import VoiceRecorder from '../components/VoiceRecorder';
import HabitTracker from '../components/HabitTracker';
import EmailSignup from '../components/EmailSignup';
import InviteSection from '../components/InviteSection';
import PricingTiers from '../components/PricingTiers';
import AdPlaceholder from '../components/AdPlaceholder';
import Footer from '../components/Footer';
import StickyCTA from '../components/StickyCTA';
import OnboardingModal from '../components/OnboardingModal';
import ReferFriendModal from '../components/ReferFriendModal';

const Home: React.FC = () => {
  const [referOpen, setReferOpen] = useState(false);
  return (
    <>
      <OnboardingModal />
      <ReferFriendModal open={referOpen} onClose={() => setReferOpen(false)} />
      <button
        onClick={() => setReferOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2"
      >
        <span>Refer a Friend</span>
      </button>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <HeroSection />
        <ToolGrid />
        <PomodoroTimer />
        <TaskManager />
        <SmartNotes />
        <Calendar />
        <AnalyticsDashboard />
        <TeamCollab />
        <AIWritingAssistant />
        <VoiceRecorder />
        <HabitTracker />
        <EmailSignup />
        <InviteSection />
        <PricingTiers />
        <AdPlaceholder />
        <Footer />
        <StickyCTA />
      </div>
    </>
  );
};

export default Home;
