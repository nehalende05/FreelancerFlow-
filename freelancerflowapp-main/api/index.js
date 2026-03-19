import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// OpenRouter / OpenAI compatible API will be used via fetch

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock user for trial
const MOCK_USER = {
  id: '1',
  email: 'admin@example.com',
  password: 'password123',
  name: 'Alex'
};

// Gemini AI Config
// AI Proxy handles requests to OpenRouter

// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    const accessToken = jwt.sign({ email: MOCK_USER.email, id: MOCK_USER.id }, process.env.JWT_SECRET);
    res.json({ accessToken, user: { name: MOCK_USER.name, email: MOCK_USER.email } });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.post('/api/ai/chat', authenticateToken, async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:8080", // Optional, for OpenRouter rankings
        "X-Title": "Freelancer Flow", // Optional
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001", // Using Gemini via OpenRouter
        "messages": [
          { "role": "user", "content": prompt }
        ],
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      res.json({ text: data.choices[0].message.content });
    } else {
      console.error('OpenRouter Error:', data);
      res.status(500).json({ error: 'Failed to generate content from AI' });
    }
  } catch (error) {
    console.error('AI Proxy Error:', error);
    res.status(500).json({ error: 'Failed to connect to AI service' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
  });
}

export default app;
