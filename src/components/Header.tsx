import React, { useRef } from 'react';
import { Moon, Sun, FileUp } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  handleFileUpload: (file: File) => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, handleFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
      // Reset the input so the same file can be uploaded again
      e.target.value = '';
    }
  };

  return (
    <header className="py-3 px-3 sm:px-6 flex items-center justify-between text-gray-100 dark:bg-gray-800 border-b border-border-color sticky top-0 z-10">
      <div className="flex items-center">
        <h1 className="text-xl sm:text-2xl font-light text-text-primary font-serif">
          Σ() Text Analysis
        </h1>
      </div>
      <div className="flex items-center space-x-1 sm:space-x-2">
        {/* File Upload Button */}
        <button
          onClick={triggerFileInput}
          className="theme-toggle"
          aria-label="Upload Text File"
          title="Upload Text File"
        >
          <FileUp size={16} />
        </button>
        
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".txt,.md,.csv,.json,.html,.css,.js,.ts,.jsx,.tsx"
          onChange={onFileChange}
          style={{ display: 'none' }}
          aria-hidden="true"
        />
        
        {/* Theme Toggle Button */}
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
