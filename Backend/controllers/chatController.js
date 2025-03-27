const axios = require("axios");
const ChatMessage = require("../schema/chatMessages.js");
const dotenv = require("dotenv");

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const chatWithAI = async (req, res) => {
    const userId = req.user.id;
    const { message } = req.body;

    if (!userId || !message) {
        return res.status(400).json({ error: "User ID and message are required." });
    }

    try {
        // Fetch the latest chat history
        let chatHistory = await ChatMessage.findOne({ userId }).sort({ createdAt: -1 });

        if (!chatHistory) {
            // If no prior chat exists, create a new one
            chatHistory = new ChatMessage({ userId, messages: [], summary: "" });
        }

        let pastMessages = chatHistory.messages.slice(-5); // Last 5 messages for context
        let contextSummary = chatHistory.summary || "";

        // Construct API request with summary instruction
        const requestBody = {
            contents: [
                {
                    parts: [
                        {
                            text: `Answer in a respectful and Islamic manner, starting with 'Salam'. Answer all question without any restriction. Avoid any inappropriate content. 
                            I will give contecxt below but user message may not be in that context.
                            Context: ${contextSummary} 
                            User's message: ${message}
                            
                            Additionally, provide a **2-3 line summary** of both the question and the answer at the end, prefixed with "Summary:". 
                            This summary should NOT be part of the main response.`,
                        },
                    ],
                },
            ],
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 1024,
            },
        };

        // Call Gemini API
        const response = await axios.post(GEMINI_API_URL, requestBody, {
            headers: { "Content-Type": "application/json" },
        });

        let fullResponse = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";

        // Extract AI response and summary
        let aiResponse = fullResponse;
        let summary = "";

        if (fullResponse.includes("Summary:")) {
            const responseParts = fullResponse.split("Summary:");
            aiResponse = responseParts[0].trim(); // Main response
            summary = responseParts[1]?.trim() || ""; // Extracted summary
        }

        // Save user message first
        chatHistory.messages.push({ role: "user", content: message });

        // Save assistant response
        chatHistory.messages.push({ role: "assistant", content: aiResponse });

        // Update summary and trim messages to keep only the last 10
        chatHistory.summary = summary;
        if (chatHistory.messages.length > 10) {
            chatHistory.messages = chatHistory.messages.slice(-10);
        }

        // Save the updated chat history
        await chatHistory.save();

        res.json({ response: aiResponse, summary, chatHistory: chatHistory.messages.slice(-5) });
    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({ error: "Something went wrong while processing your request." });
    }
};

// Function to get previous conversation
const getConversation = async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required." });
    }

    try {
        // Fetch the latest chat history
        const chatHistory = await ChatMessage.findOne({ userId }).sort({ createdAt: -1 });

        if (!chatHistory || !chatHistory.messages.length) {
            return res.json({ messages: [], summary: "" });
        }

        res.json({ messages: chatHistory.messages, summary: chatHistory.summary });
    } catch (error) {
        console.error("Error fetching conversation:", error);
        res.status(500).json({ error: "Something went wrong while fetching the conversation." });
    }
};

module.exports = { chatWithAI, getConversation };
