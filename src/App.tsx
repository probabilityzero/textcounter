import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Textarea from './components/Textarea';
import StatsTabs from './components/StatsTabs';
import Visualization from './components/Visualization';
import TextTools from './components/TextTools';
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
  const [toolsOpen, setToolsOpen] = useState<boolean>(false);

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

  const toggleTools = () => {
    setToolsOpen(!toolsOpen);
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
    sentimentScore,
    emotionTones,
    readability,
    readabilityScore,
    formality,
    formalityScore,
    topicSuggestions,
    wordFrequency,
  } = analyzeTextEnhanced(activeTabContent);

  const toggleStatsExpansion = () => {
    setExpandedStats(!expandedStats);
  };

  return (
    <div className="min-h-screen">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        toggleTools={toggleTools}
        toolsOpen={toolsOpen}
      />
      
      <div className="container mx-auto p-2 sm:p-4">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          addTab={addTab}
          closeTab={closeTab}
        />
        
        {/* Text Tools Panel */}
        <TextTools 
          isOpen={toolsOpen} 
          activeTabContent={activeTabContent}
          updateTabContent={(content) => updateTabContent(activeTab, content)}
        />
        
        {/* Mobile layout */}
        <div className="md:hidden layout-container">
          <div className="content-container mb-4">
            <Textarea
              content={activeTabContent}
              onChange={(value) => updateTabContent(activeTab, value)}
            />
          </div>
          
          <div className="stats-container mb-4">
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
              sentimentScore={sentimentScore}
              emotionTones={emotionTones}
              readability={readability}
              readabilityScore={readabilityScore}
              formality={formality}
              formalityScore={formalityScore}
              topicSuggestions={topicSuggestions}
              wordFrequency={wordFrequency}
            />
          </div>
          <Visualization wordFrequency={wordFrequency} />
        </div>
        
        {/* Desktop layout - 3:1 ratio */}
        <div className="hidden md:block">
          {/* Editor row (full width) */}
          <div className="mb-4">
            <Textarea
              content={activeTabContent}
              onChange={(value) => updateTabContent(activeTab, value)}
            />
          </div>
          
          {/* Stats and visualization row (full width, divided into 3:1) */}
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-3">
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
                sentimentScore={sentimentScore}
                emotionTones={emotionTones}
                readability={readability}
                readabilityScore={readabilityScore}
                formality={formality}
                formalityScore={formalityScore}
                topicSuggestions={topicSuggestions}
                wordFrequency={wordFrequency}
              />
            </div>
            <div className="col-span-1">
              <Visualization wordFrequency={wordFrequency} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
