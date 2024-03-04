import React, { useState, useEffect } from 'react';
import Tabs from './components/Tabs';
import Task from './components/Task';

const App: React.FC = () => {
  const [activeTask, setActiveTask] = useState<string>('active');
  const [tasks, setTasks] = useState<{ id: number; name: string; completed: boolean }[]>([]);
  const [newTask, setNewTask] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [activeTask]);

  const handleTabChange = (tab: string) => {
    setActiveTask(tab);
  };

  const handleCreateTask = () => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [...prevTasks, { id: Date.now(), name: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleTask = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  const handleDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <div>
      <Tabs activeTask={activeTask} onTabChange={handleTabChange} />
      {activeTask === 'active' && (
        <div>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task name"
          />
          <button onClick={handleCreateTask} disabled={newTask.trim() === ''}>
            Create
          </button>
          {tasks.length === 0 && <div>No Active tasks.</div>}
          {tasks.map((task) => (
            <Task
              key={task.id}
              id={task.id}
              name={task.name}
              completed={task.completed}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}
      {activeTask === 'completed' && (
        <div>
          {tasks.filter((task) => task.completed).length === 0 && <div>No Completed Tasks.</div>}
          {tasks
            .filter((task) => task.completed)
            .map((task) => (
              <Task
                key={task.id}
                id={task.id}
                name={task.name}
                completed={task.completed}
                onToggle={handleToggleTask}
                onDelete={handleDeleteTask}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default App;