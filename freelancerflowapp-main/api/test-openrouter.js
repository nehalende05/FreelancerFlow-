require('dotenv').config();

async function testOpenRouter() {
  try {
    console.log("Testing OpenRouter API...");
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": [
          { "role": "user", "content": "Say hello!" }
        ],
      })
    });

    const data = await response.json();
    console.log("Response:", JSON.stringify(data, null, 2));
    if (data.choices && data.choices[0]) {
      console.log("Success! AI says:", data.choices[0].message.content);
    } else {
      console.error("Failed to get a valid response.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

testOpenRouter();
