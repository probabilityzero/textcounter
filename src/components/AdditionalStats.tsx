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
      <div className="flex flex-col mt-2">
        <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-4 py-1 rounded-sm">
          <span className="text-gray-700 dark:text-gray-300">Unique Words</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{uniqueWordCount}</span>
        </div>
        <div className="flex justify-between items-center px-4 py-1 rounded-sm">
          <span className="text-gray-700 dark:text-gray-300">Avg. Word Length</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{averageWordLength.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-4 py-1 rounded-sm">
          <span className="text-gray-700 dark:text-gray-300">Longest Word</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{longestWord}</span>
        </div>
        <div className="flex justify-between items-center px-4 py-1 rounded-sm">
          <span className="text-gray-700 dark:text-gray-300">Shortest Word</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{shortestWord}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-200 dark:bg-gray-700 px-4 py-1 rounded-sm">
          <span className="text-gray-700 dark:text-gray-300">Lexical Density</span>
          <span className="font-medium text-gray-900 dark:text-gray-100">{lexicalDensity.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

export default AdditionalStats;
