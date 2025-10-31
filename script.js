const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");

async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  messageInput.value = "";
  appendMessage("Aarabot", "Thinking...");

  try {
    const reply = await getBotReply(message);
    updateLastBotMessage(reply);
  } catch (err) {
    updateLastBotMessage("Oops! Something went wrong.");
  }
}

function appendMessage(sender, text) {
  const msg = document.createElement("div");
  msg.textContent = `${sender}: ${text}`;
  msg.style.margin = "5px 0";
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function updateLastBotMessage(newText) {
  const messages = chatBox.querySelectorAll("div");
  const lastMsg = messages[messages.length - 1];
  lastMsg.textContent = `Aarabot: ${newText}`;
}

// 💡 This connects to GPT
async function getBotReply(message) {
  const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer mistral-api-key" // Replace this line later with real key
    },
    body: JSON.stringify({
      model: "mistral-tiny",
      messages: [
        { role: "system", content: "You are Aarabot, a friendly AI like ChatGPT." },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Sorry, I didn’t get that.";
}
