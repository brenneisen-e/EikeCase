import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import RobotPainter from './RobotPainter';

export default function SummarySection() {
  // Chat states
  const [showChat, setShowChat] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);

  // Animation states
  const [showCircle, setShowCircle] = useState(false);
  const [showRobot, setShowRobot] = useState(false);
  const [currentSpeechBubble, setCurrentSpeechBubble] = useState(-1);
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0 });

  const speechBubbles = [
    { text: "You know how to apply it.", position: "top-left" },
    { text: "You know how to build it.", position: "top-right" },
    { text: "You know how to sell it.", position: "bottom-left" },
    { text: "You know how to monetise it.", position: "bottom-right" }
  ];

  const sampleQuestions = [
    "Wie ist das Wetter in Köln",
    "Exotische Reiseziele in Afrika",
    "Nächster Deloitte Derby Termin"
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
    setInputValue('Fasse den Managercase zusammen');
    setShowSuggestion(false);
  };

  // Handle chat submission
  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    // Hide chat
    setShowChat(false);

    // Wait a bit, then show circle
    await new Promise(resolve => setTimeout(resolve, 500));

    // Calculate center position
    const section = document.querySelector('#summary');
    if (section) {
      const rect = section.getBoundingClientRect();
      const centerX = rect.width / 2;
      const centerY = (rect.height / 2) + 50; // Slightly lower to account for title

      setRobotPosition({ x: centerX, y: centerY });
      setShowCircle(true);

      // Show robot after circle animation
      await new Promise(resolve => setTimeout(resolve, 600));
      setShowRobot(true);

      // Show speech bubbles one by one
      for (let i = 0; i < speechBubbles.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentSpeechBubble(i);
        await new Promise(resolve => setTimeout(resolve, 2500));
      }

      // Hide last bubble
      setCurrentSpeechBubble(-1);
    }
  };

  // Get speech bubble position
  const getSpeechBubblePosition = (position) => {
    const offset = 280;
    const verticalOffset = 220;

    switch(position) {
      case "top-left":
        return { left: robotPosition.x - offset, top: robotPosition.y - verticalOffset };
      case "top-right":
        return { left: robotPosition.x + offset - 400, top: robotPosition.y - verticalOffset };
      case "bottom-left":
        return { left: robotPosition.x - offset, top: robotPosition.y + verticalOffset - 100 };
      case "bottom-right":
        return { left: robotPosition.x + offset - 400, top: robotPosition.y + verticalOffset - 100 };
      default:
        return { left: robotPosition.x, top: robotPosition.y };
    }
  };

  return (
    <section id="summary" className="h-screen w-full bg-gradient-to-br from-white to-gray-100 flex flex-col px-20 py-12 overflow-hidden relative">
      {/* Title Section - always visible */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1
          className="text-4xl font-normal text-black text-left mb-2"
          style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}
        >
          Breaking complexity starts with me
        </h1>

        <h2 className="text-2xl text-gray-600 text-left mb-8">
          From PowerPoint to AI-driven prototypes that turn ideas into impact.
        </h2>
      </motion.div>

      {/* Chat Interface - VSTEike Design with Green Theme */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="flex-1 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full max-w-3xl">
              {/* Chat Container */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
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
                      <div className="text-sm opacity-90">Willkommen zurück!</div>
                    </div>
                  </div>
                </div>

                {/* Chat Body */}
                <div className="p-8">
                  {/* Welcome Message */}
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
                      <p className="mb-3"><strong>Hallo Eike! 👋</strong></p>
                      <p className="mb-3 text-gray-700">Ich bin dein KI-Assistent für den Managercase.</p>
                      <p className="text-gray-700">Was möchtest du tun?</p>
                    </div>
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
                          placeholder="Frag mich etwas über den Managercase..."
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
                              <div className="text-gray-600 text-sm mb-1">Vorschlag:</div>
                              <div className="text-[#046A38] font-semibold">Fasse den Managercase zusammen</div>
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

                  {/* Sample Questions */}
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
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circle Window - appears after chat */}
      <AnimatePresence>
        {showCircle && (
          <motion.div
            className="absolute rounded-full bg-white border-8 shadow-2xl flex items-center justify-center"
            style={{
              left: robotPosition.x,
              top: robotPosition.y,
              width: '320px',
              height: '320px',
              transform: 'translate(-50%, -50%)',
              borderColor: '#e5e7eb',
              boxShadow: '0 0 60px rgba(0, 0, 0, 0.15), inset 0 0 30px rgba(134, 188, 37, 0.1)',
              zIndex: 40
            }}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          >
            <div
              className="absolute inset-4 rounded-full border-4 opacity-30"
              style={{ borderColor: '#86BC25' }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Robot with larger size */}
      {showRobot && (
        <RobotPainter
          position={robotPosition}
          isPainting={false}
          large={true}
        />
      )}

      {/* Speech Bubbles */}
      <AnimatePresence>
        {currentSpeechBubble >= 0 && (
          <motion.div
            className="absolute bg-white rounded-2xl p-6 shadow-2xl border-4 z-50"
            style={{
              ...getSpeechBubblePosition(speechBubbles[currentSpeechBubble].position),
              borderColor: '#86BC25',
              maxWidth: '400px'
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="text-2xl font-bold text-[#046A38]">
              {speechBubbles[currentSpeechBubble].text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
