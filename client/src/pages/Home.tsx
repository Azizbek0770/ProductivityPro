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
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  const [referOpen, setReferOpen] = useState(false);
  return (
    <>
      <Navbar />
      <OnboardingModal />
      <ReferFriendModal open={referOpen} onClose={() => setReferOpen(false)} />
      <button
        onClick={() => setReferOpen(true)}
        className="fixed bottom-8 right-8 z-40 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:scale-105 transition-all flex items-center gap-2"
      >
        <span>Refer a Friend</span>
      </button>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <section id="hero"><HeroSection /></section>
        <section id="tools"><ToolGrid /></section>
        <section id="pomodoro"><PomodoroTimer /></section>
        <section id="tasks"><TaskManager /></section>
        <section id="notes"><SmartNotes /></section>
        <section id="calendar"><Calendar /></section>
        <section id="analytics"><AnalyticsDashboard /></section>
        <section id="team"><TeamCollab /></section>
        <section id="ai-writing"><AIWritingAssistant /></section>
        <section id="voice"><VoiceRecorder /></section>
        <section id="habits"><HabitTracker /></section>
        <section id="email"><EmailSignup /></section>
        <section id="invite"><InviteSection /></section>
        <section id="pricing"><PricingTiers /></section>
        <section id="ad"><AdPlaceholder /></section>
        <section id="footer"><Footer /></section>
        <StickyCTA />
      </div>
    </>
  );
};

export default Home;
