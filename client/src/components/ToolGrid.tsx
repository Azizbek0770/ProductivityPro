import React from 'react';
import { 
  FaClock, FaTasks, FaStickyNote, FaCalendarAlt, FaChartLine, 
  FaUsers, FaPenFancy, FaMicrophone, FaMedal, FaSearch, 
  FaShieldAlt, FaStopwatch, FaLock 
} from 'react-icons/fa';
import { useUser } from '../context/UserContext';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: 'active' | 'pro' | 'premium';
  gradient: string;
}

const tools: Tool[] = [
  {
    id: 'pomodoro',
    name: 'Pomodoro Timer',
    description: 'Focus sessions with smart breaks and productivity tracking.',
    icon: FaClock,
    status: 'active',
    gradient: 'from-primary to-secondary'
  },
  {
    id: 'tasks',
    name: 'Task Manager',
    description: 'Organize, prioritize, and track all your tasks in one place.',
    icon: FaTasks,
    status: 'active',
    gradient: 'from-accent to-primary'
  },
  {
    id: 'notes',
    name: 'Smart Notes',
    description: 'AI-powered note-taking with smart search and organization.',
    icon: FaStickyNote,
    status: 'active',
    gradient: 'from-secondary to-accent'
  },
  {
    id: 'calendar',
    name: 'Smart Calendar',
    description: 'Intelligent scheduling with conflict detection and optimization.',
    icon: FaCalendarAlt,
    status: 'active',
    gradient: 'from-primary to-secondary'
  },
  {
    id: 'analytics',
    name: 'Analytics Dashboard',
    description: 'Deep insights into your productivity patterns and trends.',
    icon: FaChartLine,
    status: 'pro',
    gradient: 'from-accent to-primary'
  },
  {
    id: 'team',
    name: 'Team Collaboration',
    description: 'Real-time collaboration with shared workspaces and chat.',
    icon: FaUsers,
    status: 'pro',
    gradient: 'from-secondary to-accent'
  },
  {
    id: 'ai-writing',
    name: 'AI Writing Assistant',
    description: 'GPT-powered writing help with grammar and style suggestions.',
    icon: FaPenFancy,
    status: 'premium',
    gradient: 'from-primary to-secondary'
  },
  {
    id: 'voice',
    name: 'Voice Recorder',
    description: 'High-quality recording with auto-transcription and notes.',
    icon: FaMicrophone,
    status: 'active',
    gradient: 'from-accent to-primary'
  },
  {
    id: 'habits',
    name: 'Habit Tracker',
    description: 'Build lasting habits with streaks and achievement rewards.',
    icon: FaMedal,
    status: 'active',
    gradient: 'from-secondary to-accent'
  },
  {
    id: 'scanner',
    name: 'Document Scanner',
    description: 'Scan and digitize documents with OCR text extraction.',
    icon: FaSearch,
    status: 'pro',
    gradient: 'from-primary to-secondary'
  },
  {
    id: 'password',
    name: 'Password Manager',
    description: 'Secure password storage with auto-fill and generation.',
    icon: FaShieldAlt,
    status: 'premium',
    gradient: 'from-accent to-primary'
  },
  {
    id: 'time-tracker',
    name: 'Time Tracker',
    description: 'Track time spent on projects with detailed reporting.',
    icon: FaStopwatch,
    status: 'active',
    gradient: 'from-secondary to-accent'
  }
];

const ToolGrid: React.FC = () => {
  const { userTier } = useUser();

  const getStatusBadge = (status: Tool['status']) => {
    if (status === 'active') {
      return (
        <div className="flex items-center">
          <span className="text-green-500 text-sm font-medium">Active</span>
        </div>
      );
    }
    return (
      <div className="flex items-center">
        <FaLock className="text-gray-400 text-sm" />
        <span className="text-gray-400 text-sm font-medium ml-1 capitalize">{status}</span>
      </div>
    );
  };

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
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${tool.gradient} rounded-xl flex items-center justify-center`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  {getStatusBadge(tool.status)}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{tool.name}</h3>
                <p className="text-muted-foreground text-sm">{tool.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ToolGrid;
