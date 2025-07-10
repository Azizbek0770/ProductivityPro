import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';
import { useToast } from '../hooks/use-toast';

const PomodoroTimer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [sessions, setSessions] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            setSessions(prev => prev + 1);
            toast({
              title: "Pomodoro Complete!",
              description: "Great work! Time for a break.",
              duration: 4000,
            });
            return 25 * 60; // Reset to 25 minutes
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    toast({
      title: "Pomodoro Started",
      description: "Focus mode activated!",
      duration: 2000,
    });
  };

  const handlePause = () => {
    setIsRunning(false);
    toast({
      title: "Pomodoro Paused",
      description: "Take a breather when you're ready to continue.",
      duration: 2000,
    });
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
    toast({
      title: "Pomodoro Stopped",
      description: "Session reset to 25 minutes.",
      duration: 2000,
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-8">Focus Mode: Pomodoro Timer</h2>
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl max-w-md mx-auto">
          <div className="w-48 h-48 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center relative">
            <div className="w-40 h-40 bg-white rounded-full flex items-center justify-center shadow-inner">
              <div className="text-center">
                <div className="text-4xl font-bold text-foreground">{formatTime(timeLeft)}</div>
                <div className="text-sm text-muted-foreground">Focus Time</div>
              </div>
            </div>
          </div>
          <div className="flex justify-center space-x-4">
            {!isRunning ? (
              <button
                onClick={handleStart}
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <FaPlay className="mr-2" />
                Start
              </button>
            ) : (
              <button
                onClick={handlePause}
                className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <FaPause className="mr-2" />
                Pause
              </button>
            )}
            <button
              onClick={handleStop}
              className="bg-white/25 backdrop-blur-[10px] border border-white/18 text-foreground px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaStop className="mr-2" />
              Stop
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <div className="text-sm text-muted-foreground">
              Sessions completed: {sessions}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PomodoroTimer;
