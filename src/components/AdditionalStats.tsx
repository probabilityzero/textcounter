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
      <table className="w-full mt-2">
        <tbody>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <td className="text-gray-700 dark:text-gray-300">Unique Words:</td>
            <td className="font-medium text-gray-900 dark:text-gray-100">{uniqueWordCount}</td>
          </tr>
          <tr>
            <td className="text-gray-700 dark:text-gray-300">Avg. Word Length:</td>
            <td className="font-medium text-gray-900 dark:text-gray-100">{averageWordLength.toFixed(2)}</td>
          </tr>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <td className="text-gray-700 dark:text-gray-300">Longest Word:</td>
            <td className="font-medium text-gray-900 dark:text-gray-100">{longestWord}</td>
          </tr>
          <tr>
            <td className="text-gray-700 dark:text-gray-300">Shortest Word:</td>
            <td className="font-medium text-gray-900 dark:text-gray-100">{shortestWord}</td>
          </tr>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <td className="text-gray-700 dark:text-gray-300">Lexical Density:</td>
            <td className="font-medium text-gray-900 dark:text-gray-100">{lexicalDensity.toFixed(2)}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AdditionalStats;
