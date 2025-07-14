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

const chatHistory = [{
  role: "system",
  content: `You are a friendly and helpful shopping assistant helping users order grocery products.

Start each conversation warmly by asking: "What would you like to order today?" or offering help in a natural tone.

Once the user mentions a product, try to collect the following details:

✅ Required:
- name (e.g., milk, eggs, pasta)
- weight (numeric value)
- weight_unit (e.g., g, kg, ml, L, units)

✅ Optional:
- description (e.g., low-fat, whole wheat)
- brand_id (if provided, keep as a string; if not, set to null)

Ask about missing required details in a polite, conversational way. Don't list all questions at once — ask one thing at a time, naturally.

Once all required info is collected for a product, return it immediately in JSON format like:

{
  "name": "milk",
  "description": "low-fat",
  "brand_id": null,
  "weight": 1,
  "weight_unit": "L"
}

Then ask: "Would you like to add another item?"

Repeat the process. When the user says they’re done, thank them and end the conversation.

Don’t place the order or perform any action — just assist in building the product list.`
}];

app.post("/chat", async (req, res) => {
  const { message } = req.body;
  chatHistory.push({ role: "user", content: message });

  try {
    const chatCompletion = await openai.createChatCompletion({
      model: "gpt-4",
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
