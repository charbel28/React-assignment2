import React from 'react';

interface Task_prop {
  id: number;
  name: string;
  completed: boolean;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const Task: React.FC<Task_prop> = ({ id, name, completed, onToggle, onDelete }) => {
  return (
    <div>
      <input type="checkbox" checked={completed} onChange={() => onToggle(id)} />
      <span>{name}</span>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
};

export default Task;
