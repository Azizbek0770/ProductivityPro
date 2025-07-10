import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Event {
  id: string;
  title: string;
  time: string;
  location: string;
  color: string;
}

const Calendar: React.FC = () => {
  const [events] = useState<Event[]>([
    {
      id: '1',
      title: 'Team Standup',
      time: 'Today, 9:00 AM',
      location: 'Conference Room A',
      color: 'bg-red-500'
    },
    {
      id: '2',
      title: 'Client Presentation',
      time: 'Tomorrow, 2:00 PM',
      location: 'Zoom Meeting',
      color: 'bg-blue-500'
    },
    {
      id: '3',
      title: 'Product Review',
      time: 'Dec 18, 11:00 AM',
      location: 'Meeting Room B',
      color: 'bg-green-500'
    }
  ]);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const currentDate = new Date();
  const currentDay = 15; // Mock current day

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Smart Calendar</h2>
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Calendar Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">December 2024</h3>
                <div className="flex space-x-2">
                  <button className="p-2 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                    <FaChevronLeft className="text-muted-foreground" />
                  </button>
                  <button className="p-2 bg-white/50 rounded-lg hover:bg-white/70 transition-colors">
                    <FaChevronRight className="text-muted-foreground" />
                  </button>
                </div>
              </div>
              <div className="bg-white/70 p-6 rounded-xl shadow-inner">
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {/* Previous month days */}
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div key={`prev-${day}`} className="text-center p-2 text-muted-foreground">
                      {day}
                    </div>
                  ))}
                  {/* Current month days */}
                  {[8, 9, 10, 11, 12, 13, 14].map((day) => (
                    <div key={day} className="text-center p-2 hover:bg-white/50 rounded cursor-pointer">
                      {day}
                    </div>
                  ))}
                  <div className="text-center p-2 bg-primary text-primary-foreground rounded font-semibold">
                    {currentDay}
                  </div>
                  <div className="text-center p-2 hover:bg-white/50 rounded cursor-pointer relative">
                    16
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="text-center p-2 hover:bg-white/50 rounded cursor-pointer">17</div>
                  <div className="text-center p-2 hover:bg-white/50 rounded cursor-pointer relative">
                    18
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-500 rounded-full"></div>
                  </div>
                  {[19, 20, 21].map((day) => (
                    <div key={day} className="text-center p-2 hover:bg-white/50 rounded cursor-pointer">
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Upcoming Events</h3>
              <div className="space-y-3">
                {events.map((event) => (
                  <div key={event.id} className="bg-white/50 p-4 rounded-xl shadow-md">
                    <div className="flex items-start space-x-3">
                      <div className={`w-3 h-3 ${event.color} rounded-full mt-2`}></div>
                      <div>
                        <h4 className="font-medium text-foreground">{event.title}</h4>
                        <p className="text-sm text-muted-foreground">{event.time}</p>
                        <p className="text-xs text-muted-foreground mt-1">{event.location}</p>
                      </div>
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

export default Calendar;
