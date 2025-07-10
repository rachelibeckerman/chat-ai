import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setChat([...chat, `You: ${message}`]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setChat((prev) => [...prev, `Bot: ${data.response}`]);
    } catch (err) {
      setChat((prev) => [...prev, "Bot: Error occurred"]);
    } finally {
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ChatGPT Client</h1>
      <div style={{ marginBottom: 10 }}>
        {chat.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        {loading && <div>Bot: typing...</div>}
      </div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        style={{ width: "70%" }}
        placeholder="Type your message"
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
