import { useState } from "react";

type ChatMessage = {
  role: string;
  content: string;
};

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    setChat([...chat, { role: "user", content: message }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
      const data = await res.json();
      setChat((prev) => [...prev, { role: "assistant", content: `${data.response}` }]);
    } catch (err) {
      console.error("Fetch error:", err);
      setChat((prev) => [...prev, { role: "assistant", content: "Error occurred" }]);
    } finally {
      setMessage("");
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="flex flex-col justify-between w-full max-w-md h-[80vh] bg-white shadow-xl rounded-xl p-4">
        <div className="flex-1 overflow-y-auto space-y-2 mb-4">
          {chat.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`px-4 py-2 rounded-xl max-w-[70%] break-words ${msg.role === "user"
                  ? "bg-gray-200 text-gray-900"
                  : "bg-blue-100 text-gray-900"
                  }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="px-4 py-2 rounded-xl bg-blue-100 text-gray-500">
                typing...
              </div>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring"
            placeholder="Type your message"
          />
          <button
            onClick={handleSend}
            className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
