import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Textarea from './components/Textarea';
import Stats from './components/Stats';
import MostUsedWords from './components/MostUsedWords';
import AdditionalStats from './components/AdditionalStats';
import StatsTabs from './components/StatsTabs';
import { analyzeText } from './utils/textAnalysis';
import { analyzeTextEnhanced } from './utils/enhancedTextAnalysis';
import './styles/globals.css';

const getInitialTheme = (): 'light' | 'dark' => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme');
    if (typeof storedPrefs === 'string' && (storedPrefs === 'light' || storedPrefs === 'dark')) {
      return storedPrefs;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
    if (userMedia.matches) {
      return 'dark';
    }
  }

  return 'light';
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme());
  const [tabs, setTabs] = useState<{ id: string; title: string; content: string }[]>([
    { id: '1', title: 'Tab 1', content: '' },
  ]);
  const [activeTab, setActiveTab] = useState<string>('1');
  const [showLegacy, setShowLegacy] = useState<boolean>(false);

  useEffect(() => {
    const storedTabs = localStorage.getItem('tabs');
    if (storedTabs) {
      try {
        const parsedTabs = JSON.parse(storedTabs);
        if (Array.isArray(parsedTabs) && parsedTabs.length > 0) {
          setTabs(parsedTabs);
          setActiveTab(parsedTabs[0].id);
        }
      } catch (error) {
        console.error("Failed to parse stored tabs:", error);
      }
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
  
  // Basic text analysis
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
    lexicalDensity,
  } = analyzeText(activeTabContent);
  
  // Enhanced text analysis
  const {
    sentiment,
    readability,
    readabilityScore,
    topicSuggestions,
    wordFrequency,
  } = analyzeTextEnhanced(activeTabContent);

  return (
    <div className="min-h-screen">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="mx-auto p-4">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          addTab={addTab}
          closeTab={closeTab}
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <Textarea
              content={activeTabContent}
              onChange={(value) => updateTabContent(activeTab, value)}
            />
          </div>
          <div className="md:col-span-1 flex flex-col gap-4">
            <div className="flex justify-end mb-2">
              <button 
                onClick={() => setShowLegacy(!showLegacy)}
                className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {showLegacy ? "Use Modern View" : "Use Legacy View"}
              </button>
            </div>
            
            {showLegacy ? (
              <>
                <Stats
                  wordCount={wordCount}
                  sentenceCount={sentenceCount}
                  paragraphCount={paragraphCount}
                  characterCount={characterCount}
                  spaceCount={spaceCount}
                  readingTime={readingTime}
                />
                <AdditionalStats
                  uniqueWordCount={uniqueWordCount}
                  averageWordLength={averageWordLength}
                  longestWord={longestWord}
                  shortestWord={shortestWord}
                  lexicalDensity={lexicalDensity}
                />
                <MostUsedWords mostUsedWords={mostUsedWords} />
              </>
            ) : (
              <StatsTabs
                wordCount={wordCount}
                sentenceCount={sentenceCount}
                paragraphCount={paragraphCount}
                characterCount={characterCount}
                spaceCount={spaceCount}
                readingTime={readingTime}
                uniqueWordCount={uniqueWordCount}
                averageWordLength={averageWordLength}
                longestWord={longestWord}
                shortestWord={shortestWord}
                lexicalDensity={lexicalDensity}
                mostUsedWords={mostUsedWords}
                sentiment={sentiment}
                readability={readability}
                readabilityScore={readabilityScore}
                topicSuggestions={topicSuggestions}
                wordFrequency={wordFrequency}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
