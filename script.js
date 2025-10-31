const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message");

async function sendMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  appendMessage("You", message);
  messageInput.value = "";

  appendMessage("Aarabot", "Thinking...");

  // This is a simple demo using a free public API for now (no key needed)
  try {
    const reply = await getBotReply(message);
    updateLastBotMessage(reply);
  } catch (err) {
    updateLastBotMessage("Oops! Something went wrong. Try again later.");
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

async function getBotReply(userMessage) {
  // Simple local replies (works offline)
  const localReplies = {
    hi: "Hello! I'm Aarabot, your friendly AI 🤖",
    hello: "Hi there! How can I help you today?",
    bye: "Goodbye! Have a nice day 🌸",
  };

  const lower = userMessage.toLowerCase();
  if (localReplies[lower]) return localReplies[lower];

  // Basic free API for fun replies (no OpenAI key needed)
  const res = await fetch(`https://api.monkedev.com/fun/chat?msg=${encodeURIComponent(userMessage)}`);
  const data = await res.json();
  return data.response;
}
