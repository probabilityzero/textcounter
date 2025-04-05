export const analyzeTextEnhanced = (text: string) => {
  // Basic sentiment analysis
  const sentimentAnalysis = () => {
    if (!text.trim()) return { sentiment: 'Neutral', score: 0.5 };
    
    const positiveWords = ['good', 'great', 'excellent', 'amazing', 'wonderful', 'happy', 'love', 'best', 'beautiful', 'perfect'];
    const negativeWords = ['bad', 'terrible', 'awful', 'worst', 'hate', 'dislike', 'poor', 'horrible', 'disappointing', 'annoying'];
    
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    let positiveCount = 0;
    let negativeCount = 0;
    
    for (const word of words) {
      if (positiveWords.includes(word)) positiveCount++;
      if (negativeWords.includes(word)) negativeCount++;
    }
    
    const totalWords = words.length;
    const positiveScore = positiveCount / totalWords;
    const negativeScore = negativeCount / totalWords;
    
    const sentimentScore = 0.5 + (positiveScore - negativeScore) * 5;
    const clampedScore = Math.max(0, Math.min(1, sentimentScore));
    
    let sentiment = 'Neutral';
    if (clampedScore > 0.6) sentiment = 'Positive';
    if (clampedScore < 0.4) sentiment = 'Negative';
    
    return { sentiment, score: clampedScore };
  };
  
  // Analyze readability
  const readabilityAnalysis = () => {
    if (!text.trim()) return { readability: 'N/A', score: 0 };
    
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    if (sentences.length === 0 || words.length === 0) {
      return { readability: 'N/A', score: 0 };
    }
    
    const averageWordsPerSentence = words.length / sentences.length;
    const longWords = words.filter(word => word.length > 6).length;
    const longWordPercentage = (longWords / words.length) * 100;
    
    // Simple Flesch-Kincaid inspired readability (simplified)
    const readabilityScore = 100 - (0.39 * averageWordsPerSentence + 11.8 * (longWordPercentage / 100));
    const clampedScore = Math.max(0, Math.min(100, readabilityScore));
    
    let readability = 'Average';
    if (clampedScore < 30) readability = 'Very Difficult';
    else if (clampedScore < 50) readability = 'Difficult';
    else if (clampedScore < 70) readability = 'Standard';
    else if (clampedScore < 90) readability = 'Easy';
    else readability = 'Very Easy';
    
    return { readability, score: clampedScore };
  };
  
  // Extract potential topics
  const extractTopics = () => {
    if (!text.trim()) return [];
    
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Filter out common words
    const commonWords = new Set(['a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 'as', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'of', 'from', 'that', 'this', 'these', 'those']);
    
    const significantWords = words.filter(word => !commonWords.has(word) && word.length > 3);
    
    // Count word frequencies
    const wordFrequency: { [key: string]: number } = {};
    for (const word of significantWords) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
    
    // Get top words as potential topics
    const topics = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
    
    return topics;
  };
  
  const { sentiment, score: sentimentScore } = sentimentAnalysis();
  const { readability, score: readabilityScore } = readabilityAnalysis();
  const topicSuggestions = extractTopics();
  
  // Word frequency analysis
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];
  const wordFrequency: { [key: string]: number } = {};
  
  for (const word of words) {
    if (word.length > 2) { // Only count words with more than 2 letters
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
  }
  
  return {
    sentiment,
    sentimentScore,
    readability,
    readabilityScore,
    topicSuggestions,
    wordFrequency,
  };
};