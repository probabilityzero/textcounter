import React from 'react';
import { X, Plus } from 'lucide-react';

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
    <div className="tab-container">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span>{tab.title}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
            className="tab-close-btn"
            aria-label="Close Tab"
          >
            <X size={16} />
          </button>
        </div>
      ))}
      <button
        onClick={addTab}
        className="add-tab-btn"
        aria-label="Add Tab"
        title="Add New Tab"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default Tabs;
