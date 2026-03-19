const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function run() {
  try {
    // Note: The library doesn't have a direct listModels, but we can try a different approach 
    // or just try common names.
    const models = ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-pro', 'gemini-1.0-pro'];
    for (const m of models) {
      try {
        const model = genAI.getGenerativeModel({ model: m });
        const result = await model.generateContent("Hi");
        const response = await result.response;
        console.log(`Success with: ${m}`);
        return;
      } catch (e) {
        console.log(`Failed with: ${m} - ${e.message}`);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

run();
