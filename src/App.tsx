import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Textarea from './components/Textarea';
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
  const [expandedStats, setExpandedStats] = useState<boolean>(false);

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

  const toggleStatsExpansion = () => {
    setExpandedStats(!expandedStats);
  };

  return (
    <div className="min-h-screen">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <div className="container mx-auto p-2 sm:p-4">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          addTab={addTab}
          closeTab={closeTab}
        />
        
        {/* Mobile-first layout with different order */}
        <div className="layout-container">
          <div className="stats-container md:hidden">
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
          </div>
          
          <div className="content-container">
            <Textarea
              content={activeTabContent}
              onChange={(value) => updateTabContent(activeTab, value)}
            />
          </div>
        </div>
        
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-3 gap-4 mt-4">
          <div className="md:col-span-2">
            {/* Editor already shown above for mobile */}
          </div>
          <div className="md:col-span-1">
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
          </div>
        </div>
      </div>
      
      {expandedStats && <div className="overlay" onClick={toggleStatsExpansion} />}
    </div>
  );
};

export default App;
