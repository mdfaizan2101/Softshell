// src/components/ChatWidget.jsx
import React, { useState } from 'react';
import '../styles/ChatWidget.css';

const exampleQuestions = [
  "How do I sell my license?",
  "What types of software do you accept?",
  "How long does payment take?",
];

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [chat, setChat] = useState([{ role: "assistant", content: "Hi! Ask me anything about SoftSell." }]);
  const [input, setInput] = useState("");

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setChat([...chat, userMessage]);

    // --- OpenAI API Call ---
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [...chat, userMessage],
          max_tokens: 100,
        }),
      });

      const data = await res.json();
      const botReply = data.choices?.[0]?.message || {
        role: "assistant",
        content: "Sorry, something went wrong.",
      };
      setChat(prev => [...prev, botReply]);
    } catch (error) {
      setChat(prev => [...prev, { role: "assistant", content: "Mocked: You can sell your license by clicking 'Get a Quote'." }]);
    }

    setInput("");
  };

  return (
    <div className="chat-widget">
      <button className="chat-button" onClick={toggleChat}>💬</button>
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">SoftSell Assistant <span onClick={toggleChat}>✖</span></div>
          <div className="chat-messages">
            {chat.map((msg, i) => (
              <div key={i} className={`chat-message ${msg.role}`}>{msg.content}</div>
            ))}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMessage()}
              placeholder="Ask a question..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWidget;
