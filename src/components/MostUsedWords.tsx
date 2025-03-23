interface MostUsedWordsProps {
      mostUsedWords: { word: string; count: number }[];
    }

    const MostUsedWords: React.FC<MostUsedWordsProps> = ({ mostUsedWords }) => {
      return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-[#f5d0a9]">
            Most Used Words
          </h2>
          <ul className="mt-2">
            {mostUsedWords.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300">
                {item.word}: <span className="font-medium text-gray-900 dark:text-gray-100">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    };

    export default MostUsedWords;
