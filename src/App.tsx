import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Textarea from './components/Textarea';
import Stats from './components/Stats';
import MostUsedWords from './components/MostUsedWords';
import AdditionalStats from './components/AdditionalStats'; // Import
import { analyzeText } from './utils/textAnalysis';

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string') {
      return storedPrefs;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }

  return 'light'; // light theme as the default;
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme);
  const [tabs, setTabs] = useState<{ id: string; title: string; content: string }[]>([
    { id: '1', title: 'Tab 1', content: '' },
  ]);
  const [activeTab, setActiveTab] = useState<string>('1');

  useEffect(() => {
    const storedTabs = localStorage.getItem('tabs');
    if (storedTabs) {
      setTabs(JSON.parse(storedTabs));
      setActiveTab(JSON.parse(storedTabs)[0].id); // Set the first tab as active
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

    useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('color-theme', newTheme);
    }
  };

  const addTab = () => {
    const newTabId = Date.now().toString();
    setTabs([...tabs, { id: newTabId, title: `Tab ${tabs.length + 1}`, content: '' }]);
    setActiveTab(newTabId);
  };

  const closeTab = (id: string) => {
    const updatedTabs = tabs.filter((tab) => tab.id !== id);
    setTabs(updatedTabs);
    if (updatedTabs.length > 0 && activeTab === id) {
      setActiveTab(updatedTabs[0].id);
    }
  };

  const updateTabContent = (id: string, content: string) => {
    const updatedTabs = tabs.map((tab) =>
      tab.id === id ? { ...tab, content } : tab
    );
    setTabs(updatedTabs);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content || '';
  const {
    wordCount,
    sentenceCount,
    paragraphCount,
    characterCount,
    spaceCount,
    mostUsedWords,
    readingTime,
    uniqueWordCount,
    averageWordLength,
    longestWord,
    shortestWord,
    lexicalDensity, // Added
  } = analyzeText(activeTabContent);

  return (
    // <div className={`min-h-screen ${theme === 'dark' ? 'bg-black text-[#f5d0a9]' : 'bg-white text-amber-100'}`}>
    <div className={`min-h-screen bg-black text-[#f5d0a9]`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="mx-auto p-1">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          addTab={addTab}
          closeTab={closeTab}
        />
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2">
            <Textarea
              content={activeTabContent}
              onChange={(value) => updateTabContent(activeTab, value)}
            />
          </div>
          <div className="md:col-span-1 p-2">
            <Stats
              wordCount={wordCount}
              sentenceCount={sentenceCount}
              paragraphCount={paragraphCount}
              characterCount={characterCount}
              spaceCount={spaceCount}
              readingTime={readingTime}
            />
            <AdditionalStats // Added
              uniqueWordCount={uniqueWordCount}
              averageWordLength={averageWordLength}
              longestWord={longestWord}
              shortestWord={shortestWord}
              lexicalDensity={lexicalDensity}
            />
            <MostUsedWords mostUsedWords={mostUsedWords} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
