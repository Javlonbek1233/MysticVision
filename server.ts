import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Initialize dotenv configuration
dotenv.config();

// Initialize the Google GenAI client with headers as required by Gemini guideline
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Body parsers
  app.use(express.json());

  // API Route 1: Personal AI Spiritual Chat Assistant (Aura)
  app.post("/api/spiritual-assistant", async (req, res) => {
    try {
      const { messages, tarotContext } = req.body;
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: "Messages array is required." });
      }

      // Convert messages to Gemini format
      const isSystemPreset = "You are Aura, a gentle, highly intuitive, sage-like spiritual guide and cosmic priestess of MysticVision. Speak in a soothing, mystical, comforting tone (using terms like 'dear seeker', 'celestial flow', 'sacred path'). You help the user understand their zodiac signs, tarot card draws, dreams, and life questions with profound empathy and wisdom.";
      
      const promptContext = tarotContext 
        ? `\n\n[Seeker's Tarot Pull Context]: The seeker just pulled these Tarot cards: ${JSON.stringify(tarotContext)}. Please guide them on their specific question, integrating these cards' upright/reversed positions and deeper cosmic meanings into your dialogue.`
        : "";

      // We will use the chat history to feed contents
      const lastMessage = messages[messages.length - 1];
      const chatHistory = messages.slice(0, -1).map((msg: any) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      // Generate content
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: [
          ...chatHistory,
          { role: "user", parts: [{ text: lastMessage.text + promptContext }] }
        ],
        config: {
          systemInstruction: isSystemPreset,
          temperature: 0.9,
          topP: 0.95,
        },
      });

      const responseText = response.text || "The stars are quiet at this moment. Please ask another question, seeker.";
      return res.json({ text: responseText });
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      return res.status(500).json({ 
        error: "An eclipse has obscured the celestial connection. Please try again.",
        details: error?.message || "" 
      });
    }
  });

  // API Route 2: Customized, AI-powered Horoscope
  app.post("/api/horoscope", async (req, res) => {
    try {
      const { sign, name, element, topic } = req.body;
      if (!sign) {
        return res.status(400).json({ error: "Zodiac sign is required." });
      }

      const seekerName = name || "Seeker";
      const focusTopic = topic || "general wellness, spiritual connection, energy flow, and destiny";
      
      const prompt = `Generate a deeply mystical, highly personalized daily spiritual horoscope for the zodiac sign of ${sign}. 
      The seeker's name is ${seekerName}, their element is ${element || "unknown"}.
      Please tailor the reading to cover their general path as well as focusing on ${focusTopic}.
      The current cosmic time is May 25, 2026.
      Make it feel profoundly accurate, comforting, and magical. Use elegant planetary terminology.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              sign: { type: Type.STRING, description: "The Zodiac sign name" },
              date: { type: Type.STRING, description: "Formatted celestial date (e.g. May 25, 2026)" },
              overall: { type: Type.STRING, description: "A mystical overall daily summary starting directly with the seeker's name, detailing current planetary configurations" },
              love: { type: Type.STRING, description: "Specific love, connections, or self-love advice" },
              career: { type: Type.STRING, description: "Information on alignment, creative goals, and financial energy flow" },
              wellness: { type: Type.STRING, description: "Spiritual advice on alignment, physical state, and aura grounding" },
              cosmicAdvice: { type: Type.STRING, description: "A core daily affirmation or piece of advice" },
              energyLevel: { type: Type.INTEGER, description: "A numeric score of energy levels from 0 to 100" },
              luckyNumber: { type: Type.INTEGER, description: "A master lucky number relevant for today" },
              luckyColor: { type: Type.STRING, description: "A rare or magical color pairing (e.g. Lavender Nebula)" },
              spiritualRitual: { type: Type.STRING, description: "A simple, magical daily ritual (e.g. crystal meditation, lighting a sandalwood candle, ocean-breath loop) they can complete today" }
            },
            required: ["sign", "date", "overall", "love", "career", "wellness", "cosmicAdvice", "energyLevel", "luckyNumber", "luckyColor", "spiritualRitual"]
          }
        }
      });

      const horoscopeData = JSON.parse(response.text || "{}");
      return res.json(horoscopeData);
    } catch (error: any) {
      console.error("Horoscope Generator Error:", error);
      return res.status(500).json({ 
        error: "The galactic coordinate charts are momentarily spinning. Please try again.",
        details: error?.message || "" 
      });
    }
  });

  // Serve static files / Vite middleware
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite integration...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving static files in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[MysticVision Server] radiating peaceful energy on port ${PORT}`);
  });
}

startServer();
