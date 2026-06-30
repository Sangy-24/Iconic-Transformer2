import { useState, useRef, useEffect } from "react";
import { ML_API_BASE } from "../api/mlService";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to Iconic Transformers! How can I help you today?"
    }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const question = input;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: question
      }
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${ML_API_BASE}/chatbot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          query: question
        })
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: data.response
        }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Unable to connect to AI server."
        }
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-16 w-16 rounded-full bg-blue-600 text-white text-3xl shadow-xl hover:bg-blue-700"
      >
        🤖
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[600px] rounded-md bg-white shadow-2xl flex flex-col overflow-hidden">

          <div className="bg-blue-600 text-white p-4">

            <h2 className="font-bold text-lg">
              Iconic AI Assistant
            </h2>

            

          </div>

          <div className="flex-1 overflow-y-auto p-4 bg-gray-100">

            {messages.map((msg, index) => (

              <div
                key={index}
                className={`mb-4 flex ${
                  msg.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] rounded-md px-4 py-3 ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white shadow"
                  }`}
                >
                  {msg.text}
                </div>

              </div>

            ))}

            {loading && (
              <div className="text-gray-500">
                AI is typing...
              </div>
            )}

            <div ref={bottomRef}></div>

          </div>

          <div className="p-3 border-t flex gap-2">

            <input
              className="flex-1 border rounded-lg px-3 py-2 outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              onKeyDown={(e)=>{
                if(e.key==="Enter")
                  sendMessage();
              }}
            />

            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-5 rounded-lg"
            >
              Send
            </button>

          </div>

        </div>
      )}
    </>
  );
}