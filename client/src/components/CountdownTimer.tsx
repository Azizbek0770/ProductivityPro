import React, { useState, useRef } from 'react';
import { FaClock, FaPlay, FaPause, FaRedo } from 'react-icons/fa';

const CountdownTimer: React.FC = () => {
  const [label, setLabel] = useState('');
  const [duration, setDuration] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startTimer = () => {
    if (isActive) return;
    setIsActive(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setTimeLeft(duration);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(1, Number(e.target.value));
    setDuration(val);
    setTimeLeft(val);
  };

  return (
    <div className="p-6 bg-white/50 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaClock /> Countdown Timer
      </h3>
      <input
        type="text"
        placeholder="Event label"
        value={label}
        onChange={e => setLabel(e.target.value)}
        className="mb-2 px-3 py-2 rounded border w-full"
      />
      <input
        type="number"
        min={1}
        value={duration}
        onChange={handleDurationChange}
        className="mb-2 px-3 py-2 rounded border w-full"
      />
      <div className="text-3xl font-mono mb-4">{timeLeft}s</div>
      <div className="flex gap-2">
        <button onClick={startTimer} className="bg-green-500 text-white px-4 py-2 rounded flex-1 flex items-center justify-center gap-2"><FaPlay /> Start</button>
        <button onClick={pauseTimer} className="bg-yellow-500 text-white px-4 py-2 rounded flex-1 flex items-center justify-center gap-2"><FaPause /> Pause</button>
        <button onClick={resetTimer} className="bg-blue-500 text-white px-4 py-2 rounded flex-1 flex items-center justify-center gap-2"><FaRedo /> Reset</button>
      </div>
      {label && <div className="mt-2 text-gray-600">Event: {label}</div>}
    </div>
  );
};

export default CountdownTimer;
