import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="py-4 px-6 flex items-center justify-center bg-gray-200 dark:bg-[#090909] border-b border-gray-300 dark:border-gray-900">
      <h1 className="text-2xl font-light text-gray-800 dark:text-[#ddcdbc] bg-orange-50 dark:bg-[#090909] font-serif">
        Σ() Text Count
      </h1>
      {/* <button
        onClick={toggleTheme}
        className="text-gray-600 hover:text-gray-800 dark:text-[#f5d0a9] dark:hover:text-amber-400 focus:outline-none"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button> */}
    </header>
  );
};

export default Header;
