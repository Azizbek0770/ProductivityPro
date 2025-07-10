import React, { useState, useEffect } from 'react';
import { FaBold, FaItalic, FaList, FaLightbulb, FaStar, FaPlus, FaTrash, FaEdit, FaSearch, FaSave } from 'react-icons/fa';
import { useToast } from '../hooks/use-toast';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  timestamp: string;
  starred: boolean;
  createdAt: string;
  updatedAt: string;
}

const SmartNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { toast } = useToast();

  // Load notes from localStorage on mount
  useEffect(() => {
    const savedNotes = localStorage.getItem('smartNotes');
    if (savedNotes) {
      const parsedNotes = JSON.parse(savedNotes);
      setNotes(parsedNotes);
      if (parsedNotes.length > 0) {
        setCurrentNote(parsedNotes[0]);
      }
    } else {
      // Initialize with sample notes
      const initialNotes: Note[] = [
        {
          id: '1',
          title: 'Project Ideas',
          content: 'Brainstorming session notes for upcoming projects:\n\n• Mobile app development\n• Web platform improvements\n• User experience enhancements\n• Performance optimization tasks',
          category: 'Work',
          timestamp: '2 hours ago',
          starred: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Book Summary',
          content: 'Key takeaways from "Atomic Habits" by James Clear:\n\n• Small changes lead to big results\n• Focus on systems, not goals\n• Environment shapes behavior\n• Make good habits obvious and easy',
          category: 'Personal',
          timestamp: '1 day ago',
          starred: false,
          createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      setNotes(initialNotes);
      setCurrentNote(initialNotes[0]);
      localStorage.setItem('smartNotes', JSON.stringify(initialNotes));
    }
  }, []);

  // Save notes to localStorage whenever notes change
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('smartNotes', JSON.stringify(notes));
    }
  }, [notes]);

  const createNewNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      category: 'General',
      timestamp: 'now',
      starred: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);
    setIsEditing(true);
    
    toast({
      title: "New Note Created",
      description: "Start typing to add your thoughts",
      duration: 2000,
    });
  };

  const saveNote = () => {
    if (!currentNote) return;
    
    const updatedNotes = notes.map(note =>
      note.id === currentNote.id
        ? { ...currentNote, updatedAt: new Date().toISOString() }
        : note
    );
    
    setNotes(updatedNotes);
    setIsEditing(false);
    
    toast({
      title: "Note Saved",
      description: "Your changes have been saved",
      duration: 2000,
    });
  };

  const deleteNote = (id: string) => {
    const noteToDelete = notes.find(n => n.id === id);
    setNotes(notes.filter(n => n.id !== id));
    
    if (currentNote?.id === id) {
      setCurrentNote(notes.length > 1 ? notes.find(n => n.id !== id) || null : null);
    }
    
    toast({
      title: "Note Deleted",
      description: `"${noteToDelete?.title}" has been removed`,
      duration: 2000,
    });
  };

  const toggleStar = (id: string) => {
    setNotes(notes.map(note =>
      note.id === id ? { ...note, starred: !note.starred } : note
    ));
    
    if (currentNote?.id === id) {
      setCurrentNote({ ...currentNote, starred: !currentNote.starred });
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      case 'general': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || note.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(notes.map(note => note.category.toLowerCase())))];

  return (
    <div className="p-6 h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">Smart Notes</h3>
        <button
          onClick={createNewNote}
          className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
        >
          <FaPlus className="inline mr-2" />
          New Note
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Notes Sidebar */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search and Filter */}
          <div className="space-y-3">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Notes List */}
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                onClick={() => setCurrentNote(note)}
                className={`bg-white/30 backdrop-blur-[10px] border border-white/18 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                  currentNote?.id === note.id ? 'ring-2 ring-primary' : 'hover:bg-white/40'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-semibold text-foreground text-sm truncate">{note.title}</h4>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleStar(note.id);
                      }}
                      className={`p-1 transition-colors ${
                        note.starred ? 'text-yellow-500' : 'text-gray-400'
                      }`}
                    >
                      <FaStar className="w-3 h-3" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note.id);
                      }}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FaTrash className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {note.content.substring(0, 100)}...
                </p>
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 text-xs rounded-full ${getCategoryColor(note.category)}`}>
                    {note.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note Editor */}
        <div className="lg:col-span-2">
          {currentNote ? (
            <div className="bg-white/30 backdrop-blur-[10px] border border-white/18 p-6 rounded-xl shadow-lg h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentNote.title}
                      onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                      className="text-2xl font-bold text-foreground bg-transparent border-b border-primary focus:outline-none"
                    />
                  ) : (
                    <h3 className="text-2xl font-bold text-foreground">{currentNote.title}</h3>
                  )}
                  <button
                    onClick={() => toggleStar(currentNote.id)}
                    className={`p-2 transition-colors ${
                      currentNote.starred ? 'text-yellow-500' : 'text-gray-400'
                    }`}
                  >
                    <FaStar className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center space-x-2">
                  {isEditing ? (
                    <button
                      onClick={saveNote}
                      className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <FaSave className="inline mr-2" />
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="bg-white/50 text-foreground px-4 py-2 rounded-lg font-semibold hover:bg-white/70 transition-all duration-300"
                    >
                      <FaEdit className="inline mr-2" />
                      Edit
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-foreground">Category:</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={currentNote.category}
                      onChange={(e) => setCurrentNote({ ...currentNote, category: e.target.value })}
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  ) : (
                    <span className={`px-3 py-1 text-sm rounded-full ${getCategoryColor(currentNote.category)}`}>
                      {currentNote.category}
                    </span>
                  )}
                </div>

                <div className="h-96">
                  {isEditing ? (
                    <textarea
                      value={currentNote.content}
                      onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
                      className="w-full h-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                      placeholder="Start writing your note..."
                    />
                  ) : (
                    <div className="w-full h-full p-4 bg-white/50 rounded-lg overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-foreground">{currentNote.content}</pre>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div>
                    Created: {new Date(currentNote.createdAt).toLocaleDateString()}
                  </div>
                  <div>
                    Updated: {new Date(currentNote.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white/30 backdrop-blur-[10px] border border-white/18 p-6 rounded-xl shadow-lg h-full flex items-center justify-center">
              <div className="text-center">
                <FaLightbulb className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No Note Selected</h3>
                <p className="text-muted-foreground">Select a note from the sidebar or create a new one</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SmartNotes;
