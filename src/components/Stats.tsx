import React from 'react';

interface StatsProps {
  wordCount: number;
  sentenceCount: number;
  paragraphCount: number;
  characterCount: number;
  spaceCount: number;
  readingTime: number;
}

const Stats: React.FC<StatsProps> = ({
  wordCount,
  sentenceCount,
  paragraphCount,
  characterCount,
  spaceCount,
  readingTime,
}) => {
  return (
    <div className="stats-card">
      <h2 className="stats-title">Basic Stats</h2>
      <div className="flex flex-col">
        <div className="stat-row alternate">
          <span className="stat-label">Words</span>
          <span className="stat-value">{wordCount}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Sentences</span>
          <span className="stat-value">{sentenceCount}</span>
        </div>
        <div className="stat-row alternate">
          <span className="stat-label">Paragraphs</span>
          <span className="stat-value">{paragraphCount}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Characters</span>
          <span className="stat-value">{characterCount}</span>
        </div>
        <div className="stat-row alternate">
          <span className="stat-label">Spaces</span>
          <span className="stat-value">{spaceCount}</span>
        </div>
        <div className="stat-row">
          <span className="stat-label">Reading Time</span>
          <span className="stat-value">{readingTime} min{readingTime !== 1 ? 's' : ''}</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;
