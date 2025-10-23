import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Willkommen! What would you like to do today?'
    }
  ]);

  // Handle input change with autocomplete
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // Show suggestion when user types "Ma"
    if (value.toLowerCase().startsWith('ma') && value.length >= 2) {
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }
  };

  // Accept suggestion
  const acceptSuggestion = () => {
    setInputValue('Present Managercase');
    setShowSuggestion(false);
  };

  // Handle chat submission
  const handleSubmit = () => {
    if (!inputValue.trim()) return;

    // Navigate to Landing Page (Home)
    navigate('/Home');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-8">
      <div className="w-full max-w-3xl">
        {/* Chat Container */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
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
                <div className="text-2xl font-semibold">Eike's Assistant</div>
                <div className="text-sm opacity-90">Welcome!</div>
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-8">
            {/* Messages */}
            <div className="space-y-4 mb-6">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.2 }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #046A38 0%, #86BC25 100%)'
                    }}
                  >
                    🤖
                  </div>
                  <div className="bg-gray-100 p-5 rounded-2xl flex-1">
                    <p className="text-gray-800 text-lg">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chat Input Container */}
            <div className="mb-4">
              <div className="flex gap-3 relative">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    placeholder="Type your answer..."
                    className="w-full px-5 py-4 border-2 rounded-xl text-base focus:outline-none transition-all"
                    style={{
                      borderColor: '#e2e8f0',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#046A38'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    autoFocus
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
                          <span className="text-[#046A38] font-semibold">Present Managercase</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!inputValue.trim()}
                  className="w-14 h-14 rounded-xl text-white font-semibold transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: inputValue.trim() ? 'linear-gradient(135deg, #046A38 0%, #86BC25 100%)' : '#cbd5e0'
                  }}
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
