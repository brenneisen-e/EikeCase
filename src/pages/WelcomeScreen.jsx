import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DeloitteGPTAvatar } from '@/components/DeloitteGPTAvatar';

export default function WelcomeScreen() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
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

    // Show suggestion when user types "Ge"
    if (value.toLowerCase().startsWith('ge') && value.length >= 2) {
      setShowSuggestion(true);
    } else {
      setShowSuggestion(false);
    }
  };

  // Accept suggestion
  const acceptSuggestion = () => {
    setInputValue('Generate Manager Case');
    setShowSuggestion(false);
  };

  // Handle chat submission
  const handleSubmit = async () => {
    if (!inputValue.trim() || isThinking) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setShowSuggestion(false);

    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);

    // Show "Thinking..." for 2 seconds
    setIsThinking(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsThinking(false);

    // Navigate to Landing Page (Home)
    navigate('/Home');
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-white to-gray-100 flex items-center justify-center px-8">
      <div className="w-full max-w-3xl">
        {/* Chat Container - Centered */}
        <motion.div
          className="bg-white rounded-3xl shadow-2xl flex flex-col"
          style={{ maxHeight: 'calc(100vh - 120px)', height: 'auto' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Chat Header */}
          <div
            className="p-6 text-white flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #046A38 0%, #86BC25 100%)'
            }}
          >
            <div className="flex items-center gap-4">
              <DeloitteGPTAvatar size="lg" />
              <div>
                <div className="text-2xl font-semibold">Deloitte GPT</div>
                <div className="text-sm opacity-90">Your AI Assistant</div>
              </div>
            </div>
          </div>

          {/* Chat Body */}
          <div className="p-8 flex-1 overflow-visible relative">
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
                  {msg.role === 'assistant' && <DeloitteGPTAvatar size="md" />}
                  <div className={`p-5 rounded-2xl flex-1 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-r from-[#046A38] to-[#86BC25] text-white ml-auto max-w-[70%]'
                      : 'bg-gray-100'
                  }`}>
                    <p className={`text-lg ${msg.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                      {msg.content}
                    </p>
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
                  <DeloitteGPTAvatar size="md" />
                  <div className="bg-gray-100 p-5 rounded-2xl flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin text-[#046A38]" />
                    <span className="text-gray-600">Thinking...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Chat Input Container */}
            <div className="mb-4" style={{ paddingBottom: showSuggestion ? '80px' : '0' }}>
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
                        className="absolute top-full left-0 right-0 mt-2 bg-white border-2 rounded-xl p-3 shadow-xl cursor-pointer z-[100]"
                        style={{ borderColor: '#86BC25' }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        onClick={acceptSuggestion}
                      >
                        <div className="text-gray-800">
                          <span className="text-gray-600 text-sm">Suggestion:</span>{' '}
                          <span className="text-[#046A38] font-semibold">Generate Manager Case</span>
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
          </div>
        </motion.div>
      </div>
    </div>
  );
}
