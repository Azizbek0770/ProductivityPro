import React, { useState } from 'react';
import { FaBookOpen, FaCheck, FaStar, FaTrash } from 'react-icons/fa';

interface ToReadItem {
  id: string;
  title: string;
  url: string;
  read: boolean;
  rating: number;
}

const ToReadList: React.FC = () => {
  const [items, setItems] = useState<ToReadItem[]>(() => {
    const saved = localStorage.getItem('toReadList');
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const addItem = () => {
    if (!title.trim()) return;
    const newItem: ToReadItem = {
      id: Date.now().toString(),
      title,
      url,
      read: false,
      rating: 0
    };
    const updated = [newItem, ...items];
    setItems(updated);
    localStorage.setItem('toReadList', JSON.stringify(updated));
    setTitle('');
    setUrl('');
  };

  const markRead = (id: string) => {
    const updated = items.map(item => item.id === id ? { ...item, read: !item.read } : item);
    setItems(updated);
    localStorage.setItem('toReadList', JSON.stringify(updated));
  };

  const setRating = (id: string, rating: number) => {
    const updated = items.map(item => item.id === id ? { ...item, rating } : item);
    setItems(updated);
    localStorage.setItem('toReadList', JSON.stringify(updated));
  };

  const removeItem = (id: string) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem('toReadList', JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-white/50 rounded-xl shadow-md">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <FaBookOpen /> To-Read List
      </h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Book/article title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="flex-1 px-3 py-2 rounded border"
        />
        <input
          type="url"
          placeholder="Link (optional)"
          value={url}
          onChange={e => setUrl(e.target.value)}
          className="flex-1 px-3 py-2 rounded border"
        />
        <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded">Add</button>
      </div>
      <ul className="space-y-2">
        {items.length === 0 && <li className="text-gray-400">Nothing to read yet.</li>}
        {items.map(item => (
          <li key={item.id} className={`flex items-center gap-2 p-2 rounded ${item.read ? 'bg-green-100' : 'bg-gray-100'}`}>
            <button onClick={() => markRead(item.id)} className="text-green-600"><FaCheck /></button>
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="flex-1 truncate hover:underline">{item.title}</a>
            <div className="flex gap-1">
              {[1,2,3,4,5].map(n => (
                <FaStar key={n} className={n <= item.rating ? 'text-yellow-400' : 'text-gray-300'} onClick={() => setRating(item.id, n)} />
              ))}
            </div>
            <button onClick={() => removeItem(item.id)} className="text-red-500"><FaTrash /></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToReadList;
