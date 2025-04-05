import React from 'react';
import { Moon, Sun, Download } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const exportAsText = () => {
    const content = localStorage.getItem('tabs');
    if (!content) return;
    
    try {
      const tabs = JSON.parse(content);
      const activeTab = tabs[0]?.content || '';
      
      const blob = new Blob([activeTab], { type: 'text/plain' });
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
    }
  };

  return (
    <header className="py-3 sm:py-4 px-3 sm:px-6 flex items-center justify-between bg-primary-header border-b border-border-color sticky top-0 z-10">
      <div className="flex items-center">
        <h1 className="text-xl sm:text-2xl font-light text-text-primary font-serif">
          Σ() Text Analysis
        </h1>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <button
          onClick={exportAsText}
          className="theme-toggle"
          aria-label="Export as Text"
          title="Export as Text"
        >
          <Download size={18} className="sm:size-20" />
        </button>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle Theme"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} className="sm:size-20" /> : <Moon size={18} className="sm:size-20" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
