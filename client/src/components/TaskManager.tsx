import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'inprogress' | 'completed';
  dueDate: string;
  progress?: number;
}

const TaskManager: React.FC = () => {
  const [tasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Complete project proposal',
      description: 'Due: Today',
      priority: 'high',
      status: 'todo',
      dueDate: 'Today'
    },
    {
      id: '2',
      title: 'Review team feedback',
      description: 'Due: Tomorrow',
      priority: 'medium',
      status: 'todo',
      dueDate: 'Tomorrow'
    },
    {
      id: '3',
      title: 'Website redesign',
      description: '60% complete',
      priority: 'high',
      status: 'inprogress',
      dueDate: 'This week',
      progress: 60
    },
    {
      id: '4',
      title: 'Client meeting',
      description: 'Completed yesterday',
      priority: 'medium',
      status: 'completed',
      dueDate: 'Yesterday'
    },
    {
      id: '5',
      title: 'Email responses',
      description: 'Completed 2 days ago',
      priority: 'low',
      status: 'completed',
      dueDate: '2 days ago'
    }
  ]);

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'todo': return 'bg-red-500';
      case 'inprogress': return 'bg-yellow-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusTitle = (status: Task['status']) => {
    switch (status) {
      case 'todo': return 'To Do';
      case 'inprogress': return 'In Progress';
      case 'completed': return 'Completed';
      default: return 'Unknown';
    }
  };

  const tasksByStatus = {
    todo: tasks.filter(task => task.status === 'todo'),
    inprogress: tasks.filter(task => task.status === 'inprogress'),
    completed: tasks.filter(task => task.status === 'completed')
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-foreground mb-8 text-center">Smart Task Management</h2>
        <div className="bg-white/25 backdrop-blur-[10px] border border-white/18 p-8 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
              <div key={status} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center">
                  <div className={`w-3 h-3 ${getStatusColor(status as Task['status'])} rounded-full mr-3`}></div>
                  {getStatusTitle(status as Task['status'])}
                </h3>
                <div className="space-y-3">
                  {statusTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white/50 p-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {task.status === 'completed' ? (
                            <FaCheck className="text-green-500 mr-3" />
                          ) : task.status === 'inprogress' ? (
                            <div className="w-4 h-4 bg-primary rounded-full mr-3 animate-pulse"></div>
                          ) : (
                            <input type="checkbox" className="mr-3 rounded" />
                          )}
                          <div>
                            <h4 className={`font-medium text-foreground ${task.status === 'completed' ? 'line-through' : ''}`}>
                              {task.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">{task.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          {task.status === 'inprogress' ? (
                            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">Active</span>
                          ) : task.status === 'todo' ? (
                            <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskManager;
