import React from 'react';

interface TabsProps {
  activeTask: string;
  onTabChange: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTask, onTabChange }) => {
  return (
    <div>
      <button onClick={() => onTabChange('active')} disabled={activeTask === 'active'}>
        Active Tasks
      </button>
      <button onClick={() => onTabChange('completed')} disabled={activeTask === 'completed'}>
        Completed Tasks
      </button>
    </div>
  );
};

export default Tabs;
