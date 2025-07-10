import React, { useState } from 'react';
import {
  FaClock, FaTasks, FaStickyNote, FaCalendarAlt, FaChartLine,
  FaUsers, FaPenFancy, FaMicrophone, FaMedal, FaSearch,
  FaShieldAlt, FaStopwatch, FaLock, FaUnlock, FaUpload, FaBook, FaBookOpen, FaChartPie
} from 'react-icons/fa';
import { useSubscription } from '../context/SubscriptionContext';
import { useUser } from '../context/UserContext';
import { useToast } from '../hooks/use-toast';
import ToolModal from './ToolModal';
import PomodoroTimer from './PomodoroTimer';
import VoiceRecorder from './VoiceRecorder';
import HabitTracker from './HabitTracker';
import TaskManager from './TaskManager';
import SmartNotes from './SmartNotes';
import Calendar from './Calendar';
import AnalyticsDashboard from './AnalyticsDashboard';
import TeamCollab from './TeamCollab';
import AIWritingAssistant from './AIWritingAssistant';
import FileUploader from './FileUploader';
import CountdownTimer from './CountdownTimer';
import Journal from './Journal';
import ToReadList from './ToReadList';
import TimeAudit from './TimeAudit';
import { motion } from 'framer-motion';
import SkeletonLoader from './ui/SkeletonLoader';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  requiredTier: 'basic' | 'standard' | 'pro';
  gradient: string;
}

const tools: Tool[] = [
  {
    id: 'pomodoro',
    name: 'Pomodoro Timer',
    description: 'Focus sessions with smart breaks and productivity tracking.',
    icon: FaClock,
    requiredTier: 'basic',
    gradient: 'from-primary to-secondary'
  },
  {
    id: 'tasks',
    name: 'Task Manager',
    description: 'Organize, prioritize, and track all your tasks in one place.',
    icon: FaTasks,
    requiredTier: 'standard',
    gradient: 'from-accent to-primary'
  },
  {
    id: 'notes',
    name: 'Smart Notes',
    description: 'AI-powered note-taking with smart search and organization.',
    icon: FaStickyNote,
    requiredTier: 'standard',
    gradient: 'from-secondary to-accent'
  },
  {
    id: 'calendar',
    name: 'Smart Calendar',
    description: 'Intelligent scheduling with conflict detection and optimization.',
    icon: FaCalendarAlt,
    requiredTier: 'standard',
    gradient: 'from-primary to-secondary'
  },
  {
    id: 'analytics',
    name: 'Analytics Dashboard',
    description: 'Deep insights into your productivity patterns and trends.',
    icon: FaChartLine,
    requiredTier: 'pro',
    gradient: 'from-accent to-primary'
  },
  {
    id: 'team',
    name: 'Team Collaboration',
    description: 'Real-time collaboration with shared workspaces and chat.',
    icon: FaUsers,
    requiredTier: 'pro',
    gradient: 'from-secondary to-accent'
  },
  {
    id: 'ai-writing',
    name: 'AI Writing Assistant',
    description: 'GPT-powered writing help with grammar and style suggestions.',
    icon: FaPenFancy,
    requiredTier: 'pro',
    gradient: 'from-primary to-secondary'
  },
  {
    id: 'voice',
    name: 'Voice Recorder',
    description: 'High-quality recording with auto-transcription and notes.',
    icon: FaMicrophone,
    requiredTier: 'pro',
    gradient: 'from-accent to-primary'
  },
  {
    id: 'habits',
    name: 'Habit Tracker',
    description: 'Build lasting habits with streaks and achievement rewards.',
    icon: FaMedal,
    requiredTier: 'standard',
    gradient: 'from-secondary to-accent'
  },
  {
    id: 'scanner',
    name: 'Document Scanner',
    description: 'Scan and digitize documents with OCR text extraction.',
    icon: FaSearch,
    requiredTier: 'pro',
    gradient: 'from-primary to-secondary'
  },
  {
    id: 'password',
    name: 'Password Manager',
    description: 'Secure password storage with auto-fill and generation.',
    icon: FaShieldAlt,
    requiredTier: 'pro',
    gradient: 'from-accent to-primary'
  },
  {
    id: 'time-tracker',
    name: 'Time Tracker',
    description: 'Track time spent on projects with detailed reporting.',
    icon: FaStopwatch,
    requiredTier: 'basic',
    gradient: 'from-secondary to-accent'
  },
  {
    id: 'file-uploader',
    name: 'File Uploader',
    description: 'Drag and drop files, view uploads, Supabase storage ready.',
    icon: FaUpload,
    requiredTier: 'standard',
    gradient: 'from-primary to-secondary'
  },
  {
    id: 'countdown',
    name: 'Countdown Timer',
    description: 'Track event countdowns with custom labels.',
    icon: FaClock,
    requiredTier: 'standard',
    gradient: 'from-accent to-primary'
  },
  {
    id: 'journal',
    name: 'Journal',
    description: 'Daily entries, private mode, mood selector.',
    icon: FaBook,
    requiredTier: 'pro',
    gradient: 'from-secondary to-accent'
  },
  {
    id: 'to-read',
    name: 'To-Read List',
    description: 'Add links/books, mark as read, rate items.',
    icon: FaBookOpen,
    requiredTier: 'standard',
    gradient: 'from-primary to-secondary'
  },
  {
    id: 'time-audit',
    name: 'Time Audit',
    description: 'Manual pie chart tracker for daily time use.',
    icon: FaChartPie,
    requiredTier: 'pro',
    gradient: 'from-accent to-primary'
  }
];

const ToolGrid: React.FC = () => {
  const { tier } = useSubscription();
  const { toast } = useToast();
  const [openModal, setOpenModal] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(timeout);
  }, []);

  // Define unlockable tool count by tier
  const tierUnlocks: Record<string, number> = {
    basic: 4,
    standard: 8,
    pro: tools.length
  };

  // Only unlock the first N tools for the current tier
  const isToolUnlocked = (tool: Tool, idx: number): boolean => {
    if (tier === 'pro') return true;
    if (tier === 'standard') return idx < tierUnlocks['standard'];
    return idx < tierUnlocks['basic'];
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToolClick = (tool: Tool, idx: number) => {
    const unlocked = isToolUnlocked(tool, idx);
    if (unlocked) {
      setOpenModal(tool.id);
      toast({
        title: `Opening ${tool.name}`,
        description: `${tool.name} is now active.`,
        duration: 2000,
      });
    } else {
      toast({
        title: 'Upgrade Required',
        description: `${tool.name} is locked. Upgrade your plan to unlock this tool!`,
        duration: 3000,
        variant: 'destructive',
      });
      const upgradeSection = Math.random() > 0.5 ? 'pricing' : 'invite';
      scrollToSection(upgradeSection);
    }
  };

  const renderToolContent = (toolId: string) => {
    switch (toolId) {
      case 'pomodoro': return <PomodoroTimer />;
      case 'voice': return <VoiceRecorder />;
      case 'habits': return <HabitTracker />;
      case 'tasks': return <TaskManager />;
      case 'notes': return <SmartNotes />;
      case 'calendar': return <Calendar />;
      case 'analytics': return <AnalyticsDashboard />;
      case 'team': return <TeamCollab />;
      case 'ai-writing': return <AIWritingAssistant />;
      case 'file-uploader': return <FileUploader />;
      case 'countdown': return <CountdownTimer />;
      case 'journal': return <Journal />;
      case 'to-read': return <ToReadList />;
      case 'time-audit': return <TimeAudit />;
      default: return null;
    }
  };

  const getToolByName = (id: string) => tools.find(tool => tool.id === id)?.name || 'Tool';

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Powerful Tools for Every Task
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Access 12 premium productivity tools designed to streamline your workflow and boost efficiency.
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-secondary rounded-full text-primary-foreground font-medium">
            Current Plan: {tier.charAt(0).toUpperCase() + tier.slice(1)}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => (
                <SkeletonLoader key={i} className="h-48 w-full mb-2" />
              ))
            : tools.map((tool, idx) => {
                const Icon = tool.icon;
                const unlocked = isToolUnlocked(tool, idx);
                return (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className={`relative bg-white/25 border border-white/18 p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer`}
                    onClick={() => handleToolClick(tool, idx)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center relative`}>
                        <Icon className="text-white text-xl" />
                        {!unlocked && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
                            <FaLock className="text-white text-sm" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center">
                        {unlocked ? (
                          <FaUnlock className="text-green-500 text-sm" />
                        ) : (
                          <FaLock className="text-gray-400 text-sm" />
                        )}
                        <span className={`text-xs font-medium ml-1 ${unlocked ? 'text-green-500' : 'text-gray-400'}`}>
                          {tool.requiredTier.charAt(0).toUpperCase() + tool.requiredTier.slice(1)}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{tool.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{tool.description}</p>
                    <button
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all duration-300 ${unlocked ? 'bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'}`}
                    >
                      {unlocked ? 'Open' : 'Upgrade to Unlock'}
                    </button>
                    {!unlocked && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                        <span className="bg-white/80 text-primary px-3 py-1 rounded-full font-semibold text-xs animate-pulse">Upgrade to unlock</span>
                      </div>
                    )}
                  </motion.div>
                );
              })}
        </div>
      </div>
      {/* Tool Modal */}
      <ToolModal
        isOpen={openModal !== null}
        onClose={() => setOpenModal(null)}
        toolName={getToolByName(openModal || '')}
      >
        {openModal && renderToolContent(openModal)}
      </ToolModal>
    </section>
  );
};

export default ToolGrid;
