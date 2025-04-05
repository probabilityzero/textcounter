export const analyzeText = (text: string) => {
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
  const sentenceCount = text.trim() === '' ? 0 : text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphCount = text.trim() === '' ? 0 : text.split(/\n+/).filter(Boolean).length;
  const characterCount = text.length;
  const spaceCount = text.split(' ').length - 1;

  // Most Used Words
  const words = text.toLowerCase().match(/\b\w+\b/g) || []; // Match whole words with fallback
  const wordCounts: { [word: string]: number } = {};
  let mostUsedWords: { word: string; count: number }[] = [];

  if (words.length > 0) {
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
  const uniqueWordCount = words.length > 0 ? new Set(words).size : 0;

  // Average Word Length
  let averageWordLength = 0;
  if (words.length > 0) {
    const totalWordLength = words.reduce((sum, word) => sum + word.length, 0);
    averageWordLength = totalWordLength / words.length;
  }

  // Longest and Shortest Word
  let longestWord = '';
  let shortestWord = '';
  
  if (words.length > 0) {
    // Fix for longestWord
    longestWord = words.reduce((longest, current) => 
      current.length > longest.length ? current : longest, '');
    
    // Fix for shortestWord - use a simpler, more direct approach
    if (words.length === 1) {
      shortestWord = words[0];
    } else {
      // Use a traditional for loop instead of reduce to avoid TypeScript issues
      let shortest = words[0];
      for (let i = 1; i < words.length; i++) {
        if (words[i].length < shortest.length) {
          shortest = words[i];
        }
      }
      shortestWord = shortest;
    }
  }

  // Lexical Density
  let lexicalDensity = 0;
  if (words.length > 0) {
    const contentWords = words.filter(word => {
      const isNoun = /^[aeiou]/i.test(word);
      const isVerb = /ing$/i.test(word);
      const isAdjective = /(ous|ful|able|ible|less|ive|al)$/i.test(word);
      const isAdverb = /ly$/i.test(word);

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
    lexicalDensity,
  };
};
