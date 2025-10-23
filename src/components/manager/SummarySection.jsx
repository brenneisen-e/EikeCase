import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Users, TrendingUp, Award, CheckCircle2, ArrowRight, Compass, Code, MessageSquare, DollarSign, Check } from 'lucide-react';
import RobotPainter from './RobotPainter';

export default function SummarySection() {
  // Robot animation states
  const [robotPosition, setRobotPosition] = useState({ x: -100, y: -100 });
  const [isPainting, setIsPainting] = useState(false);
  const [checkedBoxes, setCheckedBoxes] = useState([false, false, false, false]);
  const [showRobot, setShowRobot] = useState(false);
  const [hasStartedAnimation, setHasStartedAnimation] = useState(false);

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
    <section id="summary" className="h-screen w-full bg-gradient-to-br from-white to-gray-100 flex flex-col px-20 py-12 overflow-hidden">
      {/* Title Section */}
      <motion.h1
        className="text-4xl font-normal text-black text-left mb-2"
        style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onViewportEnter={handleViewportEnter}
      >
        Breaking complexity starts with me
      </motion.h1>

      <motion.h2
        className="text-2xl text-gray-600 text-left mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        From PowerPoint to AI-driven prototypes that turn ideas into impact.
      </motion.h2>

      {/* 4 Competency Pillars in 2x2 Grid */}
      <div className="grid grid-cols-2 gap-6 mb-8 flex-grow">
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

      {/* Robot Painter */}
      {showRobot && (
        <RobotPainter position={robotPosition} isPainting={isPainting} />
      )}
    </section>
  );
}