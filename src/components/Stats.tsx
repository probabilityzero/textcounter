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
    <div className="p-4 bg-gray-100 dark:bg-gray-800 mt-1 rounded-md">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-[#f5d0a9]">
        Statistics
      </h2>
      <table className="w-full mt-2">
        <tbody>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <td className="text-gray-700 dark:text-gray-300">Words:</td>
            <td className="font-medium text-gray-900 dark:text-gray-100">{wordCount}</td>
          </tr>
          <tr>
            <td className="text-gray-700 dark:text-gray-300">Sentences:</td>
            <td className="font-medium text-gray-900 dark:text-gray-100">{sentenceCount}</td>
          </tr>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <td className="text-gray-700 dark:text-gray-300">Paragraphs:</td>
            <td className="font-medium text-gray-900 dark:text-gray-100">{paragraphCount}</td>
          </tr>
          <tr>
            <td className="text-gray-700 dark:text-gray-300">Characters:</td>
            <td className="font-medium text-gray-900 dark:text-gray-100">{characterCount}</td>
          </tr>
          <tr className="bg-gray-200 dark:bg-gray-700">
            <td className="text-gray-700 dark:text-gray-300">Spaces:</td>
            <td className="font-medium text-gray-900 dark:text-gray-100">{spaceCount}</td>
          </tr>
          <tr>
            <td className="text-gray-700 dark:text-gray-300">Reading Time:</td>
            <td className="font-medium text-gray-900 dark:text-gray-100">{readingTime} mins</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
