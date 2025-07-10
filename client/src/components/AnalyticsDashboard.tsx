import React from 'react';
import { FaClock, FaTasks, FaTrophy } from 'react-icons/fa';

const AnalyticsDashboard: React.FC = () => {
  const stats = [
    {
      id: '1',
      title: 'Focus Time Today',
      value: '6.5h',
      icon: FaClock,
      gradient: 'from-primary to-secondary'
    },
    {
      id: '2',
      title: 'Tasks Completed',
      value: '12',
      icon: FaTasks,
      gradient: 'from-accent to-primary'
    },
    {
      id: '3',
      title: 'Weekly Goal',
      value: '85%',
      icon: FaTrophy,
      gradient: 'from-secondary to-accent'
    }
  ];

  const weeklyData = [
    { day: 'Mon', height: 'h-32' },
    { day: 'Tue', height: 'h-40' },
    { day: 'Wed', height: 'h-36' },
    { day: 'Thu', height: 'h-48' },
    { day: 'Fri', height: 'h-44' },
    { day: 'Sat', height: 'h-28' },
    { day: 'Sun', height: 'h-20' }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Productivity Analytics</h2>
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.id} className="bg-white/50 p-6 rounded-xl shadow-md text-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="text-white text-xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.title}</p>
                </div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="bg-white/70 p-6 rounded-xl shadow-inner">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Weekly Productivity</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded-lg text-sm">Week</button>
                <button className="px-3 py-1 bg-white/50 text-muted-foreground rounded-lg text-sm">Month</button>
                <button className="px-3 py-1 bg-white/50 text-muted-foreground rounded-lg text-sm">Year</button>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {weeklyData.map((data, index) => (
                <div key={data.day} className="flex flex-col items-center space-y-2">
                  <div className={`w-8 ${data.height} ${index >= 5 ? 'bg-muted' : 'bg-primary'} rounded-t-lg`}></div>
                  <span className="text-xs text-muted-foreground">{data.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsDashboard;
