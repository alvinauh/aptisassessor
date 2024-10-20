import OpenAI from 'openai';

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

const openai = apiKey && apiKey !== 'your_openai_api_key_here'
  ? new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser: true // Note: In a production app, you should use a backend to make API calls
    })
  : null;

export const assessCEFRLevel = async (text: string, skill: 'reading' | 'writing' | 'speaking' | 'listening'): Promise<string> => {
  if (!openai) {
    return "OpenAI API key is not set or is invalid. Please configure the VITE_OPENAI_API_KEY environment variable in the .env file with your actual API key.";
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert in CEFR (Common European Framework of Reference for Languages) levels. Assess the following ${skill} sample and determine its CEFR level (A1, A2, B1, B2, C1, or C2). Provide a brief explanation for your assessment.`
        },
        {
          role: "user",
          content: text
        }
      ],
    });

    return response.choices[0].message.content || "Unable to assess CEFR level.";
  } catch (error) {
    console.error('Error assessing CEFR level:', error);
    if (error.response && error.response.status === 401) {
      return "Invalid API key. Please check your OpenAI API key in the .env file.";
    }
    return "Error occurred while assessing CEFR level. Please try again later.";
  }
};