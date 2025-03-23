import React from 'react';
  import { X } from 'lucide-react';

  interface TabsProps {
    tabs: { id: string; title: string; content: string }[];
    activeTab: string;
    setActiveTab: (id: string) => void;
    addTab: () => void;
    closeTab: (id: string) => void;
  }

  const Tabs: React.FC<TabsProps> = ({
    tabs,
    activeTab,
    setActiveTab,
    addTab,
    closeTab,
  }) => {
    return (
      <div className="flex ml-1 flex-wrap border-b border-gray-300 dark:border-gray-700">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`flex items-center rounded-t-md px-4 py-1 text-sm cursor-pointer ${
              activeTab === tab.id
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                : 'bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            } border-r border-gray-300 dark:border-gray-700 last:border-r-0`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.title}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
              className="ml-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Close Tab"
            >
              <X size={16} className='hover:bg-red-600 rounded-full' />
            </button>
          </div>
        ))}
        <button
          onClick={addTab}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
          aria-label="Add Tab"
        >
          +
        </button>
      </div>
    );
  };

  export default Tabs;
