import React, { useState } from 'react';
import { FaBook, FaLock, FaSmile, FaFrown, FaMeh } from 'react-icons/fa';

const moods = [
  { icon: <FaSmile className="text-green-500" />, value: 'happy' },
  { icon: <FaMeh className="text-yellow-500" />, value: 'neutral' },
  { icon: <FaFrown className="text-red-500" />, value: 'sad' },
];

const Journal: React.FC = () => {
  const today = new Date().toISOString().split('T')[0];
  const [entry, setEntry] = useState(() => localStorage.getItem(`journal-${today}`) || '');
  const [locked, setLocked] = useState(false);
  const [mood, setMood] = useState(() => localStorage.getItem(`journal-mood-${today}`) || '');

  const saveEntry = () => {
    localStorage.setItem(`journal-${today}`, entry);
    localStorage.setItem(`journal-mood-${today}` , mood);
  };

  return (
    <div className="p-6 bg-white/50 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaBook /> Journal
      </h3>
      <div className="flex items-center gap-2 mb-2">
        <span>Mood:</span>
        {moods.map(m => (
          <button
            key={m.value}
            className={`p-2 rounded-full border ${mood === m.value ? 'border-blue-500' : 'border-gray-300'}`}
            onClick={() => setMood(m.value)}
          >
            {m.icon}
          </button>
        ))}
      </div>
      <textarea
        className="w-full h-32 p-2 rounded border mb-2"
        value={entry}
        onChange={e => setEntry(e.target.value)}
        disabled={locked}
        placeholder="Write your thoughts..."
      />
      <div className="flex gap-2">
        <button onClick={saveEntry} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        <button onClick={() => setLocked(l => !l)} className="bg-gray-300 px-4 py-2 rounded flex items-center gap-1">
          <FaLock /> {locked ? 'Unlock' : 'Lock'}
        </button>
      </div>
    </div>
  );
};

export default Journal;
