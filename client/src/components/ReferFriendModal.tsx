import React, { useState } from 'react';
import { FaUserPlus, FaCheck } from 'react-icons/fa';

const ReferFriendModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [count, setCount] = useState(() => Number(localStorage.getItem('refCount') || 0));
  const referral = `${window.location.origin}/?ref=${btoa('user')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referral);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleInvite = () => {
    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('refCount', String(newCount));
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8 max-w-md w-full text-center animate-fade-in">
        <FaUserPlus className="text-3xl text-primary mx-auto mb-4" />
        <h2 className="text-xl font-bold mb-2">Refer a Friend</h2>
        <p className="mb-4 text-gray-600 dark:text-gray-300">Share your referral link and unlock rewards!</p>
        <div className="flex items-center gap-2 mb-4">
          <input value={referral} readOnly className="flex-1 px-2 py-1 rounded border text-xs" />
          <button onClick={handleCopy} className="px-2 py-1 bg-primary text-white rounded text-xs font-semibold">
            {copied ? <FaCheck /> : 'Copy'}
          </button>
        </div>
        <button onClick={handleInvite} className="w-full py-2 rounded bg-green-500 text-white font-semibold mb-2">Simulate Invite</button>
        <div className="mb-2 text-sm">Invites sent: <span className="font-bold">{count}</span></div>
        <button onClick={onClose} className="mt-2 px-6 py-2 rounded bg-gray-300 text-gray-800 font-semibold hover:bg-gray-400 transition-all">Close</button>
      </div>
    </div>
  );
};

export default ReferFriendModal;
