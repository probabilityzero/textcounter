import React, { useState } from 'react';
import { List, Columns2, Maximize2, Minimize2 } from 'lucide-react';
import WordCloud from './WordCloud';

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
  sentimentScore: number;
  emotionTones: string[];
  readability: string;
  readabilityScore: number;
  formality: string;
  formalityScore: number;
  topicSuggestions: string[];
  wordFrequency: { [key: string]: number };
}

const StatsTabs: React.FC<StatsTabsProps> = (props) => {
  const [activeTab, setActiveTab] = useState<string>('basic');
  const [viewStyle, setViewStyle] = useState<'tabbed' | 'list'>('tabbed');
  
  // Format word data for the WordCloud
  const wordCloudData = Object.entries(props.wordFrequency || {})
    .filter(([word, count]) => count > 1 && word.length > 2)
    .map(([text, value]) => ({ text, value }))
    .slice(0, 50);
    
  // Toggle between tabbed and list view
  const toggleView = () => {
    setViewStyle(viewStyle === 'tabbed' ? 'list' : 'tabbed');
  };

  // Now expanded property means all stats are shown in sequence instead of tabs
  const isExpanded = viewStyle === 'list';

  return (
    <div className="stats-card">
      <div className="stats-header">
        <div className="stats-tabs">
          {viewStyle === 'tabbed' && (
            <>
              <button 
                className={`stats-tab ${activeTab === 'basic' ? 'active' : ''}`}
                onClick={() => setActiveTab('basic')}
              >
                Count
              </button>
              <button 
                className={`stats-tab ${activeTab === 'insights' ? 'active' : ''}`}
                onClick={() => setActiveTab('insights')}
              >
                Analyze
              </button>
              <button 
                className={`stats-tab ${activeTab === 'advanced' ? 'active' : ''}`}
                onClick={() => setActiveTab('advanced')}
              >
                Stats
              </button>
              <button 
                className={`stats-tab ${activeTab === 'visualize' ? 'active' : ''} md:hidden`}
                onClick={() => setActiveTab('visualize')}
              >
                Visualize
              </button>
            </>
          )}
          {viewStyle === 'list' && (
            <h3 className="text-lg font-medium px-3">Text Analysis</h3>
          )}
        </div>
        <button 
          className="view-toggle-btn"
          onClick={toggleView}
          aria-label={isExpanded ? "Switch to tabbed view" : "Switch to expanded view"}
          title={isExpanded ? "Tabbed View" : "List View"}
        >
          {isExpanded ? <Columns2 size={16} /> : <List size={16} />}
        </button>
      </div>
      
      {/* Basic Stats Tab */}
      <div className={`stats-section ${activeTab === 'basic' || isExpanded ? 'active' : ''}`}>
        {isExpanded && <h3 className="section-title">Basic Counts</h3>}
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
      
      {/* Advanced Stats Tab */}
      <div className={`stats-section ${activeTab === 'advanced' || isExpanded ? 'active' : ''}`}>
        {isExpanded && <h3 className="section-title">Advanced Statistics</h3>}
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
              <p className="text-center py-1 text-sm text-text-secondary">No words found</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Insights Tab */}
      <div className={`stats-section ${activeTab === 'insights' || isExpanded ? 'active' : ''}`}>
        {isExpanded && <h3 className="section-title">Text Insights</h3>}
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
            <div className="w-full h-2 bg-row-bg rounded-full overflow-hidden">
              <div 
                className="h-full readability-score" 
                style={{ width: `${props.readabilityScore}%` }}
              />
            </div>
          </div>
          <div className="stat-row">
            <span className="stat-label">Formality</span>
            <span className="stat-value">{props.formality}</span>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Topic Suggestions</h3>
            <div className="flex flex-wrap gap-1">
              {props.topicSuggestions.length > 0 ? (
                props.topicSuggestions.map((topic, index) => (
                  <span key={index} className="topic-tag">
                    {topic}
                  </span>
                ))
              ) : (
                <p className="text-sm text-text-secondary">No topics detected</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Emotion Tones</h3>
            <div className="flex flex-wrap gap-1">
              {props.emotionTones.length > 0 ? (
                props.emotionTones.map((emotion, index) => (
                  <span key={index} className="emotion-tag">
                    {emotion}
                  </span>
                ))
              ) : (
                <p className="text-sm text-text-secondary">No emotions detected</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile-only Visualization Tab */}
      <div className={`stats-section md:hidden ${activeTab === 'visualize' || isExpanded ? 'active' : ''}`}>
        {isExpanded && <h3 className="section-title">Word Visualization</h3>}
        <WordCloud words={wordCloudData} />
      </div>
    </div>
  );
};

export default StatsTabs;