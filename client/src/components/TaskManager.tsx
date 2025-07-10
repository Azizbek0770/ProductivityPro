import React, { useState, useEffect } from 'react';
import { FaCheck, FaPlus, FaTimes, FaEdit, FaTrash, FaCalendarAlt } from 'react-icons/fa';
import { useToast } from '../hooks/use-toast';

interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  status: 'todo' | 'inprogress' | 'completed';
  dueDate: string;
  progress?: number;
  createdAt: string;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as Task['priority'],
    dueDate: ''
  });
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const { toast } = useToast();

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Initialize with some sample tasks
      const initialTasks: Task[] = [
        {
          id: '1',
          title: 'Complete project proposal',
          description: 'Draft the Q1 project proposal for client review',
          priority: 'high',
          status: 'todo',
          dueDate: new Date().toISOString().split('T')[0],
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Review team feedback',
          description: 'Go through team feedback from last sprint',
          priority: 'medium',
          status: 'todo',
          dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Website redesign',
          description: 'Complete the new website design mockups',
          priority: 'high',
          status: 'inprogress',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          progress: 60,
          createdAt: new Date().toISOString()
        }
      ];
      setTasks(initialTasks);
      localStorage.setItem('tasks', JSON.stringify(initialTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = () => {
    if (!newTask.title.trim()) {
      toast({
        title: "Error",
        description: "Task title is required",
        duration: 2000,
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      priority: newTask.priority,
      status: 'todo',
      dueDate: newTask.dueDate,
      createdAt: new Date().toISOString()
    };

    setTasks([...tasks, task]);
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      dueDate: ''
    });
    setIsAddingTask(false);
    
    toast({
      title: "Task Added",
      description: `"${task.title}" has been added to your tasks`,
      duration: 2000,
    });
  };

  const deleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    setTasks(tasks.filter(t => t.id !== id));
    
    toast({
      title: "Task Deleted",
      description: `"${task?.title}" has been removed`,
      duration: 2000,
    });
  };

  const updateTaskStatus = (id: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
    
    const task = tasks.find(t => t.id === id);
    toast({
      title: "Task Updated",
      description: `"${task?.title}" moved to ${newStatus}`,
      duration: 2000,
    });
  };

  const updateTaskProgress = (id: string, progress: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, progress: Math.max(0, Math.min(100, progress)) } : task
    ));
  };

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
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">Task Manager</h3>
        <button
          onClick={() => setIsAddingTask(true)}
          className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
        >
          <FaPlus className="inline mr-2" />
          Add Task
        </button>
      </div>

      {/* Add Task Form */}
      {isAddingTask && (
        <div className="bg-white/50 p-6 rounded-xl shadow-md mb-6">
          <h4 className="text-lg font-semibold text-foreground mb-4">Add New Task</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Title</label>
              <input
                type="text"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter task title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={3}
                placeholder="Enter task description"
              />
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
                <select
                  value={newTask.priority}
                  onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as Task['priority'] })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-foreground mb-2">Due Date</label>
                <input
                  type="date"
                  value={newTask.dueDate}
                  onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={addTask}
                className="bg-gradient-to-r from-primary to-secondary text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Add Task
              </button>
              <button
                onClick={() => setIsAddingTask(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Task Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
          <div key={status} className="bg-white/30 backdrop-blur-[10px] border border-white/18 p-4 rounded-xl shadow-lg">
            <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center">
              <div className={`w-3 h-3 rounded-full mr-3 ${getStatusColor(status as Task['status'])}`}></div>
              {getStatusTitle(status as Task['status'])} ({statusTasks.length})
            </h4>
            <div className="space-y-3">
              {statusTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white/50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-semibold text-foreground">{task.title}</h5>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setEditingTask(task.id)}
                        className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                      >
                        <FaEdit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                      >
                        <FaTrash className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      {task.dueDate && (
                        <span className="text-xs text-muted-foreground flex items-center">
                          <FaCalendarAlt className="w-3 h-3 mr-1" />
                          {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <div className="flex space-x-1">
                      {task.status !== 'todo' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'todo')}
                          className="p-1 text-red-500 hover:text-red-700 transition-colors"
                          title="Move to To Do"
                        >
                          <FaTimes className="w-3 h-3" />
                        </button>
                      )}
                      {task.status !== 'inprogress' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'inprogress')}
                          className="p-1 text-yellow-500 hover:text-yellow-700 transition-colors"
                          title="Move to In Progress"
                        >
                          <FaEdit className="w-3 h-3" />
                        </button>
                      )}
                      {task.status !== 'completed' && (
                        <button
                          onClick={() => updateTaskStatus(task.id, 'completed')}
                          className="p-1 text-green-500 hover:text-green-700 transition-colors"
                          title="Mark as Completed"
                        >
                          <FaCheck className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                  {task.progress !== undefined && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className="text-xs text-muted-foreground">{task.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskManager;
