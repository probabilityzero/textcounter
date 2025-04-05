import React, { useState, useEffect, useCallback } from 'react';
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
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  
  // Analysis results - move to state to prevent excessive recalculations
  const [analysisResults, setAnalysisResults] = useState({
    wordCount: 0,
    sentenceCount: 0,
    paragraphCount: 0,
    characterCount: 0,
    spaceCount: 0,
    mostUsedWords: [] as { word: string; count: number }[],
    readingTime: 0,
    uniqueWordCount: 0,
    averageWordLength: 0,
    longestWord: '',
    shortestWord: '',
    lexicalDensity: 0,
    sentiment: 'Neutral',
    sentimentScore: 0.5,
    emotionTones: [] as string[],
    readability: 'Average',
    readabilityScore: 50,
    formality: 'Neutral',
    formalityScore: 0.5,
    topicSuggestions: [] as string[],
    wordFrequency: {} as { [key: string]: number }
  });

  // Load tabs from localStorage on initial load
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

  // Save tabs to localStorage when they change
  useEffect(() => {
    localStorage.setItem('tabs', JSON.stringify(tabs));
  }, [tabs]);

  // Handle theme changes
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Debounce text analysis to prevent freezing
  useEffect(() => {
    const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content || '';
    
    // If we're currently analyzing, or the content is empty, skip
    if (isAnalyzing || activeTabContent.length === 0) return;
    
    // For very large text, use a debounce
    const isLargeText = activeTabContent.length > 10000;
    
    const timer = setTimeout(() => {
      setIsAnalyzing(true);
      
      try {
        // Wrap in a requestAnimationFrame and Promise to prevent blocking the UI thread
        window.requestAnimationFrame(() => {
          Promise.resolve().then(() => {
            // Basic text analysis
            const basicAnalysis = analyzeText(activeTabContent);
            
            // For large text, only do enhanced analysis if really necessary
            if (isLargeText && activeTabContent.length > 50000) {
              // For extremely large texts, just do basic analysis
              setAnalysisResults({
                ...basicAnalysis,
                sentiment: 'Analysis limited',
                sentimentScore: 0.5,
                emotionTones: [],
                readability: 'Analysis limited',
                readabilityScore: 50,
                formality: 'Analysis limited',
                formalityScore: 0.5,
                topicSuggestions: [],
                wordFrequency: basicAnalysis.mostUsedWords.reduce((acc, { word, count }) => {
                  acc[word] = count;
                  return acc;
                }, {} as { [key: string]: number })
              });
            } else {
              // Enhanced text analysis for reasonable-sized text
              const enhancedAnalysis = analyzeTextEnhanced(activeTabContent);
              setAnalysisResults({
                ...basicAnalysis,
                ...enhancedAnalysis
              });
            }
            
            setIsAnalyzing(false);
          });
        });
      } catch (error) {
        console.error("Error during text analysis:", error);
        setIsAnalyzing(false);
      }
    }, isLargeText ? 500 : 100); // Longer debounce for larger text
    
    return () => clearTimeout(timer);
  }, [tabs, activeTab]);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem('color-theme', newTheme);
    }
  }, [theme]);

  const toggleTools = useCallback(() => {
    setToolsOpen(prev => !prev);
  }, []);

  const addTab = useCallback(() => {
    const newTabId = Date.now().toString();
    setTabs(prev => [...prev, { id: newTabId, title: `Tab ${prev.length + 1}`, content: '' }]);
    setActiveTab(newTabId);
  }, []);

  const closeTab = useCallback((id: string) => {
    setTabs(prev => {
      const updatedTabs = prev.filter(tab => tab.id !== id);
      if (updatedTabs.length > 0 && activeTab === id) {
        setActiveTab(updatedTabs[0].id);
      }
      return updatedTabs;
    });
  }, [activeTab]);

  const updateTabContent = useCallback((id: string, content: string) => {
    // Don't set the content if it hasn't changed
    const currentContent = tabs.find(tab => tab.id === id)?.content;
    if (currentContent === content) return;
    
    setTabs(prev => 
      prev.map(tab => tab.id === id ? { ...tab, content } : tab)
    );
  }, [tabs]);

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content || '';

  // File upload handler
  const handleFileUpload = useCallback(async (file: File) => {
    try {
      // For large files, show loading indication
      if (file.size > 1000000) { // 1MB
        // Consider adding a loading indicator here
        console.log('Loading large file...');
      }
      
      // Read the file content in a non-blocking way
      const text = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string || '');
        reader.onerror = reject;
        
        // Use readAsText for better performance with large files
        reader.readAsText(file);
      });
      
      // Create a tab name from the first 6 characters of the filename
      let fileName = file.name.replace(/\.[^/.]+$/, ""); // Remove extension
      if (fileName.length > 6) {
        fileName = fileName.substring(0, 6);
      }
      
      // If there's already content in the active tab, create a new tab
      if (activeTabContent.trim().length > 0) {
        const newTabId = Date.now().toString();
        setTabs(prev => [...prev, { id: newTabId, title: fileName, content: text }]);
        setActiveTab(newTabId);
      } else {
        // Otherwise, update the current tab
        setTabs(prev => 
          prev.map(tab => tab.id === activeTab ? { ...tab, title: fileName, content: text } : tab)
        );
      }
    } catch (error) {
      console.error('Error reading uploaded file:', error);
      alert('Failed to read the uploaded file. Please try again.');
    }
  }, [activeTab, activeTabContent]);

  return (
    <div className="min-h-screen">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        toggleTools={toggleTools}
        toolsOpen={toolsOpen}
        handleFileUpload={handleFileUpload}
      />
      
      <div className="container mx-auto p-2 sm:p-4">
        <Tabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          addTab={addTab}
          closeTab={closeTab}
          activeTabContent={activeTabContent}
          updateTabContent={(content) => updateTabContent(activeTab, content)}
          toggleTools={toggleTools}
          toolsOpen={toolsOpen}
        />
        
        {/* Text Tools Panel */}
        <TextTools 
          isOpen={toolsOpen} 
          activeTabContent={activeTabContent}
          updateTabContent={(content) => updateTabContent(activeTab, content)}
        />
        
        {/* Mobile layout */}
        <div className="md:hidden">
          {/* 1. Text area comes first */}
          <div className="content-container mb-4">
            <Textarea
              content={activeTabContent}
              onChange={(value) => updateTabContent(activeTab, value)}
            />
          </div>
          
          {/* 2. Stats container comes second */}
          <div className="stats-container mb-4">
            {isAnalyzing && activeTabContent.length > 10000 ? (
              <div className="loading-indicator">Analyzing text...</div>
            ) : (
              <StatsTabs
                wordCount={analysisResults.wordCount}
                sentenceCount={analysisResults.sentenceCount}
                paragraphCount={analysisResults.paragraphCount}
                characterCount={analysisResults.characterCount}
                spaceCount={analysisResults.spaceCount}
                readingTime={analysisResults.readingTime}
                uniqueWordCount={analysisResults.uniqueWordCount}
                averageWordLength={analysisResults.averageWordLength}
                longestWord={analysisResults.longestWord}
                shortestWord={analysisResults.shortestWord}
                lexicalDensity={analysisResults.lexicalDensity}
                mostUsedWords={analysisResults.mostUsedWords}
                sentiment={analysisResults.sentiment}
                sentimentScore={analysisResults.sentimentScore}
                emotionTones={analysisResults.emotionTones}
                readability={analysisResults.readability}
                readabilityScore={analysisResults.readabilityScore}
                formality={analysisResults.formality}
                formalityScore={analysisResults.formalityScore}
                topicSuggestions={analysisResults.topicSuggestions}
                wordFrequency={analysisResults.wordFrequency}
              />
            )}
          </div>
          
          {/* 3. Visualization comes last */}
          <div className="mb-4">
            <Visualization wordFrequency={analysisResults.wordFrequency} />
          </div>
        </div>
        
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-4">
          {/* Left column - Text area (3/4 width) */}
          <div className="col-span-3">
            <Textarea
              content={activeTabContent}
              onChange={(value) => updateTabContent(activeTab, value)}
            />
          </div>
          
          {/* Right column - Stats and Visualization (1/4 width) */}
          <div className="col-span-1 space-y-4 max-h-screen overflow-auto">
            {isAnalyzing && activeTabContent.length > 10000 ? (
              <div className="loading-indicator">Analyzing text...</div>
            ) : (
              <>
                <StatsTabs
                  wordCount={analysisResults.wordCount}
                  sentenceCount={analysisResults.sentenceCount}
                  paragraphCount={analysisResults.paragraphCount}
                  characterCount={analysisResults.characterCount}
                  spaceCount={analysisResults.spaceCount}
                  readingTime={analysisResults.readingTime}
                  uniqueWordCount={analysisResults.uniqueWordCount}
                  averageWordLength={analysisResults.averageWordLength}
                  longestWord={analysisResults.longestWord}
                  shortestWord={analysisResults.shortestWord}
                  lexicalDensity={analysisResults.lexicalDensity}
                  mostUsedWords={analysisResults.mostUsedWords}
                  sentiment={analysisResults.sentiment}
                  sentimentScore={analysisResults.sentimentScore}
                  emotionTones={analysisResults.emotionTones}
                  readability={analysisResults.readability}
                  readabilityScore={analysisResults.readabilityScore}
                  formality={analysisResults.formality}
                  formalityScore={analysisResults.formalityScore}
                  topicSuggestions={analysisResults.topicSuggestions}
                  wordFrequency={analysisResults.wordFrequency}
                />
                <Visualization wordFrequency={analysisResults.wordFrequency} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
