const { zokou } = require("../framework/zokou");
const ai = require('unlimited-ai');
const axios = require('axios'); // Added missing axios import
const fs = require('fs');
const conf = require(__dirname + "/../set");

// Common function for fetching GPT responses
const fetchGptResponse = async (url, query) => {
  try {
    const response = await axios.get(url + encodeURIComponent(query));
    const data = response.data;
    if (data && data.status) {
      return data.BK9;
    } else {
      throw new Error('Failed to retrieve GPT response.');
    }
  } catch (error) {
    console.error('Error fetching GPT response:', error);
    return 'Something went wrong. Unable to fetch GPT response.';
  }
};

// General handler for AI commands
const handleAiCommand = async (dest, zk, params, url, usageExample) => {
  const { repondre, arg } = params;
  const alpha = arg.join(" ").trim();

  if (!alpha) {
    return repondre(usageExample);
  }

  const text = alpha;

  try {
    const response = await fetchGptResponse(url, text);

    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: conf.BOT,
          body: "Keep learning",
          thumbnailUrl: conf.URL,
          sourceUrl: "https://whatsapp.com/channel/0029VavxSwfLY6czRd1i0K39",
          mediaType: 1,
          showAdAttribution: true,
        },
      },
    });
  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
};

// Beltah command handlers
  
zokou({
  nomCom: "gpt",
  aliases: ["gpt4", "ai"],
  reaction: '🤖',
  categorie: "AI"
}, async (dest, zk, params) => {
  const { repondre, arg } = params;
  const alpha = arg.join(" ").trim();

  if (!alpha) {
    return repondre("Please provide a song name.");
  }

  const text = alpha;
  try {
    const model = 'gpt-4-turbo-2024-04-09';
    const messages = [
      { role: 'user', content: text },
      { role: 'system', content: 'You are an assistant in WhatsApp. You are called Beltah. You respond to user commands.' }
    ];

    const response = await ai.generate(model, messages);

    await zk.sendMessage(dest, {
      text: response,
      contextInfo: {
        externalAdReply: {
          title: conf.BOT,
          body: "keep learning with HEISME",
          thumbnailUrl: conf.URL,
          sourceUrl: "https://whatsapp.com/channel/0029VavxSwfLY6czRd1i0K39",
          mediaType: 1,
          showAdAttribution: true,
        },
      },
    });
  } catch (error) {
    console.error("Error generating AI response:", error);
    await repondre("Sorry, I couldn't process your request.");
  }
});
