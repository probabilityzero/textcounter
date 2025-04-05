import React, { useState } from 'react';
import { 
  TextQuote, ArrowDownAZ, ArrowUpAZ, Scissors, 
  Replace, RefreshCcw, Type, Braces, SortDesc, 
  AlignLeft, AlignCenter, AlignRight, Dices, Hash
} from 'lucide-react';

interface TextToolsProps {
  isOpen: boolean;
  activeTabContent: string;
  updateTabContent: (content: string) => void;
}

const TextTools: React.FC<TextToolsProps> = ({ isOpen, activeTabContent, updateTabContent }) => {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [showFindReplace, setShowFindReplace] = useState(false);

  // Simple tools that don't need additional UI
  const tools = [
    {
      name: 'UPPERCASE',
      icon: <ArrowUpAZ size={16} />,
      action: () => updateTabContent(activeTabContent.toUpperCase()),
      description: 'Convert all text to uppercase'
    },
    {
      name: 'lowercase',
      icon: <ArrowDownAZ size={16} />,
      action: () => updateTabContent(activeTabContent.toLowerCase()),
      description: 'Convert all text to lowercase'
    },
    {
      name: 'Title Case',
      icon: <TextQuote size={16} />,
      action: () => updateTabContent(
        activeTabContent.replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
      ),
      description: 'Capitalize first letter of each word'
    },
    {
      name: 'Trim Spaces',
      icon: <Scissors size={16} />,
      action: () => updateTabContent(activeTabContent.trim()),
      description: 'Remove leading and trailing spaces'
    },
    {
      name: 'Remove Extra Spaces',
      icon: <Type size={16} />,
      action: () => updateTabContent(activeTabContent.replace(/\s+/g, ' ').trim()),
      description: 'Replace multiple spaces with a single space'
    },
    {
      name: 'Find & Replace',
      icon: <Replace size={16} />,
      action: () => setShowFindReplace(!showFindReplace),
      description: 'Find and replace text',
      isToggle: true,
      active: showFindReplace
    },
    {
      name: 'Reverse Text',
      icon: <RefreshCcw size={16} />,
      action: () => updateTabContent(activeTabContent.split('').reverse().join('')),
      description: 'Reverse the order of characters'
    },
    {
      name: 'Reverse Words',
      icon: <SortDesc size={16} />,
      action: () => updateTabContent(
        activeTabContent.split(/\s+/).reverse().join(' ')
      ),
      description: 'Reverse the order of words'
    },
    {
      name: 'Format JSON',
      icon: <Braces size={16} />,
      action: () => {
        try {
          const parsed = JSON.parse(activeTabContent);
          updateTabContent(JSON.stringify(parsed, null, 2));
        } catch (e) {
          alert('Invalid JSON format');
        }
      },
      description: 'Format and indent JSON'
    },
    {
      name: 'Left Align',
      icon: <AlignLeft size={16} />,
      action: () => {
        const lines = activeTabContent.split('\n');
        const trimmed = lines.map(line => line.trimStart());
        updateTabContent(trimmed.join('\n'));
      },
      description: 'Align text to the left'
    },
    {
      name: 'Center Align',
      icon: <AlignCenter size={16} />,
      action: () => {
        const lines = activeTabContent.split('\n');
        const maxLength = Math.max(...lines.map(line => line.trim().length));
        const centered = lines.map(line => {
          const trimmed = line.trim();
          const padding = Math.max(0, Math.floor((maxLength - trimmed.length) / 2));
          return ' '.repeat(padding) + trimmed;
        });
        updateTabContent(centered.join('\n'));
      },
      description: 'Center align text (within each line)'
    },
    {
      name: 'Right Align',
      icon: <AlignRight size={16} />,
      action: () => {
        const lines = activeTabContent.split('\n');
        const maxLength = Math.max(...lines.map(line => line.length));
        const rightAligned = lines.map(line => {
          const trimmed = line.trim();
          const padding = Math.max(0, maxLength - trimmed.length);
          return ' '.repeat(padding) + trimmed;
        });
        updateTabContent(rightAligned.join('\n'));
      },
      description: 'Align text to the right'
    },
    {
      name: 'Random Case',
      icon: <Dices size={16} />,
      action: () => {
        const chars = activeTabContent.split('');
        const randomized = chars.map(char => 
          Math.random() > 0.5 ? char.toUpperCase() : char.toLowerCase()
        );
        updateTabContent(randomized.join(''));
      },
      description: 'Randomly capitalize letters'
    },
    {
      name: 'Count Words',
      icon: <Hash size={16} />,
      action: () => {
        const wordCount = activeTabContent.trim().split(/\s+/).filter(Boolean).length;
        alert(`Word count: ${wordCount}`);
      },
      description: 'Show quick word count'
    }
  ];

  const handleFindReplace = () => {
    if (!findText) return;
    
    // Use global regex to replace all instances
    const regex = new RegExp(findText, 'g');
    const newContent = activeTabContent.replace(regex, replaceText);
    updateTabContent(newContent);
  };

  if (!isOpen) return null;

  return (
    <div className="text-tools-container bg-card-bg border-b border-border-color p-3 sm:p-4">
      <h2 className="text-lg font-medium mb-3 text-text-accent">Text Tools</h2>
      
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => (
          <button
            key={tool.name}
            onClick={tool.action}
            className={`tool-button flex items-center gap-1 px-3 py-2 rounded text-sm
              ${tool.active ? 'bg-accent text-white' : 'bg-row-bg hover:bg-alt-row-bg'}
              transition-colors`}
            title={tool.description}
          >
            {tool.icon}
            <span className="hidden sm:inline">{tool.name}</span>
          </button>
        ))}
      </div>
      
      {showFindReplace && (
        <div className="find-replace-container mt-4 p-3 bg-alt-row-bg rounded">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            <div>
              <label htmlFor="find-text" className="block text-sm mb-1">Find</label>
              <input
                id="find-text"
                type="text"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                className="w-full px-3 py-2 bg-bg-primary border border-border-color rounded"
                placeholder="Text to find..."
              />
            </div>
            <div>
              <label htmlFor="replace-text" className="block text-sm mb-1">Replace</label>
              <input
                id="replace-text"
                type="text"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                className="w-full px-3 py-2 bg-bg-primary border border-border-color rounded"
                placeholder="Replace with..."
              />
            </div>
          </div>
          <button
            onClick={handleFindReplace}
            className="px-3 py-2 bg-accent text-white rounded hover:bg-accent-dark transition-colors"
          >
            Replace All
          </button>
        </div>
      )}
    </div>
  );
};

export default TextTools;