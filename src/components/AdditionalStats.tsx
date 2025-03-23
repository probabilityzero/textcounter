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
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-[#f5d0a9]">
        More Stats
      </h2>
      <div className="flex flex-col">
        <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-2 rounded-md">
          <span className="text-gray-700 dark:text-gray-300">Words:</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{wordCount}</span>
        </div>
        <div className="flex justify-between items-center px-2 rounded-md">
          <span className="text-gray-700 dark:text-gray-300">Sentences:</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{sentenceCount}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-2 rounded-md">
          <span className="text-gray-700 dark:text-gray-300">Paragraphs:</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{paragraphCount}</span>
        </div>
        <div className="flex justify-between items-center px-2 rounded-md">
          <span className="text-gray-700 dark:text-gray-300">Characters:</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{characterCount}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-2 rounded-md">
          <span className="text-gray-700 dark:text-gray-300">Spaces:</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{spaceCount}</span>
        </div>
        <div className="flex justify-between items-center px-2 rounded-md">
          <span className="text-gray-700 dark:text-gray-300">Reading Time:</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{readingTime} mins</span>
        </div>
      </div>
    </div>
  );
};

export default AdditionalStats;
