import React, { useState } from 'react';
import { 
  X, Plus, TextQuote, ArrowDownAZ, ArrowUpAZ, 
  Scissors, Replace, FileDown, Copy, Trash, Settings2
} from 'lucide-react';

interface TabsProps {
  tabs: { id: string; title: string; content: string }[];
  activeTab: string;
  setActiveTab: (id: string) => void;
  addTab: () => void;
  closeTab: (id: string) => void;
  activeTabContent: string;
  updateTabContent: (content: string) => void;
  toggleTools: () => void;
  toolsOpen: boolean;
}

const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  addTab,
  closeTab,
  activeTabContent,
  updateTabContent,
  toggleTools,
  toolsOpen,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Quick text operations
  const quickTools = [
    {
      name: 'UPPERCASE',
      icon: <ArrowUpAZ size={16} />,
      action: () => updateTabContent(activeTabContent.toUpperCase()),
      tooltip: 'Convert to uppercase'
    },
    {
      name: 'lowercase',
      icon: <ArrowDownAZ size={16} />,
      action: () => updateTabContent(activeTabContent.toLowerCase()),
      tooltip: 'Convert to lowercase'
    },
    {
      name: 'Title Case',
      icon: <TextQuote size={16} />,
      action: () => updateTabContent(
        activeTabContent.replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
      ),
      tooltip: 'Convert to title case'
    },
    {
      name: 'Trim',
      icon: <Scissors size={16} />,
      action: () => updateTabContent(activeTabContent.trim()),
      tooltip: 'Trim whitespace'
    }
  ];

  // File operations
  const exportAsText = () => {
    if (!activeTabContent.trim()) {
      alert('There is no content to export');
      return;
    }
    
    try {
      const blob = new Blob([activeTabContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'text-content.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setShowDropdown(false);
    } catch (e) {
      console.error('Error exporting content', e);
      alert('Failed to export content');
    }
  };

  const copyToClipboard = async () => {
    if (!activeTabContent.trim()) {
      alert('There is no content to copy');
      return;
    }
    
    try {
      await navigator.clipboard.writeText(activeTabContent);
      
      // Show feedback
      const copyButton = document.getElementById('copy-button');
      if (copyButton) {
        const originalHTML = copyButton.innerHTML;
        copyButton.innerHTML = '<span class="text-green-500">Copied!</span>';
        setTimeout(() => {
          copyButton.innerHTML = originalHTML;
        }, 1500);
      }
      
      setShowDropdown(false);
    } catch (e) {
      console.error('Error copying to clipboard:', e);
      alert('Failed to copy to clipboard');
    }
  };

  const clearText = () => {
    if (!activeTabContent.trim() || !confirm('Are you sure you want to clear all text?')) {
      return;
    }
    updateTabContent('');
    setShowDropdown(false);
  };

  // Close dropdown when clicking outside
  const handleClickOutside = () => {
    setShowDropdown(false);
  };

  return (
    <div className="relative">
      {/* Tab container with tabs */}
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
        
        {/* Spacer div to push tools to the right */}
        <div className="flex-grow"></div>
        
        {/* Quick tools section */}
        <div className="quick-tools hidden sm:flex">
          {quickTools.map((tool) => (
            <button
              key={tool.name}
              onClick={tool.action}
              className="quick-tool-btn"
              title={tool.tooltip}
            >
              {tool.icon}
            </button>
          ))}
        </div>
        
        {/* File operations dropdown */}
        <div className="relative ml-2">
          <button 
            className="tab-menu-btn"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="File operations"
            aria-expanded={showDropdown}
            aria-haspopup="menu"
          >
            ⋮
          </button>
          
          {showDropdown && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={handleClickOutside}
              ></div>
              <div className="dropdown-menu">
                <button 
                  className="dropdown-item" 
                  onClick={exportAsText}
                >
                  <FileDown size={16} />
                  <span>Export as Text</span>
                </button>
                <button 
                  className="dropdown-item"
                  onClick={copyToClipboard}
                  id="copy-button"
                >
                  <Copy size={16} />
                  <span>Copy All</span>
                </button>
                <button 
                  className="dropdown-item"
                  onClick={clearText}
                >
                  <Trash size={16} />
                  <span>Clear Text</span>
                </button>
                <div className="dropdown-divider"></div>
                <button 
                  className="dropdown-item"
                  onClick={toggleTools}
                >
                  <Settings2 size={16} />
                  <span>All Tools {toolsOpen ? '(Close)' : ''}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
