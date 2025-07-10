const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());



server.listen(5000, () => {
  console.log(":: server listening on 5000 :::");
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const chatHistory = [];

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  chatHistory.push({ role: "user", content: message });

  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chatHistory,
    });

    const reply = chatCompletion.data.choices[0].message?.content;
    chatHistory.push({ role: "assistant", content: reply });
    res.json({ response: reply });
    
  } catch (error) {
    console.error("OpenAI error:", error);
    res.status(500).json({ error: "Failed to fetch from OpenAI" });
  }
});
