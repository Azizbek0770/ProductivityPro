import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStop, FaRedo, FaCog, FaVolumeUp } from 'react-icons/fa';
import { useToast } from '../hooks/use-toast';

interface PomodoroSession {
  id: string;
  type: 'work' | 'break' | 'longBreak';
  duration: number;
  completedAt: string;
}

const PomodoroTimer: React.FC = () => {
  const [time, setTime] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<PomodoroSession[]>([]);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    workDuration: 25,
    shortBreakDuration: 5,
    longBreakDuration: 15,
    sessionsUntilLongBreak: 4,
    soundEnabled: true,
    autoStartBreaks: false,
    autoStartPomodoros: false
  });

  const { toast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSessions = localStorage.getItem('pomodoroSessions');
    const savedSettings = localStorage.getItem('pomodoroSettings');
    const savedStats = localStorage.getItem('pomodoroStats');
    
    if (savedSessions) {
      setSessionHistory(JSON.parse(savedSessions));
    }
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    if (savedStats) {
      const stats = JSON.parse(savedStats);
      setSessions(stats.sessions || 0);
      setTotalFocusTime(stats.totalFocusTime || 0);
    }
  }, []);

  // Save data to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoroSessions', JSON.stringify(sessionHistory));
  }, [sessionHistory]);

  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('pomodoroStats', JSON.stringify({
      sessions,
      totalFocusTime
    }));
  }, [sessions, totalFocusTime]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      // Session completed
      handleSessionComplete();
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, isBreak, sessions]);

  const handleSessionComplete = () => {
    const sessionType = isBreak ? 'break' : 'work';
    const duration = isBreak ? getBreakDuration() : settings.workDuration;
    
    // Play notification sound
    if (settings.soundEnabled) {
      playNotificationSound();
    }
    
    // Save session to history
    const newSession: PomodoroSession = {
      id: Date.now().toString(),
      type: sessionType as 'work' | 'break' | 'longBreak',
      duration,
      completedAt: new Date().toISOString()
    };
    
    setSessionHistory([newSession, ...sessionHistory]);
    
    if (!isBreak) {
      // Work session completed
      setSessions(prev => prev + 1);
      setTotalFocusTime(prev => prev + settings.workDuration);
      
      toast({
        title: "Work Session Complete!",
        description: `Great job! You focused for ${settings.workDuration} minutes.`,
        duration: 3000,
      });
      
      // Start break
      const isLongBreak = (sessions + 1) % settings.sessionsUntilLongBreak === 0;
      setIsBreak(true);
      setTime(isLongBreak ? settings.longBreakDuration * 60 : settings.shortBreakDuration * 60);
      setIsActive(settings.autoStartBreaks);
      
      if (isLongBreak) {
        toast({
          title: "Long Break Time!",
          description: `Take a longer break - you've earned it!`,
          duration: 3000,
        });
      }
    } else {
      // Break session completed
      toast({
        title: "Break Complete!",
        description: "Ready to get back to work?",
        duration: 3000,
      });
      
      // Start work session
      setIsBreak(false);
      setTime(settings.workDuration * 60);
      setIsActive(settings.autoStartPomodoros);
    }
  };

  const getBreakDuration = () => {
    const isLongBreak = sessions % settings.sessionsUntilLongBreak === 0;
    return isLongBreak ? settings.longBreakDuration : settings.shortBreakDuration;
  };

  const playNotificationSound = () => {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
    
    if (!isActive) {
      toast({
        title: isBreak ? "Break Started" : "Focus Session Started",
        description: `Timer set for ${formatTime(time)}`,
        duration: 2000,
      });
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTime(settings.workDuration * 60);
    
    toast({
      title: "Timer Reset",
      description: "Ready for a new focus session",
      duration: 2000,
    });
  };

  const skipSession = () => {
    if (isBreak) {
      setIsBreak(false);
      setTime(settings.workDuration * 60);
    } else {
      const isLongBreak = (sessions + 1) % settings.sessionsUntilLongBreak === 0;
      setIsBreak(true);
      setTime(isLongBreak ? settings.longBreakDuration * 60 : settings.shortBreakDuration * 60);
    }
    setIsActive(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getCurrentSessionDuration = () => {
    if (isBreak) {
      const isLongBreak = sessions % settings.sessionsUntilLongBreak === 0;
      return isLongBreak ? settings.longBreakDuration * 60 : settings.shortBreakDuration * 60;
    }
    return settings.workDuration * 60;
  };

  const progress = ((getCurrentSessionDuration() - time) / getCurrentSessionDuration()) * 100;

  const getSessionTypeText = () => {
    if (isBreak) {
      const isLongBreak = sessions % settings.sessionsUntilLongBreak === 0;
      return isLongBreak ? 'Long Break' : 'Short Break';
    }
    return 'Focus Time';
  };

  const todaysSessions = sessionHistory.filter(session => {
    const today = new Date().toDateString();
    return new Date(session.completedAt).toDateString() === today;
  });

  const todaysFocusTime = todaysSessions
    .filter(session => session.type === 'work')
    .reduce((total, session) => total + session.duration, 0);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">Pomodoro Timer</h3>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 bg-white/30 rounded-lg hover:bg-white/50 transition-colors"
        >
          <FaCog className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-white/30 backdrop-blur-[10px] border border-white/18 p-6 rounded-xl shadow-lg mb-6">
          <h4 className="text-lg font-semibold text-foreground mb-4">Settings</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Work Duration (minutes)</label>
              <input
                type="number"
                value={settings.workDuration}
                onChange={(e) => setSettings({...settings, workDuration: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Short Break (minutes)</label>
              <input
                type="number"
                value={settings.shortBreakDuration}
                onChange={(e) => setSettings({...settings, shortBreakDuration: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
                max="30"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Long Break (minutes)</label>
              <input
                type="number"
                value={settings.longBreakDuration}
                onChange={(e) => setSettings({...settings, longBreakDuration: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                min="1"
                max="60"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Sessions Until Long Break</label>
              <input
                type="number"
                value={settings.sessionsUntilLongBreak}
                onChange={(e) => setSettings({...settings, sessionsUntilLongBreak: parseInt(e.target.value)})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                min="2"
                max="10"
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => setSettings({...settings, soundEnabled: e.target.checked})}
                className="mr-2"
              />
              <span className="text-sm text-foreground">Enable sound notifications</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.autoStartBreaks}
                onChange={(e) => setSettings({...settings, autoStartBreaks: e.target.checked})}
                className="mr-2"
              />
              <span className="text-sm text-foreground">Auto-start breaks</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={settings.autoStartPomodoros}
                onChange={(e) => setSettings({...settings, autoStartPomodoros: e.target.checked})}
                className="mr-2"
              />
              <span className="text-sm text-foreground">Auto-start pomodoros</span>
            </label>
          </div>
        </div>
      )}

      {/* Timer */}
      <div className="bg-white/30 backdrop-blur-[10px] border border-white/18 p-8 rounded-xl shadow-lg mb-6">
        <div className="text-center space-y-8">
          <div className="relative">
            <div className="w-48 h-48 mx-auto relative">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-muted-foreground/30"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={`${progress * 2.83} 283`}
                  strokeLinecap="round"
                  className={`${isBreak ? 'text-green-500' : 'text-red-500'} transition-all duration-300`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl font-bold text-foreground mb-2">
                    {formatTime(time)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {getSessionTypeText()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleTimer}
              className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 ${
                isActive
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                  : 'bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:shadow-lg'
              }`}
            >
              {isActive ? <FaPause className="inline mr-2" /> : <FaPlay className="inline mr-2" />}
              {isActive ? 'Pause' : 'Start'}
            </button>
            
            <button
              onClick={resetTimer}
              className="px-8 py-3 rounded-full font-semibold bg-gray-200 hover:bg-gray-300 text-gray-800 transition-all duration-300"
            >
              <FaRedo className="inline mr-2" />
              Reset
            </button>
            
            <button
              onClick={skipSession}
              className="px-8 py-3 rounded-full font-semibold bg-blue-200 hover:bg-blue-300 text-blue-800 transition-all duration-300"
            >
              <FaStop className="inline mr-2" />
              Skip
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white/30 backdrop-blur-[10px] border border-white/18 p-6 rounded-xl shadow-lg">
        <h4 className="text-xl font-semibold text-foreground mb-4">Statistics</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-foreground">{sessions}</div>
            <div className="text-sm text-muted-foreground">Total Sessions</div>
          </div>
          <div className="bg-white/50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-foreground">{todaysSessions.length}</div>
            <div className="text-sm text-muted-foreground">Today's Sessions</div>
          </div>
          <div className="bg-white/50 p-4 rounded-lg text-center">
            <div className="text-2xl font-bold text-foreground">
              {Math.floor(todaysFocusTime / 60)}h {todaysFocusTime % 60}m
            </div>
            <div className="text-sm text-muted-foreground">Today's Focus Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PomodoroTimer;