import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

export interface ModerationResult {
  isAppropriate: boolean;
  reason?: string;
}

export async function moderateContent(content: string): Promise<ModerationResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are a content moderator. Analyze the following text for inappropriate content, hate speech, or harmful language.
    Rules:
    1. Check for hate speech, discrimination, or harmful content
    2. Check for explicit or adult content
    3. Check for harassment or bullying
    4. Check for illegal content or activities
    
    If the content is inappropriate, respond with "INAPPROPRIATE:" followed by the specific reason.
    If the content is appropriate, respond with "APPROPRIATE".
    
    Text to analyze: "${content}"`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text().trim();
    
    // Parse the response
    if (text.startsWith('INAPPROPRIATE:')) {
      return {
        isAppropriate: false,
        reason: text.substring('INAPPROPRIATE:'.length).trim()
      };
    } else if (text === 'APPROPRIATE') {
      return { isAppropriate: true };
    } else {
      // If response format is unexpected, log it and default to allowing the content
      console.warn('Unexpected moderation response:', text);
      return { isAppropriate: true };
    }
  } catch (error) {
    console.error('Error in content moderation:', error);
    // In case of error, allow the content but log the error
    return { isAppropriate: true };
  }
} 