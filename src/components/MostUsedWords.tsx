import React from 'react';

interface MostUsedWordsProps {
  mostUsedWords: { word: string; count: number }[];
}

const MostUsedWords: React.FC<MostUsedWordsProps> = ({ mostUsedWords }) => {
  return (
    <div className="stats-card">
      <h2 className="stats-title">Most Used Words</h2>
      {mostUsedWords.length > 0 ? (
        <ul className="mt-2">
          {mostUsedWords.map((item, index) => (
            <li key={index} className={`stat-row ${index % 2 === 0 ? 'alternate' : ''}`}>
              <span className="stat-label">{item.word}</span>
              <span className="stat-value">{item.count}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center py-2 text-gray-500 dark:text-gray-400">No words found</p>
      )}
    </div>
  );
};

export default MostUsedWords;
