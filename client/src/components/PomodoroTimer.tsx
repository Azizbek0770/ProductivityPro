import React, { useState } from 'react';
import { FaPlay, FaPause, FaStop } from 'react-icons/fa';

const PomodoroTimer: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
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
            <button
              onClick={handleStart}
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaPlay className="mr-2" />
              Start
            </button>
            <button
              onClick={handlePause}
              className="bg-white/25 backdrop-blur-[10px] border border-white/18 text-foreground px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaPause className="mr-2" />
              Pause
            </button>
            <button
              onClick={handleStop}
              className="bg-white/25 backdrop-blur-[10px] border border-white/18 text-foreground px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <FaStop className="mr-2" />
              Stop
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PomodoroTimer;
