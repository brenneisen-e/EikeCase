
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Network, ShieldCheck, RefreshCw, TrendingUp, Clock, Brain, BarChart3, Calculator, Shield } from 'lucide-react';
import DataSilosVisualization from './DataSilosAnimation';
import FunctionalComplexityVisualization from './FunctionalComplexityAnimation';
import RegulatoryPressureVisualization from './RegulatoryPressureAnimation';
import EvolvingBusinessNeedsVisualization from './EvolvingNeedsAnimation';

export default function ChallengeSection() {
  const [hoveredPillar, setHoveredPillar] = useState(null);
  const [viewedAnimations, setViewedAnimations] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const pillars = [
    {
      icon: Database,
      title: 'Data silos',
      description: 'Multiple disconnected systems prevent a unified business view and delay insights.',
      animationComponent: DataSilosVisualization,
      highlightType: 'silos'
    },
    {
      icon: Network,
      title: 'Functional complexity',
      description: 'Steering and compensation logic dispersed across tools, processes and manual spreadsheets.',
      animationComponent: FunctionalComplexityVisualization,
      highlightType: 'complexity'
    },
    {
      icon: ShieldCheck,
      title: 'Regulatory pressure',
      description: 'Compliance and auditability requirements add friction and slow down data handling.',
      animationComponent: RegulatoryPressureVisualization,
      highlightType: 'regulatory'
    },
    {
      icon: RefreshCw,
      title: 'Evolving business needs',
      description: 'Frequent product and channel changes demand faster analysis than current systems allow.',
      animationComponent: EvolvingBusinessNeedsVisualization,
      highlightType: 'evolving'
    }
  ];

  const handleMouseEnter = (highlightType) => {
    setHoveredPillar(highlightType);
    if (!viewedAnimations.includes(highlightType)) {
      setViewedAnimations(prev => [...prev, highlightType]);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPillar(null);
  };

  const impacts = [
    {
      icon: TrendingUp,
      title: 'Steering transparency (VST)',
      description: 'Steering decisions rely on monthly cut-off data, preventing real-time performance tracking.'
    },
    {
      icon: Clock,
      title: 'Simulation & calibration',
      description: 'Adjusting steering or compensation parameters requires manual preparation and repeated re-runs, resulting in delays.'
    },
    {
      icon: Brain,
      title: 'Advanced analytics (AI)',
      description: 'Predictive and AI-driven approaches remain limited due to fragmented and inconsistent data foundations.'
    }
  ];

  return (
    <section id="challenge" className="h-screen w-full bg-white flex flex-col px-20 py-12">
      <motion.h1
        className="text-4xl font-normal text-black text-left mb-2"
        style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Complexity, silos, and regulation slow down steering
      </motion.h1>

      <motion.h2
        className="text-2xl text-gray-600 text-left mb-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Fragmented data and manual processes limit transparency, speed, and fact-based decisions.
      </motion.h2>

      <div className="flex-grow flex flex-col">
        {/* 4 Pillars in one row */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={index}
                className="bg-gray-50 rounded-lg p-4 shadow-md border border-gray-200 flex flex-col items-start cursor-pointer group transition-all duration-300 hover:bg-[#046A38] hover:border-[#046A38] hover:shadow-xl hover:scale-105"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                onMouseEnter={() => handleMouseEnter(pillar.highlightType)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:bg-[#86BC25] transition-colors duration-300">
                  <Icon className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors duration-300" strokeWidth={2} />
                </div>
                <h3 className="text-gray-900 mb-2 text-lg font-semibold group-hover:text-white transition-colors duration-300">
                  {pillar.title}
                </h3>
                <p className="text-sm leading-relaxed group-hover:text-white transition-colors duration-300">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* 4 Animation Boxes - hide when Application Fields expanded */}
        {!isCollapsed && (
          <div className="grid grid-cols-4 gap-4 flex-grow" style={{ maxHeight: '200px', minHeight: '200px' }}>
            {pillars.map((pillar, index) => {
            const AnimationComponent = pillar.animationComponent;
            const isHovered = hoveredPillar === pillar.highlightType;
            const wasViewed = viewedAnimations.includes(pillar.highlightType);

            return (
              <motion.div
                key={index}
                className="rounded-lg shadow-md overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + 0.1 * index }}
              >
                {isHovered || wasViewed ? (
                  <div className={`w-full h-full ${!isHovered && wasViewed ? 'grayscale opacity-60' : ''} transition-all duration-500`}>
                    <AnimationComponent />
                  </div>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <p className="text-gray-500 text-sm text-center px-4">
                      Hover above to see animation
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
          </div>
        )}

        {/* Business Impact Takeaway Box / Application Fields */}
        <motion.div
          className="bg-gradient-to-r from-[#046A38] to-[#1B8F5C] rounded-xl shadow-lg text-white cursor-pointer"
          style={{
            minHeight: isCollapsed ? '400px' : '140px',
            padding: isCollapsed ? '32px' : '24px'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <AnimatePresence mode="wait">
            {isCollapsed ? (
              <motion.div
                key="application-fields"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <h3 className="text-3xl font-bold text-white mb-6 text-center">Application Fields</h3>

                {/* Target Groups */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white/90 mb-4 text-center">Target Groups</h4>
                  <div className="flex items-center justify-center gap-8">
                    {[
                      { icon: BarChart3, title: 'Banks' },
                      { icon: Shield, title: 'Insurers' },
                      { icon: TrendingUp, title: 'Asset Managers' }
                    ].map((group, index) => {
                      const Icon = group.icon;
                      return (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center text-center"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-3 hover:bg-white/30 transition-colors">
                            <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                          </div>
                          <h5 className="text-base font-semibold text-white">{group.title}</h5>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Topics */}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-white/90 mb-4 text-center">Topics</h4>
                  <div className="grid grid-cols-4 gap-6">
                    {[
                      { icon: BarChart3, title: 'Sales Steering', description: 'Performance tracking & steering' },
                      { icon: Calculator, title: 'Simulation & Forecasting', description: 'Commission logic & scenario planning' },
                      { icon: Shield, title: 'Compliance Dashboards', description: 'FIDA & regulatory reporting' },
                      { icon: RefreshCw, title: 'Contract Migration', description: 'Automated contract conversion tools' }
                    ].map((topic, index) => {
                      const Icon = topic.icon;
                      return (
                        <motion.div
                          key={index}
                          className="flex flex-col items-center text-center p-4 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        >
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                            <Icon className="w-6 h-6 text-white" strokeWidth={1.5} />
                          </div>
                          <h5 className="text-base font-semibold text-white mb-1">{topic.title}</h5>
                          <p className="text-sm text-white/70">{topic.description}</p>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                <div className="text-center text-sm text-white/70 mt-6">
                  Click to show business impacts
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="impacts"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-3 gap-6">
                  {impacts.map((impact, index) => {
                    const Icon = impact.icon;
                    return (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.1 }}
                      >
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <Icon className="w-4 h-4" strokeWidth={2.5} />
                        </div>
                        <div>
                          <h4 className="text-2xl font-bold mb-1">{impact.title}</h4>
                          <p className="text-xl leading-relaxed opacity-90">{impact.description}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
