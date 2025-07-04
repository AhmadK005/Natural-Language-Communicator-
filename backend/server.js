const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors()); // ✅ Must be before routes

const PORT = 4000;

// Root route for basic connectivity
app.get('/', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Log message to JSON file
app.post('/message', (req, res) => {
  const { message } = req.body;
  const logPath = path.join(__dirname, 'data', 'chatlog.json');
  fs.mkdirSync(path.dirname(logPath), { recursive: true });

  let existing = [];
  if (fs.existsSync(logPath)) {
    existing = JSON.parse(fs.readFileSync(logPath));
  }

  existing.push({ message, time: new Date() });
  fs.writeFileSync(logPath, JSON.stringify(existing, null, 2));

  res.send({ reply: "Got your message!" });
});

// Forward prompt to Ollama
app.post('/ask', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post('http://localhost:11434/api/generate', {
      model: "mistral",
      prompt,
      stream: false
    });

    console.log("Ollama raw response:", response.data);

    // Return only the generated text
    res.json({ response: response.data.response || "No response received." });

  } catch (err) {
    console.error("Ollama error:", err.message);
    res.status(500).json({ error: "Failed to get response from Ollama" });
  }
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
