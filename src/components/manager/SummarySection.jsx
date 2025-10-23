import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Users, TrendingUp, Award, CheckCircle2, ArrowRight, Compass, Code, MessageSquare, DollarSign, Check } from 'lucide-react';
import RobotPainter from './RobotPainter';

export default function SummarySection() {
  // Chat states
  const [showChat, setShowChat] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const [chatSubmitted, setChatSubmitted] = useState(false);

  // Robot animation states
  const [robotPosition, setRobotPosition] = useState({ x: -100, y: -100 });
  const [isPainting, setIsPainting] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState([false, false, false, false]);
  const [showRobot, setShowRobot] = useState(false);
  const [hasStartedAnimation, setHasStartedAnimation] = useState(false);
  const [currentSpeechBubble, setCurrentSpeechBubble] = useState(-1);
  const [showCompetencies, setShowCompetencies] = useState(false);

  const speechBubbles = [
    "Domain Expertise: You know how to apply it.",
    "Technology Mastery: You know how to build it.",
    "Sales & Proof of Concept: You know how to sell it.",
    "Business Impact & Scaling: You know how to monetise it."
  ];

  const coreCompetencies = [
    {
      icon: Compass,
      emoji: '🧭',
      title: 'Domain Expertise',
      headline: 'I know how to apply it.',
      description: 'I understand steering, simulation and compensation logic – and translate business problems into data-driven prototypes.',
      color: '#046A38'
    },
    {
      icon: Code,
      emoji: '💻',
      title: 'Technology Mastery',
      headline: 'I know how to build it.',
      description: 'I design and deliver AI-driven prototypes that make complex data architectures visible and interactive within weeks.',
      color: '#0070c0'
    },
    {
      icon: MessageSquare,
      emoji: '💬',
      title: 'Sales & Proof of Concept',
      headline: 'I know how to sell it.',
      description: 'I use prototypes in proposals and workshops to make ideas tangible – creating immediate client buy-in and a validated Proof of Value.',
      color: '#86BC25'
    },
    {
      icon: DollarSign,
      emoji: '💰',
      title: 'Business Impact & Scaling',
      headline: 'I know how to monetise it.',
      description: 'Each prototype opens a pipeline for follow-up projects – from PoV to multi-client rollouts and scalable transformation revenue.',
      color: '#FFA500'
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
    setInputValue('Fasse den Managercase zusammen');
    setShowSuggestion(false);
  };

  // Handle chat submission
  const handleSubmit = async () => {
    if (!inputValue.trim()) return;

    setChatSubmitted(true);
    setShowChat(false);

    // Wait a bit, then show robot and speech bubbles
    await new Promise(resolve => setTimeout(resolve, 500));

    // Calculate center position and show robot
    const section = document.querySelector('#summary');
    if (section) {
      const rect = section.getBoundingClientRect();
      setRobotPosition({
        x: rect.width / 2,
        y: rect.height / 2
      });
      setShowRobot(true);

      // Show speech bubbles one by one
      for (let i = 0; i < speechBubbles.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCurrentSpeechBubble(i);
        await new Promise(resolve => setTimeout(resolve, 2500));
      }

      // After speech bubbles, show competency grid
      setCurrentSpeechBubble(-1);
      await new Promise(resolve => setTimeout(resolve, 500));
      setShowCompetencies(true);
      setHasStartedAnimation(true);
    }
  };

  // Robot animation sequence - only runs when section comes into view
  useEffect(() => {
    if (!hasStartedAnimation) return;

    const animateRobot = async () => {
      // Calculate center position of the 2x2 grid
      const grid = document.querySelector('.grid.grid-cols-2');
      if (!grid) return;

      const gridRect = grid.getBoundingClientRect();
      const containerRect = grid.closest('section').getBoundingClientRect();

      // Position robot in the center of the grid
      const centerX = (gridRect.left + gridRect.right) / 2 - containerRect.left;
      const centerY = (gridRect.top + gridRect.bottom) / 2 - containerRect.top;

      // Start after a brief delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Position robot in center
      setRobotPosition({ x: centerX, y: centerY });
      setShowRobot(true);

      // Wait for robot to appear
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Paint each box while staying in the center
      for (let i = 0; i < 4; i++) {
        // Start painting
        setIsPainting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Show checkmark
        setCheckedBoxes(prev => {
          const newChecked = [...prev];
          newChecked[i] = true;
          return newChecked;
        });
        setIsPainting(false);

        // Brief pause before next box
        await new Promise(resolve => setTimeout(resolve, 800));
      }

      // Hide robot after completion
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowRobot(false);
    };

    animateRobot();
  }, [hasStartedAnimation]);

  // Callback when section comes into viewport
  const handleViewportEnter = () => {
    if (!hasStartedAnimation) {
      setHasStartedAnimation(true);
    }
  };

  return (
    <section id="summary" className="h-screen w-full bg-gradient-to-br from-white to-gray-100 flex flex-col px-20 py-12 overflow-hidden relative">
      {/* Chat Interface - shows first */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-50 bg-gradient-to-br from-white to-gray-100"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full max-w-3xl px-8">
              {/* Greeting */}
              <motion.h1
                className="text-6xl font-bold text-[#046A38] text-center mb-12"
                style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                Hallo Eike, was kann ich für dich tun?
              </motion.h1>

              {/* Suggestion Buttons */}
              <motion.div
                className="grid grid-cols-3 gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  className="bg-white border-2 border-[#86BC25] text-[#046A38] rounded-xl p-4 hover:bg-[#86BC25] hover:text-white transition-all duration-300 shadow-lg font-medium"
                  onClick={() => setInputValue('Wie ist das Wetter in Köln')}
                >
                  Wie ist das Wetter in Köln
                </button>
                <button
                  className="bg-white border-2 border-[#86BC25] text-[#046A38] rounded-xl p-4 hover:bg-[#86BC25] hover:text-white transition-all duration-300 shadow-lg font-medium"
                  onClick={() => setInputValue('Exotische Reiseziele in Afrika')}
                >
                  Exotische Reiseziele in Afrika
                </button>
                <button
                  className="bg-white border-2 border-[#86BC25] text-[#046A38] rounded-xl p-4 hover:bg-[#86BC25] hover:text-white transition-all duration-300 shadow-lg font-medium"
                  onClick={() => setInputValue('Nächster Deloitte Derby Termin')}
                >
                  Nächster Deloitte Derby Termin
                </button>
              </motion.div>

              {/* Input Field */}
              <motion.div
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={handleInputChange}
                      onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                      placeholder="Gib deine Frage ein..."
                      className="w-full border-2 border-gray-300 rounded-xl px-6 py-4 text-lg focus:outline-none focus:border-[#86BC25] focus:ring-2 focus:ring-[#86BC25]/20 transition-all"
                    />

                    {/* Autocomplete Suggestion */}
                    <AnimatePresence>
                      {showSuggestion && (
                        <motion.div
                          className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-[#86BC25] rounded-xl p-3 shadow-xl cursor-pointer z-10"
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
                    className="bg-[#046A38] text-white rounded-xl px-8 py-4 font-semibold hover:bg-[#035530] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    OK
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title Section - shows after chat */}
      <AnimatePresence>
        {showCompetencies && (
          <>
            <motion.h1
              className="text-4xl font-normal text-black text-left mb-2"
              style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onViewportEnter={handleViewportEnter}
            >
              Breaking complexity starts with me
            </motion.h1>

            <motion.h2
              className="text-2xl text-gray-600 text-left mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              From PowerPoint to AI-driven prototypes that turn ideas into impact.
            </motion.h2>

            {/* 4 Competency Pillars in 2x2 Grid */}
            <div className="grid grid-cols-2 gap-6 mb-8 flex-grow relative">
        {/* Circle Window in the Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white border-8 border-gray-200 shadow-2xl z-40 flex items-center justify-center"
          style={{
            boxShadow: '0 0 60px rgba(0, 0, 0, 0.15), inset 0 0 30px rgba(134, 188, 37, 0.1)'
          }}
        >
          <div className="absolute inset-4 rounded-full border-4 border-[#86BC25] opacity-30"></div>
        </div>

        {coreCompetencies.map((competency, index) => {
          const Icon = competency.icon;
          return (
            <motion.div
              key={index}
              data-competency={index}
              className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-start relative"
              style={{ borderTop: `6px solid ${competency.color}` }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.15 }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${competency.color}20` }}
              >
                <span className="text-3xl">{competency.emoji}</span>
              </div>

              <h3 className="text-xl font-bold text-black mb-2" style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}>
                {competency.title}
              </h3>

              <h4 className="text-lg font-semibold mb-3" style={{ color: competency.color, fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}>
                {competency.headline}
              </h4>

              <p className="text-base text-gray-700 leading-relaxed mb-6" style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}>
                {competency.description}
              </p>

              {/* Green Checkmark at top-right - only shown when robot paints it */}
              <AnimatePresence>
                {checkedBoxes[index] && (
                  <motion.div
                    className="absolute top-2 right-2 w-10 h-10 bg-[#86BC25] rounded-full flex items-center justify-center shadow-lg z-10"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  >
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

            {/* Robot Painter with Speech Bubbles */}
            {showRobot && (
              <RobotPainter position={robotPosition} isPainting={isPainting} />
            )}
          </>
        )}
      </AnimatePresence>

      {/* Robot with Speech Bubbles - before competencies */}
      {showRobot && currentSpeechBubble >= 0 && (
        <>
          <RobotPainter
            position={robotPosition}
            isPainting={false}
            large={true}
          />

          {/* Speech Bubble */}
          <motion.div
            className="absolute z-60 bg-white rounded-2xl p-6 shadow-2xl border-4 border-[#86BC25]"
            style={{
              left: robotPosition.x + 250,
              top: robotPosition.y - 100,
              maxWidth: '400px'
            }}
            initial={{ opacity: 0, scale: 0.5, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="text-xl font-semibold text-[#046A38]">
              {speechBubbles[currentSpeechBubble]}
            </div>
            {/* Speech bubble pointer */}
            <div
              className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-0 h-0"
              style={{
                borderTop: '20px solid transparent',
                borderBottom: '20px solid transparent',
                borderRight: '30px solid #86BC25'
              }}
            />
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-0"
              style={{
                borderTop: '15px solid transparent',
                borderBottom: '15px solid transparent',
                borderRight: '25px solid white',
                marginLeft: '5px'
              }}
            />
          </motion.div>
        </>
      )}
    </section>
  );
}