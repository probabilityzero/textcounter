import React from 'react';

interface AdditionalStatsProps {
  uniqueWordCount: number;
  averageWordLength: number;
  longestWord: string;
  shortestWord: string;
  lexicalDensity: number;
}

const AdditionalStats: React.FC<AdditionalStatsProps> = ({
  uniqueWordCount,
  averageWordLength,
  longestWord,
  shortestWord,
  lexicalDensity,
}) => {
  return (
    <div className="stats-card">
      <h2 className="stats-title">Advanced Stats</h2>
      <div className="flex flex-col mt-2">
        <div className="stat-row alternate">
          <span className="stat-label">Unique Words</span>
          <span className="stat-value">{uniqueWordCount}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Avg. Word Length</span>
          <span className="stat-value">
            {isNaN(averageWordLength) ? '0.00' : averageWordLength.toFixed(2)}
          </span>
        </div>
        <div className="stat-row alternate">
          <span className="stat-label">Longest Word</span>
          <span className="stat-value">{longestWord || '-'}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Shortest Word</span>
          <span className="stat-value">{shortestWord || '-'}</span>
        </div>
        <div className="stat-row alternate">
          <span className="stat-label">Lexical Density</span>
          <span className="stat-value">
            {isNaN(lexicalDensity) ? '0.00' : lexicalDensity.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AdditionalStats;
