import React, { useState } from 'react';
import { FaBold, FaItalic, FaList, FaLightbulb, FaStar } from 'react-icons/fa';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  timestamp: string;
  starred: boolean;
}

const SmartNotes: React.FC = () => {
  const [notes] = useState<Note[]>([
    {
      id: '1',
      title: 'Project Ideas',
      content: 'Brainstorming session notes...',
      category: 'Work',
      timestamp: '2 hours ago',
      starred: true
    },
    {
      id: '2',
      title: 'Book Summary',
      content: 'Key takeaways from...',
      category: 'Personal',
      timestamp: '1 day ago',
      starred: false
    },
    {
      id: '3',
      title: 'Weekly Review',
      content: 'Accomplishments and goals...',
      category: 'Review',
      timestamp: '3 days ago',
      starred: false
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'work': return 'bg-blue-100 text-blue-800';
      case 'personal': return 'bg-green-100 text-green-800';
      case 'review': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">AI-Powered Smart Notes</h2>
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Note Editor */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Quick Note</h3>
                <div className="flex space-x-2">
                  <button className="p-2 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                    <FaBold className="text-muted-foreground" />
                  </button>
                  <button className="p-2 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                    <FaItalic className="text-muted-foreground" />
                  </button>
                  <button className="p-2 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                    <FaList className="text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="bg-white/70 p-6 rounded-xl shadow-inner min-h-[300px]">
                <div className="text-foreground">
                  <h4 className="font-semibold mb-2">Meeting Notes - Product Planning</h4>
                  <p className="mb-4">Key discussion points from today's planning session:</p>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Feature prioritization for Q4</li>
                    <li>User feedback analysis</li>
                    <li>Technical architecture decisions</li>
                    <li>Timeline adjustments needed</li>
                  </ul>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <FaLightbulb className="inline mr-2" />
                    AI Suggestion: Consider adding action items section
                  </p>
                </div>
              </div>
            </div>

            {/* Note Sidebar */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-foreground">Recent Notes</h3>
                <button className="text-primary hover:text-primary/80 font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-white/50 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-medium text-foreground">{note.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{note.content}</p>
                        <div className="flex items-center mt-2">
                          <span className="text-xs text-muted-foreground">{note.timestamp}</span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(note.category)}`}>
                            {note.category}
                          </span>
                        </div>
                      </div>
                      {note.starred && <FaStar className="text-yellow-500" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartNotes;
