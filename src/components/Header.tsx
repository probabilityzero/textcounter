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
    <header className="py-4 px-6 flex items-center justify-between bg-gray-200 dark:bg-[#090909] border-b border-gray-300 dark:border-gray-900">
      <div className="flex items-center">
        <h1 className="text-2xl font-light text-gray-800 dark:text-[#ddcdbc] font-serif">
          Σ() Text Count
        </h1>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={exportAsText}
          className="theme-toggle"
          aria-label="Export as Text"
          title="Export as Text"
        >
          <Download size={20} />
        </button>
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle Theme"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
