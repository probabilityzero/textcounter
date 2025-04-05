import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="py-3 sm:py-4 px-3 sm:px-6 flex items-center justify-between bg-gray-100 dark:bg-gray-900 border-b border-border-color sticky top-0 z-10">
      <div className="flex items-center">
        <h1 className="text-xl sm:text-2xl font-light text-text-primary font-serif">
          Σ() Text Analysis
        </h1>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        <button
          onClick={toggleTheme}
          className="theme-toggle"
          aria-label="Toggle Theme"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
