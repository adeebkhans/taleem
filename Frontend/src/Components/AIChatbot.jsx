import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AIChatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch previous conversation when component mounts
  useEffect(() => {
    const fetchConversation = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/chat/history`, {
          withCredentials: true, // Ensure cookies are sent
        });
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error("Error fetching conversation:", error);
      }
    };

    fetchConversation();
  }, []);

  // Scroll to the bottom of the chat when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    try {
      setIsLoading(true);
      const userMessage = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
  
      // Call backend
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/chat`,
        { message: input },
        { withCredentials: true }
      );
  
      setMessages((prev) => [...prev, { role: "assistant", content: response.data.response }]);
      setInput("");
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestions = [
    "What scholarships are available for Muslim students in India?",
    "How does Islam emphasize the importance of education?",
    "How can Muslim girls in India access higher education opportunities?",
    "Tell me about top Minority universities in India",
    "Opportunities for Muslim students in India to study abroad",
    "How can I balance religious and modern education?",
  ];

  return (
    <div className="w-full min-h-screen pt-20 px-4 flex gap-6 bg-gradient-to-br from-gray-900 to-blue-900">
      {/* Left side - Suggestions */}
      <div className="w-80 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 h-fit border border-white/10">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">
          Common Questions
        </h3>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setInput(suggestion)}
              className="w-full text-left p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 text-sm transition-colors border border-white/5"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Right side - Chat Interface */}
      <div className="flex-1 bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/10">
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-4">
          Salam! I'm Your Taleem Assistant
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Here to guide you on your educational journey, offer support, and answer your questions about learning and opportunities.
        </p>

        <div className="space-y-4 mb-4 h-[50vh] overflow-y-auto bg-white/5 rounded-xl p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-xl p-3 text-sm ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-200'
                }`}
              >
                {message.role === 'user' ? (
                  message.content
                ) : (
                  <ReactMarkdown
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <SyntaxHighlighter
                            style={dracula}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      },
                      p: ({ children }) => <p className="mb-2">{children}</p>,
                      h1: ({ children }) => <h1 className="text-xl font-bold mb-2">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-lg font-bold mb-2">{children}</h2>,
                      ul: ({ children }) => <ul className="list-disc ml-4 mb-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal ml-4 mb-2">{children}</ol>,
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      a: ({ href, children }) => (
                        <a href={href} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                          {children}
                        </a>
                      ),
                    }}
                  >
                    {message.content}
                  </ReactMarkdown>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white/5 rounded-xl p-3 text-gray-200 animate-pulse">
                Thinking...
              </div>
            </div>
          )}
          {/* This div will act as the scroll target */}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about scholarships, institutes, or learning in Islam..."
            className="flex-1 p-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIChatbot;
