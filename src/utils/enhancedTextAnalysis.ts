export const analyzeTextEnhanced = (text: string) => {
  // Enhanced sentiment analysis
  const sentimentAnalysis = () => {
    if (!text.trim()) return { sentiment: 'Neutral', score: 0.5, emotionTones: [] };
    
    // Expanded positive words list
    const positiveWords = [
      // General positive
      'good', 'great', 'excellent', 'amazing', 'wonderful', 'happy', 'love', 'best', 'beautiful', 'perfect',
      'awesome', 'fantastic', 'terrific', 'outstanding', 'superb', 'splendid', 'brilliant', 'fabulous',
      'delightful', 'pleasant', 'lovely', 'marvelous', 'spectacular', 'impressive', 'exceptional',
      'extraordinary', 'incredible', 'admirable', 'remarkable', 'enjoyable', 'favorable', 'satisfying',
      'gratifying', 'pleasing', 'charming', 'attractive', 'appealing', 'adorable', 'magnificent',
      
      // Achievement & Success
      'achievement', 'success', 'accomplish', 'triumph', 'victory', 'win', 'succeed', 'achieve', 'excel',
      'flourish', 'thrive', 'prosper', 'progress', 'improve', 'advance', 'develop', 'grow', 'gain',
      
      // Emotions & Feelings
      'joy', 'delight', 'elation', 'euphoria', 'happiness', 'gladness', 'cheerfulness', 'merriment',
      'glee', 'bliss', 'contentment', 'satisfaction', 'gratitude', 'thankful', 'appreciative',
      'hopeful', 'optimistic', 'confident', 'courageous', 'brave', 'bold', 'daring',
      
      // Relationships
      'friendship', 'loving', 'caring', 'kind', 'kindness', 'generous', 'generosity', 'compassionate',
      'compassion', 'empathetic', 'empathy', 'sympathetic', 'sympathy', 'supportive', 'support',
      'helpful', 'thoughtful', 'considerate', 'gentle', 'tender', 'warm', 'affectionate',
      
      // Quality & Value
      'valuable', 'worthy', 'worthwhile', 'beneficial', 'advantageous', 'useful', 'helpful',
      'effective', 'efficient', 'productive', 'fruitful', 'rewarding', 'meaningful', 'significant',
      'important', 'essential', 'vital', 'key', 'fundamental', 'reliable', 'dependable', 'trustworthy'
    ];
    
    // Expanded negative words list
    const negativeWords = [
      // General negative
      'bad', 'terrible', 'awful', 'worst', 'hate', 'dislike', 'poor', 'horrible', 'disappointing', 'annoying',
      'abysmal', 'appalling', 'atrocious', 'dreadful', 'unpleasant', 'inferior', 'substandard', 'inadequate',
      'deficient', 'unsatisfactory', 'mediocre', 'miserable', 'wretched', 'pitiful', 'pathetic', 'worthless',
      'useless', 'pointless', 'futile', 'vain', 'insignificant', 'irrelevant', 'unimportant', 'awful',
      
      // Problems & Failures
      'problem', 'trouble', 'difficulty', 'hardship', 'obstacle', 'setback', 'hindrance', 'impediment',
      'failure', 'defeat', 'loss', 'failing', 'fiasco', 'disaster', 'catastrophe', 'calamity', 'mess',
      
      // Emotions & Feelings
      'sad', 'unhappy', 'depressed', 'depressing', 'gloomy', 'glum', 'melancholy', 'downhearted', 'downcast',
      'despondent', 'disheartened', 'discouraged', 'dismal', 'bleak', 'somber', 'morose', 'joyless',
      'sorrowful', 'miserable', 'woeful', 'upset', 'distressed', 'troubled', 'worried', 'anxious', 'afraid',
      'fearful', 'scared', 'terrified', 'horrified', 'angry', 'annoyed', 'irritated', 'aggravated', 'agitated',
      'frustrated', 'exasperated', 'infuriated', 'enraged', 'hostile', 'bitter', 'resentful', 'disgusted',
      
      // Negative Interactions
      'argument', 'conflict', 'disagreement', 'dispute', 'quarrel', 'fight', 'feud', 'hostile', 'mean',
      'cruel', 'harsh', 'severe', 'brutal', 'vicious', 'malicious', 'spiteful', 'hateful', 'unkind',
      'inconsiderate', 'selfish', 'greedy', 'rude', 'impolite', 'disrespectful', 'insulting', 'offensive',
      
      // Quality & Value
      'faulty', 'defective', 'flawed', 'imperfect', 'broken', 'damaged', 'ruined', 'spoiled', 'tainted',
      'contaminated', 'corrupt', 'unreliable', 'untrustworthy', 'dubious', 'questionable', 'suspicious'
    ];
    
    // Emotion tone categories for more nuanced analysis
    const emotionCategories = {
      joy: ['happy', 'joy', 'delight', 'pleased', 'glad', 'elated', 'cheerful', 'content', 'satisfied', 'blissful'],
      love: ['love', 'adore', 'affection', 'fond', 'cherish', 'devoted', 'passionate', 'tenderness', 'warmth', 'intimate'],
      surprise: ['surprised', 'amazed', 'astonished', 'astounded', 'shocked', 'startled', 'stunned', 'unexpected', 'wonder', 'awe'],
      anger: ['angry', 'mad', 'furious', 'outraged', 'irritated', 'annoyed', 'enraged', 'irate', 'hostile', 'bitter'],
      sadness: ['sad', 'unhappy', 'depressed', 'melancholy', 'gloomy', 'downhearted', 'miserable', 'grieving', 'sorrowful', 'downcast'],
      fear: ['afraid', 'scared', 'frightened', 'terrified', 'anxious', 'nervous', 'panic', 'dread', 'worry', 'horror'],
      disgust: ['disgusted', 'repulsed', 'revolted', 'abhorred', 'appalled', 'offended', 'sick', 'nauseous', 'distaste', 'aversion'],
      trust: ['trust', 'believe', 'faith', 'confident', 'reliance', 'dependable', 'reliable', 'credible', 'honest', 'loyal']
    };
    
    // Intensity modifiers that can strengthen or weaken sentiment
    const intensifiers = ['very', 'extremely', 'incredibly', 'absolutely', 'tremendously', 'highly', 'exceptionally', 'remarkably', 'totally'];
    const diminishers = ['somewhat', 'slightly', 'rather', 'kind of', 'sort of', 'a bit', 'a little', 'barely', 'hardly', 'scarcely'];
    
    // Negation words that can flip sentiment
    const negations = ['not', 'no', 'never', 'none', 'nothing', 'neither', 'nor', 'barely', 'hardly', 'scarcely', 'seldom', 'rarely'];
    
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    const sentences = text.split(/[.!?]+/).filter(Boolean).map(s => s.trim().toLowerCase());
    
    let positiveCount = 0;
    let negativeCount = 0;
    let intensifierCount = 0;
    let diminisherCount = 0;
    let negationCount = 0;
    let sentimentScore = 0.5; // Neutral starting point
    
    // Track emotion tones
    const emotionToneCounts: Record<string, number> = {
      joy: 0,
      love: 0,
      surprise: 0,
      anger: 0,
      sadness: 0,
      fear: 0,
      disgust: 0,
      trust: 0
    };
    
    // Advanced sentiment analysis with context
    for (let i = 0; i < sentences.length; i++) {
      const sentenceWords = sentences[i].match(/\b\w+\b/g) || [];
      
      for (let j = 0; j < sentenceWords.length; j++) {
        const word = sentenceWords[j];
        const prevWord = j > 0 ? sentenceWords[j - 1] : null;
        
        // Check for negations that could flip sentiment
        const isNegated = prevWord && negations.includes(prevWord);
        
        // Check for intensifiers or diminishers
        const hasIntensifier = prevWord && intensifiers.includes(prevWord);
        const hasDiminisher = prevWord && diminishers.includes(prevWord);
        
        // Count intensifiers and diminishers
        if (intensifiers.includes(word)) intensifierCount++;
        if (diminishers.includes(word)) diminisherCount++;
        if (negations.includes(word)) negationCount++;
        
        // Analyze emotion tones
        for (const [emotion, wordList] of Object.entries(emotionCategories)) {
          if (wordList.includes(word)) {
            emotionToneCounts[emotion] += isNegated ? -1 : 1;
          }
        }
        
        // Check if the word is positive or negative
        if (positiveWords.includes(word)) {
          positiveCount += isNegated ? -1 : (hasIntensifier ? 2 : (hasDiminisher ? 0.5 : 1));
        } else if (negativeWords.includes(word)) {
          negativeCount += isNegated ? -1 : (hasIntensifier ? 2 : (hasDiminisher ? 0.5 : 1));
        }
      }
    }
    
    // Calculate sentiment score with adjustment for negations and modifiers
    const totalWords = words.length;
    const positiveScore = positiveCount / Math.max(1, totalWords);
    const negativeScore = negativeCount / Math.max(1, totalWords);
    
    // Formula that accounts for negations and modifiers influence
    const negationInfluence = negationCount / Math.max(1, totalWords) * 0.2;
    const intensifierInfluence = intensifierCount / Math.max(1, totalWords) * 0.15;
    const diminisherInfluence = diminisherCount / Math.max(1, totalWords) * 0.1;
    
    sentimentScore = 0.5 + (positiveScore - negativeScore) * 5;
    
    // Adjust score based on modifiers
    sentimentScore = sentimentScore * (1 + intensifierInfluence - diminisherInfluence);
    
    // If there are many negations, move score toward neutral
    if (negationInfluence > 0.05) {
      sentimentScore = sentimentScore * (1 - negationInfluence) + 0.5 * negationInfluence;
    }
    
    const clampedScore = Math.max(0, Math.min(1, sentimentScore));
    
    // Determine dominant emotions (top 3)
    const dominantEmotions = Object.entries(emotionToneCounts)
      .filter(([_, count]) => count > 0)
      .sort(([_, countA], [__, countB]) => countB - countA)
      .slice(0, 3)
      .map(([emotion]) => emotion);
    
    // Determine overall sentiment label
    let sentiment = 'Neutral';
    if (clampedScore > 0.7) sentiment = 'Very Positive';
    else if (clampedScore > 0.55) sentiment = 'Positive';
    else if (clampedScore < 0.3) sentiment = 'Very Negative';
    else if (clampedScore < 0.45) sentiment = 'Negative';
    
    return { 
      sentiment, 
      score: clampedScore,
      emotionTones: dominantEmotions,
      emotionBreakdown: emotionToneCounts
    };
  };
  
  // Analyze readability (existing function)
  const readabilityAnalysis = () => {
    // Your existing readability analysis code
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
  
  // Extract potential topics (with improved categorization)
  const extractTopics = () => {
    if (!text.trim()) return [];
    
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    
    // Expanded list of common words to filter out
    const commonWords = new Set([
      'a', 'an', 'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'with', 'by', 'about', 
      'as', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'is', 'are', 'was', 'were', 'be', 'been', 
      'being', 'have', 'has', 'had', 'do', 'does', 'did', 'of', 'from', 'that', 'this', 'these', 
      'those', 'my', 'your', 'his', 'her', 'its', 'our', 'their', 'mine', 'yours', 'hers', 'ours', 
      'theirs', 'myself', 'yourself', 'himself', 'herself', 'itself', 'ourselves', 'themselves',
      'what', 'which', 'who', 'whom', 'whose', 'when', 'where', 'why', 'how', 'all', 'any', 'both',
      'each', 'few', 'many', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than',
      'too', 'very', 'can', 'will', 'just', 'should', 'now', 'also', 'much', 'well', 'even', 'like',
      'make', 'may', 'might', 'could', 'would', 'must', 'shall', 'there', 'then', 'since', 'while',
      'because', 'though', 'although', 'unless', 'until', 'if', 'whether', 'before', 'after', 'during',
      'through', 'throughout', 'between', 'among', 'within', 'without', 'upon', 'over', 'under', 'above',
      'below', 'against', 'into', 'onto', 'off', 'out', 'up', 'down', 'back', 'away', 'near', 'far'
    ]);
    
    // Topic categories for classification
    const topicCategories: Record<string, string[]> = {
      technology: ['computer', 'software', 'hardware', 'digital', 'internet', 'web', 'online', 'tech', 'programming', 'code', 'app', 'application', 'device', 'gadget', 'smartphone', 'mobile', 'electronic', 'network', 'system', 'data', 'algorithm', 'automation', 'cloud', 'cyber', 'virtual', 'ai', 'artificial', 'intelligence', 'machine', 'learning'],
      business: ['business', 'company', 'corporation', 'industry', 'market', 'financial', 'finance', 'economic', 'economy', 'investment', 'investor', 'profit', 'loss', 'revenue', 'sales', 'product', 'service', 'customer', 'client', 'management', 'strategy', 'corporate', 'startup', 'entrepreneur', 'commercial', 'trade', 'retail', 'wholesale', 'enterprise'],
      education: ['education', 'school', 'university', 'college', 'academic', 'student', 'teacher', 'professor', 'learning', 'teaching', 'study', 'knowledge', 'course', 'lecture', 'curriculum', 'assignment', 'exam', 'test', 'degree', 'diploma', 'scholarship', 'research', 'science', 'theory', 'analysis', 'experiment', 'laboratory', 'classroom', 'campus'],
      health: ['health', 'medical', 'medicine', 'doctor', 'patient', 'hospital', 'clinic', 'treatment', 'therapy', 'disease', 'illness', 'condition', 'symptom', 'diagnosis', 'prescription', 'medication', 'drug', 'pharmaceutical', 'surgery', 'wellness', 'fitness', 'nutrition', 'diet', 'exercise', 'mental', 'physical', 'healthcare', 'prevention', 'recovery'],
      politics: ['political', 'politics', 'government', 'policy', 'election', 'candidate', 'campaign', 'vote', 'voter', 'democracy', 'democratic', 'republic', 'republican', 'conservative', 'liberal', 'progressive', 'traditional', 'law', 'legislation', 'regulation', 'constitutional', 'public', 'national', 'international', 'global', 'foreign', 'domestic', 'diplomatic', 'federal', 'state', 'local'],
      entertainment: ['entertainment', 'movie', 'film', 'cinema', 'television', 'show', 'series', 'episode', 'music', 'song', 'album', 'artist', 'band', 'concert', 'performance', 'theater', 'stage', 'actor', 'actress', 'celebrity', 'star', 'famous', 'popular', 'media', 'game', 'gaming', 'video', 'streaming', 'channel', 'network'],
      sports: ['sport', 'game', 'play', 'player', 'team', 'coach', 'athlete', 'competition', 'tournament', 'championship', 'league', 'match', 'season', 'score', 'win', 'lose', 'victory', 'defeat', 'football', 'soccer', 'basketball', 'baseball', 'hockey', 'tennis', 'golf', 'swimming', 'running', 'racing', 'olympic', 'professional'],
      environment: ['environment', 'environmental', 'nature', 'natural', 'earth', 'planet', 'climate', 'weather', 'temperature', 'global', 'warming', 'pollution', 'contamination', 'waste', 'recycling', 'renewable', 'sustainable', 'conservation', 'preservation', 'ecological', 'ecosystem', 'biodiversity', 'species', 'animal', 'plant', 'forest', 'ocean', 'water', 'air', 'energy']
    };
    
    const significantWords = words.filter(word => !commonWords.has(word) && word.length > 3);
    
    // Count word frequencies
    const wordFrequency: { [key: string]: number } = {};
    for (const word of significantWords) {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    }
    
    // Count topic categories
    const topicCounts: Record<string, number> = {};
    for (const word of significantWords) {
      for (const [category, keywords] of Object.entries(topicCategories)) {
        if (keywords.includes(word)) {
          topicCounts[category] = (topicCounts[category] || 0) + wordFrequency[word];
        }
      }
    }
    
    // Get most common topics
    const detectedTopics = Object.entries(topicCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category]) => category);
    
    // Get top words as potential topics
    const topWords = Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
    
    // Combine categorized topics with specific topic words
    return [...detectedTopics, ...topWords.filter(word => !detectedTopics.includes(word))].slice(0, 5);
  };
  
  // New feature: Formality analysis
  const formalityAnalysis = () => {
    if (!text.trim()) return { formality: 'Neutral', score: 0.5 };
    
    const words = text.toLowerCase().match(/\b\w+\b/g) || [];
    if (words.length === 0) return { formality: 'Neutral', score: 0.5 };
    
    const formalIndicators = [
      // Formal vocabulary
      'therefore', 'thus', 'consequently', 'furthermore', 'moreover', 'however', 'nevertheless', 
      'accordingly', 'subsequently', 'regarding', 'concerning', 'additionally', 'alternatively',
      'furthermore', 'notwithstanding', 'specifically', 'significantly', 'consequently', 'whereas',
      'hereby', 'therein', 'therewith', 'thereby', 'aforementioned', 'henceforth', 'hence',
      'facilitate', 'objective', 'optimal', 'proceed', 'sufficient', 'adequate', 'endeavor',
      'commence', 'terminate', 'obtain', 'utilize', 'implement', 'demonstrate', 'indicate',
      'constitute', 'represent', 'determine', 'attain', 'perceive', 'exhibit', 'initiate',
      'conclude', 'summarize', 'establish', 'consider', 'require', 'maintain', 'provide',
      
      // Complex words (typically more formal)
      'approximately', 'significant', 'characteristic', 'preliminary', 'fundamental', 'comprehensive',
      'substantial', 'considerable', 'extensive', 'additional', 'essential', 'particular', 'specific',
      'appropriate', 'relevant', 'potential', 'suitable', 'effective', 'efficient', 'necessary',
      'sufficient', 'primary', 'secondary', 'alternative', 'comparable', 'equivalent', 'identical',
      'consistent', 'constant', 'variable', 'relative', 'absolute', 'precise', 'accurate', 'exact'
    ];
    
    const informalIndicators = [
      // Contractions
      "don't", "can't", "won't", "didn't", "couldn't", "shouldn't", "wouldn't", "isn't", "aren't",
      "haven't", "hasn't", "hadn't", "doesn't", "ain't", "y'all", "you're", "we're", "they're",
      "i'm", "he's", "she's", "it's", "that's", "what's", "who's", "where's", "there's", "here's",
      "how's", "i've", "you've", "we've", "they've", "i'd", "you'd", "he'd", "she'd", "we'd", "they'd",
      "i'll", "you'll", "he'll", "she'll", "we'll", "they'll", "let's",
      
      // Informal vocabulary and slang
      'yeah', 'yep', 'nope', 'cool', 'awesome', 'okay', 'ok', 'lol', 'haha', 'btw', 'fyi', 'asap',
      'gonna', 'wanna', 'gotta', 'kinda', 'sorta', 'dunno', 'lemme', 'gimme', 'gotcha', 'ya', 'yah',
      'nah', 'hey', 'wow', 'oh', 'oops', 'huh', 'hmm', 'stuff', 'thing', 'thingy', 'whatsoever',
      'whatever', 'anyway', 'anyways', 'literally', 'basically', 'actually', 'really', 'totally',
      'super', 'pretty', 'surely', 'surely', 'guess', 'probably', 'maybe', 'perhaps', 'like', 'just'
    ];
    
    // Count sentence structure features
    const sentences = text.split(/[.!?]+/).filter(Boolean);
    let shortSentenceCount = 0;
    let questionCount = 0;
    let exclamationCount = 0;
    
    for (const sentence of sentences) {
      const words = sentence.trim().split(/\s+/).length;
      if (words < 8) shortSentenceCount++;
      if (sentence.includes('?')) questionCount++;
      if (sentence.includes('!')) exclamationCount++;
    }
    
    // Count formal and informal indicators
    let formalCount = 0;
    let informalCount = 0;
    
    for (const word of words) {
      if (formalIndicators.includes(word)) formalCount++;
      if (informalIndicators.includes(word)) informalCount++;
    }
    
    // Adjust counts based on sentence structure
    const shortSentenceRatio = shortSentenceCount / Math.max(1, sentences.length);
    const questionRatio = questionCount / Math.max(1, sentences.length);
    const exclamationRatio = exclamationCount / Math.max(1, sentences.length);
    
    // Short sentences, questions, and exclamations tend to be more informal
    informalCount += (shortSentenceRatio * 2 + questionRatio + exclamationRatio) * words.length * 0.05;
    
    // Calculate formality score
    const formalityScore = (formalCount - informalCount) / Math.max(1, words.length) * 3 + 0.5;
    const clampedScore = Math.max(0, Math.min(1, formalityScore));
    
    // Determine formality level
    let formality = 'Neutral';
    if (clampedScore > 0.7) formality = 'Very Formal';
    else if (clampedScore > 0.55) formality = 'Formal';
    else if (clampedScore < 0.3) formality = 'Very Informal';
    else if (clampedScore < 0.45) formality = 'Informal';
    
    return { formality, score: clampedScore };
  };
  
  // Run all analyses
  const { sentiment, score: sentimentScore, emotionTones, emotionBreakdown } = sentimentAnalysis();
  const { readability, score: readabilityScore } = readabilityAnalysis();
  const topicSuggestions = extractTopics();
  const { formality, score: formalityScore } = formalityAnalysis();
  
  // Word frequency analysis (keeping your existing code)
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
    emotionTones,
    emotionBreakdown,
    readability,
    readabilityScore,
    topicSuggestions,
    wordFrequency,
    formality,
    formalityScore
  };
};