import React, { useState } from 'react';
import { FaMedal, FaFire, FaCheck } from 'react-icons/fa';

interface Habit {
  id: string;
  name: string;
  streak: number;
  target: number;
  completed: boolean;
  category: string;
}

const HabitTracker: React.FC = () => {
  const [habits] = useState<Habit[]>([
    {
      id: '1',
      name: 'Daily Exercise',
      streak: 7,
      target: 30,
      completed: true,
      category: 'Health'
    },
    {
      id: '2',
      name: 'Read for 30 minutes',
      streak: 12,
      target: 21,
      completed: false,
      category: 'Learning'
    },
    {
      id: '3',
      name: 'Meditate',
      streak: 5,
      target: 14,
      completed: true,
      category: 'Wellness'
    },
    {
      id: '4',
      name: 'Write in journal',
      streak: 3,
      target: 7,
      completed: false,
      category: 'Personal'
    }
  ]);

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'health': return 'bg-green-100 text-green-800';
      case 'learning': return 'bg-blue-100 text-blue-800';
      case 'wellness': return 'bg-purple-100 text-purple-800';
      case 'personal': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Habit Tracker</h2>
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Stats */}
            <div className="bg-white/50 p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaMedal className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">4</h3>
              <p className="text-muted-foreground">Active Habits</p>
            </div>
            
            <div className="bg-white/50 p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaFire className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">12</h3>
              <p className="text-muted-foreground">Longest Streak</p>
            </div>
            
            <div className="bg-white/50 p-6 rounded-xl shadow-md text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-secondary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                <FaCheck className="text-white text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">75%</h3>
              <p className="text-muted-foreground">Success Rate</p>
            </div>
          </div>
          
          {/* Habits List */}
          <div className="mt-8 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Today's Habits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {habits.map((habit) => (
                <div
                  key={habit.id}
                  className="bg-white/50 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-foreground">{habit.name}</h4>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${habit.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                      {habit.completed && <FaCheck className="text-white text-sm" />}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <FaFire className="text-orange-500" />
                      <span className="text-muted-foreground">{habit.streak} day streak</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(habit.category)}`}>
                      {habit.category}
                    </span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((habit.streak / habit.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {habit.streak}/{habit.target} days
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HabitTracker;
