import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { EditableText } from '@/components/editor/EditableText';

export default function SummarySection() {
  // Chat states
  const [inputValue, setInputValue] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [visibleTiles, setVisibleTiles] = useState([false, false, false, false]);

  const sampleQuestions = [
    "What's the weather in Cologne",
    "Exotic travel destinations in Africa",
    "Next Deloitte Derby date",
    "What's your Deloitte Event App called"
  ];

  const tiles = [
    {
      color: '#046A38',
      content: 'image',
      imageSrc: '/placeholder-complexity.png', // TODO: Replace with actual screenshot
      alt: 'Complexity, silos, and regulation slow down steering'
    },
    {
      color: '#0070c0',
      content: 'iframe',
      iframeSrc: 'https://brenneisen-e.github.io/VSTEike/',
      alt: 'VSTEike Prototype'
    },
    {
      color: '#86BC25',
      content: 'image',
      imageSrc: '/placeholder-barmenia.png', // TODO: Replace with actual screenshot
      alt: 'BarmeniaGotaher Product'
    },
    {
      color: '#FFA500',
      content: 'image',
      imageSrc: '/placeholder-growth.png', // TODO: Replace with actual screenshot
      alt: '5-Year Growth Trajectory'
    }
  ];

  // Handle input change with autocomplete
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Show suggestion when user types "Fas"
    if (value.toLowerCase().startsWith('fas') && value.length >= 3) {
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }
  };

  // Accept suggestion
  const acceptSuggestion = () => {
    setInputValue('Summarize the manager case');
    setShowSuggestion(false);
  };

  // Handle chat submission
  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setShowSuggestion(false);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Start thinking
    setIsThinking(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsThinking(false);

    // Response sequence
    const responses = [
      {
        content: 'Of course! Your case is called "Breaking Complexity\nAI driven prototypes that unlock data & steering"',
        delay: 800
      },
      {
        content: 'You have demonstrated four key competencies:',
        delay: 1000
      },
      {
        content: '1. Domain Expertise: You know how to apply it.',
        delay: 1200,
        showTile: 0
      },
      {
        content: '2. Technology Mastery: You know how to build it.',
        delay: 10000,
        showTile: 1
      },
      {
        content: '3. Sales & Proof of Concept: You know how to sell it.',
        delay: 10000,
        showTile: 2
      },
      {
        content: '4. Business Impact & Scaling: You know how to monetise it.',
        delay: 10000,
        showTile: 3
      },
      {
        content: '**You are ready to become a Deloitte Manager**',
        delay: 10000,
        bold: true
      }
    ];

    for (const response of responses) {
      await new Promise(resolve => setTimeout(resolve, response.delay));

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.content,
        bold: response.bold
      }]);

      // Show tile if needed
      if (response.showTile !== undefined) {
        setVisibleTiles(prev => {
          const newTiles = [...prev];
          newTiles[response.showTile] = true;
          return newTiles;
        });
      }

      // Auto-scroll to bottom
      setTimeout(() => {
        const messagesContainer = document.querySelector('.chat-messages');
        if (messagesContainer) {
          messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
      }, 100);
    }
  };

  return (
    <section id="summary" className="h-screen w-full bg-gradient-to-br from-white to-gray-100 flex flex-col px-20 py-12 overflow-hidden relative">
      {/* Title Section - always visible */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20"
      >
        <EditableText
          id="summary-title"
          as="h1"
          defaultSize="text-4xl"
          className="font-normal text-black text-left mb-2"
          style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}
        >
          Breaking complexity starts with me
        </EditableText>

        <EditableText
          id="summary-subtitle"
          as="h2"
          defaultSize="text-2xl"
          className="text-gray-600 text-left mb-8"
        >
          From PowerPoint to AI-driven prototypes that turn ideas into impact.
        </EditableText>
      </motion.div>

      {/* Tiles Grid in Background */}
      <div className="absolute inset-0 grid grid-cols-2 gap-6 p-20 pt-40">
        {tiles.map((tile, index) => (
          <AnimatePresence key={index}>
            {visibleTiles[index] && (
              <motion.div
                className="bg-white rounded-xl shadow-lg overflow-hidden"
                style={{ borderTop: `6px solid ${tile.color}` }}
                initial={{ opacity: 0, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {tile.content === 'image' ? (
                  <div className="w-full h-full flex items-center justify-center p-8 bg-gray-50">
                    <div className="text-center">
                      <div className="text-6xl mb-4">📊</div>
                      <div className="text-gray-500 text-sm">{tile.alt}</div>
                      <div className="text-xs text-gray-400 mt-2">Placeholder Image</div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src={tile.iframeSrc}
                    className="w-full h-full border-0"
                    title={tile.alt}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        ))}
      </div>

      {/* Chat Interface - VSTEike Design with Green Theme */}
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="w-full max-w-4xl">
          {/* Chat Container */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden" style={{ maxHeight: 'calc(100vh - 100px)' }}>
            {/* Chat Header */}
            <div
              className="p-6 text-white"
              style={{
                background: 'linear-gradient(135deg, #046A38 0%, #86BC25 100%)'
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-3xl flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #046A38 0%, #86BC25 100%)'
                  }}
                >
                  🤖
                </div>
                <div>
                  <EditableText id="chat-header-title" defaultSize="text-2xl" className="font-semibold">
                    Eike's Assistant
                  </EditableText>
                  <EditableText id="chat-header-subtitle" defaultSize="text-sm" className="opacity-90">
                    Welcome back!
                  </EditableText>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="p-8">
              {/* Welcome Message - only show if no messages yet */}
              {messages.length === 0 && (
                <div className="flex gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #046A38 0%, #86BC25 100%)'
                    }}
                  >
                    🤖
                  </div>
                  <div className="bg-gray-100 p-5 rounded-2xl flex-1">
                    <p className="mb-3"><strong>Hello Eike! 👋</strong></p>
                    <p className="mb-3 text-gray-700">I'm your AI assistant for the manager case.</p>
                    <p className="text-gray-700">What would you like to do?</p>
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {messages.length > 0 && (
                <div className="chat-messages mb-4 max-h-96 overflow-y-auto space-y-4">
                  {messages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      className="flex gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {msg.role === 'assistant' && (
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                          style={{
                            background: 'linear-gradient(135deg, #046A38 0%, #86BC25 100%)'
                          }}
                        >
                          🤖
                        </div>
                      )}
                      <div className={`flex-1 ${msg.role === 'user' ? 'ml-auto max-w-[70%]' : ''}`}>
                        <div
                          className={`p-4 rounded-2xl ${
                            msg.role === 'user'
                              ? 'bg-gradient-to-r from-[#046A38] to-[#86BC25] text-white ml-auto'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          <p className={`whitespace-pre-wrap ${msg.bold ? 'font-bold text-lg' : ''}`}>
                            {msg.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {/* Thinking indicator */}
                  {isThinking && (
                    <motion.div
                      className="flex gap-3"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-xl flex-shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, #046A38 0%, #86BC25 100%)'
                        }}
                      >
                        🤖
                      </div>
                      <div className="bg-gray-100 p-4 rounded-2xl flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin text-[#046A38]" />
                        <span className="text-gray-600">(Thinking....)</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* Chat Input Container */}
              <div className="mb-4">
                <div className="flex gap-3 relative">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                      placeholder="Ask me something about the manager case..."
                      className="w-full px-5 py-4 border-2 rounded-xl text-base focus:outline-none transition-all"
                      style={{
                        borderColor: '#e2e8f0',
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#046A38'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />

                    {/* Autocomplete Suggestion */}
                    <AnimatePresence>
                      {showSuggestion && (
                        <motion.div
                          className="absolute top-full left-0 right-0 mt-2 bg-white border-2 rounded-xl p-3 shadow-xl cursor-pointer z-10"
                          style={{ borderColor: '#86BC25' }}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          onClick={acceptSuggestion}
                        >
                          <div className="text-gray-800">
                            <span className="text-gray-600 text-sm">Suggestion:</span>{' '}
                            <span className="text-[#046A38] font-semibold">Summarize the manager case</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!inputValue.trim() || isThinking}
                    className="w-14 h-14 rounded-xl text-white font-semibold transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: (inputValue.trim() && !isThinking) ? 'linear-gradient(135deg, #046A38 0%, #86BC25 100%)' : '#cbd5e0'
                    }}
                  >
                    <Send className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Sample Questions - only show if no messages */}
              {messages.length === 0 && (
                <div className="flex flex-wrap gap-3">
                  {sampleQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      className="px-4 py-2 border-2 rounded-full bg-white text-gray-600 text-sm transition-all hover:transform hover:-translate-y-1"
                      style={{ borderColor: '#e2e8f0' }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = '#046A38';
                        e.target.style.color = '#046A38';
                        e.target.style.background = '#f0fdf4';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = '#e2e8f0';
                        e.target.style.color = '#64748b';
                        e.target.style.background = 'white';
                      }}
                      onClick={() => setInputValue(question)}
                    >
                      💡 {question}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
