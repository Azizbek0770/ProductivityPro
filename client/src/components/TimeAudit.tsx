import React, { useState } from 'react';
import { FaChartPie, FaPlus, FaTrash } from 'react-icons/fa';

interface AuditEntry {
  id: string;
  label: string;
  minutes: number;
}

const colors = [
  'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400', 'bg-red-400', 'bg-indigo-400', 'bg-teal-400'
];

const TimeAudit: React.FC = () => {
  const [entries, setEntries] = useState<AuditEntry[]>(() => {
    const saved = localStorage.getItem('timeAudit');
    return saved ? JSON.parse(saved) : [];
  });
  const [label, setLabel] = useState('');
  const [minutes, setMinutes] = useState(0);

  const addEntry = () => {
    if (!label.trim() || minutes <= 0) return;
    const newEntry: AuditEntry = {
      id: Date.now().toString(),
      label,
      minutes
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('timeAudit', JSON.stringify(updated));
    setLabel('');
    setMinutes(0);
  };

  const removeEntry = (id: string) => {
    const updated = entries.filter(e => e.id !== id);
    setEntries(updated);
    localStorage.setItem('timeAudit', JSON.stringify(updated));
  };

  const total = entries.reduce((sum, e) => sum + e.minutes, 0) || 1;

  return (
    <div className="p-6 bg-white/50 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaChartPie /> Time Audit
      </h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Activity label"
          value={label}
          onChange={e => setLabel(e.target.value)}
          className="flex-1 px-3 py-2 rounded border"
        />
        <input
          type="number"
          min={1}
          value={minutes}
          onChange={e => setMinutes(Number(e.target.value))}
          className="w-24 px-3 py-2 rounded border"
        />
        <button onClick={addEntry} className="bg-blue-500 text-white px-4 py-2 rounded"><FaPlus /></button>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {entries.map((e, i) => (
          <div key={e.id} className={`flex items-center gap-1 px-2 py-1 rounded ${colors[i % colors.length]}`}>
            <span>{e.label}:</span>
            <span>{e.minutes} min</span>
            <button onClick={() => removeEntry(e.id)} className="text-white"><FaTrash /></button>
          </div>
        ))}
      </div>
      {/* Pie chart */}
      <div className="w-full flex justify-center">
        <svg width="180" height="180" viewBox="0 0 36 36" className="block">
          {entries.reduce((acc, e, i) => {
            const prev = acc.offset;
            const val = (e.minutes / total) * 100;
            const dash = val * 1.13;
            const el = (
              <circle
                key={e.id}
                r="16"
                cx="18"
                cy="18"
                fill="transparent"
                stroke={colors[i % colors.length].replace('bg-', '')}
                strokeWidth="3"
                strokeDasharray={`${dash} 113`}
                strokeDashoffset={113 - prev}
              />
            );
            acc.offset += dash;
            acc.elems.push(el);
            return acc;
          }, { offset: 0, elems: [] as JSX.Element[] }).elems}
        </svg>
      </div>
    </div>
  );
};

export default TimeAudit;
