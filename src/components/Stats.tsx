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
        Stats
      </h2>
      <table className="w-full">
        <tbody>
          <tr className="bg-gray-200 dark:bg-gray-700 rounded-md px-2">
            <td className="text-gray-700 dark:text-gray-300">Word</td>
            <td className="font-medium justify-end text-gray-900 dark:text-gray-100">{wordCount}</td>
          </tr>
          <tr className="px-2">
            <td className="text-gray-700 dark:text-gray-300">Sentence</td>
            <td className="font-medium justify-end text-gray-900 dark:text-gray-100">{sentenceCount}</td>
          </tr>
          <tr className="bg-gray-200 dark:bg-gray-700 rounded-md px-2">
            <td className="text-gray-700 dark:text-gray-300">Paragraph</td>
            <td className="font-medium justify-end text-gray-900 dark:text-gray-100">{paragraphCount}</td>
          </tr>
          <tr className="px-2">
            <td className="text-gray-700 dark:text-gray-300">Character</td>
            <td className="font-medium justify-end text-gray-900 dark:text-gray-100">{characterCount}</td>
          </tr>
          <tr className="bg-gray-200 dark:bg-gray-700 rounded-md px-2">
            <td className="text-gray-700 dark:text-gray-300">Spaces</td>
            <td className="font-medium justify-end text-gray-900 dark:text-gray-100">{spaceCount}</td>
          </tr>
          <tr className="px-2">
            <td className="text-gray-700 dark:text-gray-300">Reading Time</td>
            <td className="font-medium justify-end text-gray-900 dark:text-gray-100">{readingTime} mins</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Stats;
