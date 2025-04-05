import React, { useState } from 'react';
import { Maximize2, Minimize2 } from 'lucide-react';
import WordCloud from './WordCloud';

interface VisualizationProps {
  wordFrequency: { [key: string]: number };
}

const Visualization: React.FC<VisualizationProps> = ({ wordFrequency }) => {
  const [expanded, setExpanded] = useState<boolean>(false);

  // Format word data for the WordCloud
  const wordCloudData = Object.entries(wordFrequency || {})
    .filter(([word, count]) => count > 1 && word.length > 2)
    .map(([text, value]) => ({ text, value }))
    .slice(0, 50);

  return (
    <div className={`visualization-card ${expanded ? 'expanded' : ''}`}>
      <div className="viz-header">
        <h3 className="text-lg font-medium text-text-accent">Word Frequency Visualization</h3>
        <button 
          className="expand-btn"
          onClick={() => setExpanded(!expanded)}
          aria-label={expanded ? "Minimize visualization" : "Expand visualization"}
          title={expanded ? "Minimize" : "Expand"}
        >
          {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>
      
      <div className="viz-content">
        <WordCloud words={wordCloudData} />
      </div>
      
      {expanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" 
             onClick={() => setExpanded(false)}
             aria-hidden="true" />
      )}
    </div>
  );
};

export default Visualization;