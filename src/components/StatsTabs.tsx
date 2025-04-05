import React, { useState } from 'react';

interface StatsTabsProps {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  characterCount: number;
  spaceCount: number;
  readingTime: number;
  uniqueWordCount: number;
  averageWordLength: number;
  longestWord: string;
  shortestWord: string;
  lexicalDensity: number;
  mostUsedWords: { word: string; count: number }[];
  sentiment: string;
  readability: string;
  readabilityScore: number;
  topicSuggestions: string[];
  wordFrequency: { [key: string]: number };
}

const StatsTabs: React.FC<StatsTabsProps> = (props) => {
  const [activeTab, setActiveTab] = useState<string>('basic');

  return (
    <div className="stats-card">
      <div className="stats-tabs">
        <button 
          className={`stats-tab ${activeTab === 'basic' ? 'active' : ''}`}
          onClick={() => setActiveTab('basic')}
        >
          Basic
        </button>
        <button 
          className={`stats-tab ${activeTab === 'advanced' ? 'active' : ''}`}
          onClick={() => setActiveTab('advanced')}
        >
          Advanced
        </button>
        <button 
          className={`stats-tab ${activeTab === 'insights' ? 'active' : ''}`}
          onClick={() => setActiveTab('insights')}
        >
          Insights
        </button>
      </div>
      
      <div className={`stats-section ${activeTab === 'basic' ? 'active' : ''}`}>
        <div className="flex flex-col">
          <div className="stat-row alternate">
            <span className="stat-label">Words</span>
            <span className="stat-value">{props.wordCount}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Sentences</span>
            <span className="stat-value">{props.sentenceCount}</span>
          </div>
          <div className="stat-row alternate">
            <span className="stat-label">Paragraphs</span>
            <span className="stat-value">{props.paragraphCount}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Characters</span>
            <span className="stat-value">{props.characterCount}</span>
          </div>
          <div className="stat-row alternate">
            <span className="stat-label">Spaces</span>
            <span className="stat-value">{props.spaceCount}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Reading Time</span>
            <span className="stat-value">{props.readingTime} min{props.readingTime !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>
      
      <div className={`stats-section ${activeTab === 'advanced' ? 'active' : ''}`}>
        <div className="flex flex-col">
          <div className="stat-row alternate">
            <span className="stat-label">Unique Words</span>
            <span className="stat-value">{props.uniqueWordCount}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Avg. Word Length</span>
            <span className="stat-value">
              {isNaN(props.averageWordLength) ? '0.00' : props.averageWordLength.toFixed(2)}
            </span>
          </div>
          <div className="stat-row alternate">
            <span className="stat-label">Longest Word</span>
            <span className="stat-value">{props.longestWord || '-'}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Shortest Word</span>
            <span className="stat-value">{props.shortestWord || '-'}</span>
          </div>
          <div className="stat-row alternate">
            <span className="stat-label">Lexical Density</span>
            <span className="stat-value">
              {isNaN(props.lexicalDensity) ? '0.00' : props.lexicalDensity.toFixed(2)}%
            </span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Most Used Words</h3>
            {props.mostUsedWords.length > 0 ? (
              <ul>
                {props.mostUsedWords.slice(0, 3).map((item, index) => (
                  <li key={index} className={`stat-row ${index % 2 === 0 ? 'alternate' : ''}`}>
                    <span className="stat-label">{item.word}</span>
                    <span className="stat-value">{item.count}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center py-1 text-sm text-gray-500 dark:text-gray-400">No words found</p>
            )}
          </div>
        </div>
      </div>
      
      <div className={`stats-section ${activeTab === 'insights' ? 'active' : ''}`}>
        <div className="flex flex-col">
          <div className="stat-row alternate">
            <span className="stat-label">Sentiment</span>
            <span className="stat-value">{props.sentiment}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">Readability</span>
            <span className="stat-value">{props.readability}</span>
          </div>
          <div className="stat-row alternate">
            <span className="stat-label">Readability Score</span>
            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
                style={{ width: `${props.readabilityScore}%` }}
              />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Topic Suggestions</h3>
            <div className="flex flex-wrap gap-1">
              {props.topicSuggestions.length > 0 ? (
                props.topicSuggestions.map((topic, index) => (
                  <span key={index} className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                    {topic}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">No topics detected</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsTabs;