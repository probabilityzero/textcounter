import React from 'react';

interface TextInsightsProps {
  sentiment: string;
  readability: string;
  readabilityScore: number;
  topicSuggestions: string[];
  wordFrequency: { [key: string]: number };
}

const TextInsights: React.FC<TextInsightsProps> = ({
  sentiment,
  readability,
  readabilityScore,
  topicSuggestions,
}) => {
  return (
    <div className="stats-card">
      <h2 className="stats-title">Text Insights</h2>
      <div className="flex flex-col mt-2">
        <div className="stat-row alternate">
          <span className="stat-label">Sentiment</span>
          <span className="stat-value">{sentiment}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Readability</span>
          <span className="stat-value">{readability}</span>
        </div>
        <div className="stat-row alternate">
          <span className="stat-label">Readability Score</span>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500" 
              style={{ width: `${readabilityScore}%` }}
            />
          </div>
        </div>
        <div className="stat-row">
          <span className="stat-label">Topic Suggestions</span>
          <div className="flex flex-wrap gap-1">
            {topicSuggestions.map((topic, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextInsights;