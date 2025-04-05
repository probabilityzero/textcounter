import React, { useState } from 'react';
import { 
  TextQuote, ArrowDownAZ, ArrowUpAZ, Scissors, 
  Replace, RefreshCcw, Type, Braces, SortDesc, 
  AlignLeft, AlignCenter, AlignRight, Dices, Hash,
  FileDown, Copy, Trash
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
      // Optional: show success message
      const copyBtn = document.getElementById('copy-btn');
      if (copyBtn) {
        const originalText = copyBtn.querySelector('span')?.textContent;
        const originalClassName = copyBtn.className;
        
        copyBtn.className = 'tool-button flex items-center gap-1 px-3 py-2 rounded text-sm bg-green-500 text-white transition-colors';
        copyBtn.querySelector('span')?.replaceWith(document.createTextNode('Copied!'));
        
        setTimeout(() => {
          copyBtn.className = originalClassName;
          if (originalText) {
            copyBtn.querySelector('span')?.replaceWith(document.createTextNode(originalText));
          }
        }, 1500);
      }
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
  };

  // Simple tools that don't need additional UI
  const tools = [
    // File operations section
    {
      name: 'Export Text',
      icon: <FileDown size={16} />,
      action: exportAsText,
      description: 'Export content as text file',
      category: 'file'
    },
    {
      name: 'Copy All',
      icon: <Copy size={16} />,
      action: copyToClipboard,
      description: 'Copy all text to clipboard',
      category: 'file',
      id: 'copy-btn'
    },
    {
      name: 'Clear All',
      icon: <Trash size={16} />,
      action: clearText,
      description: 'Clear all text',
      category: 'file'
    },
    
    // Text transformation section
    {
      name: 'UPPERCASE',
      icon: <ArrowUpAZ size={16} />,
      action: () => updateTabContent(activeTabContent.toUpperCase()),
      description: 'Convert all text to uppercase',
      category: 'format'
    },
    {
      name: 'lowercase',
      icon: <ArrowDownAZ size={16} />,
      action: () => updateTabContent(activeTabContent.toLowerCase()),
      description: 'Convert all text to lowercase',
      category: 'format'
    },
    {
      name: 'Title Case',
      icon: <TextQuote size={16} />,
      action: () => updateTabContent(
        activeTabContent.replace(/\w\S*/g, (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        })
      ),
      description: 'Capitalize first letter of each word',
      category: 'format'
    },
    
    // Space handling section
    {
      name: 'Trim Spaces',
      icon: <Scissors size={16} />,
      action: () => updateTabContent(activeTabContent.trim()),
      description: 'Remove leading and trailing spaces',
      category: 'format'
    },
    {
      name: 'Remove Extra Spaces',
      icon: <Type size={16} />,
      action: () => updateTabContent(activeTabContent.replace(/\s+/g, ' ').trim()),
      description: 'Replace multiple spaces with a single space',
      category: 'format'
    },
    
    // Advanced operations
    {
      name: 'Find & Replace',
      icon: <Replace size={16} />,
      action: () => setShowFindReplace(!showFindReplace),
      description: 'Find and replace text',
      isToggle: true,
      active: showFindReplace,
      category: 'advanced'
    },
    {
      name: 'Reverse Text',
      icon: <RefreshCcw size={16} />,
      action: () => updateTabContent(activeTabContent.split('').reverse().join('')),
      description: 'Reverse the order of characters',
      category: 'advanced'
    },
    {
      name: 'Reverse Words',
      icon: <SortDesc size={16} />,
      action: () => updateTabContent(
        activeTabContent.split(/\s+/).reverse().join(' ')
      ),
      description: 'Reverse the order of words',
      category: 'advanced'
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
      description: 'Format and indent JSON',
      category: 'advanced'
    },
    
    // Alignment section
    {
      name: 'Left Align',
      icon: <AlignLeft size={16} />,
      action: () => {
        const lines = activeTabContent.split('\n');
        const trimmed = lines.map(line => line.trimStart());
        updateTabContent(trimmed.join('\n'));
      },
      description: 'Align text to the left',
      category: 'align'
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
      description: 'Center align text (within each line)',
      category: 'align'
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
      description: 'Align text to the right',
      category: 'align'
    },
    
    // Misc section
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
      description: 'Randomly capitalize letters',
      category: 'misc'
    },
    {
      name: 'Count Words',
      icon: <Hash size={16} />,
      action: () => {
        const wordCount = activeTabContent.trim().split(/\s+/).filter(Boolean).length;
        alert(`Word count: ${wordCount}`);
      },
      description: 'Show quick word count',
      category: 'misc'
    }
  ];

  // Group tools by category
  const fileTools = tools.filter(tool => tool.category === 'file');
  const formatTools = tools.filter(tool => tool.category === 'format');
  const advancedTools = tools.filter(tool => tool.category === 'advanced');
  const alignTools = tools.filter(tool => tool.category === 'align');
  const miscTools = tools.filter(tool => tool.category === 'misc');

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
        <div className="flex flex-wrap gap-2">
          {fileTools.map((tool) => (
            <button
              key={tool.name}
              id={tool.id}
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
      
      {/* Text Formatting */}
      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {formatTools.map((tool) => (
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
      </div>
      
      {/* Text Alignment */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2 text-text-secondary">Text Alignment</h3>
        <div className="flex flex-wrap gap-2">
          {alignTools.map((tool) => (
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
      </div>
      
      {/* Advanced Operations */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2 text-text-secondary">Advanced Operations</h3>
        <div className="flex flex-wrap gap-2">
          {advancedTools.map((tool) => (
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
      </div>
      
      {/* Miscellaneous */}
      <div className="mb-4">
        <h3 className="text-sm font-medium mb-2 text-text-secondary">Miscellaneous</h3>
        <div className="flex flex-wrap gap-2">
          {miscTools.map((tool) => (
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
      </div>
      
      {/* Find & Replace Panel */}
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