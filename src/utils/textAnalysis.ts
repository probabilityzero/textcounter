export const analyzeText = (text: string) => {
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphCount = text.trim() === '' ? 0 : text.split(/\n+/).filter(Boolean).length;
  const characterCount = text.length;
  const spaceCount = text.split(' ').length - 1;

  // Most Used Words
  const words = text.toLowerCase().match(/\b\w+\b/g); // Match whole words
  const wordCounts: { [word: string]: number } = {};
  let mostUsedWords: { word: string; count: number }[] = [];

  if (words) {
    for (const word of words) {
      wordCounts[word] = (wordCounts[word] || 0) + 1;
    }

    mostUsedWords = Object.entries(wordCounts)
      .sort(([, countA], [, countB]) => countB - countA)
      .slice(0, 5) // top 5
      .map(([word, count]) => ({ word, count }));
  }

  // Reading Time
  const wordsPerMinute = 200; // Average reading speed
  const readingTime = Math.ceil(wordCount / wordsPerMinute);

  // Unique Word Count
  const uniqueWordCount = words ? new Set(words).size : 0;

  // Average Word Length
  let averageWordLength = 0;
  if (words) {
    const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
    averageWordLength = totalWordLength / words.length;
  }

  // Longest and Shortest Word
  let longestWord = '';
  let shortestWord = '';
  if (words) {
    longestWord = words.reduce((longest, current) => current.length > longest.length ? current : longest, '');
    shortestWord = words.reduce((shortest, current) => current.length < shortest.length || shortest === '' ? current : shortest, words[0] || '');
  }

  // Lexical Density
  let lexicalDensity = 0;
  if (words) {
    const contentWords = words.filter(word => {
      // Basic POS tagging - This is a very simplified approach and might not be perfectly accurate
      const isNoun = /^[aeiou]/i.test(word); // Starts with a vowel (very rough approximation)
      const isVerb = /ing$/i.test(word);    // Ends with "ing" (very rough approximation)
      const isAdjective = /(ous|ful|able|ible|less|ive|al)$/i.test(word); // Common adjective endings
      const isAdverb = /ly$/i.test(word); // Ends with "ly"

      return isNoun || isVerb || isAdjective || isAdverb;
    });
    lexicalDensity = (contentWords.length / words.length) * 100;
  }

  return {
    wordCount,
    sentenceCount,
    paragraphCount,
    characterCount,
    spaceCount,
    mostUsedWords,
    readingTime,
    uniqueWordCount,
    averageWordLength,
    longestWord,
    shortestWord,
    lexicalDensity, // Added
  };
};
