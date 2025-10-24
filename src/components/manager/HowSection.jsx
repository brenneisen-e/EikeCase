
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Cpu, Server, CheckCircle, TrendingUp, Calendar, Users, X, Maximize2, ChevronRight } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { EditableText } from '@/components/editor/EditableText';
import { useIframe } from '@/contexts/IframeContext';

const steps = [
  {
    id: 1,
    title: 'Problem Framing & Scope Definition',
    icon: Search,
    description: 'Define the challenge',
    expandedDescription: 'In 2 weeks, identify value drivers, available data sources, and KPIs. Define prototype objectives and measurable success criteria.',
    duration: '2 weeks',
    team: '2-3',
    part: 1
  },
  {
    id: 2,
    title: 'AI-Driven Prototype Build',
    icon: Cpu,
    description: 'Make complexity visible',
    expandedDescription: 'Create a working prototype that connects fragmented data, visualises logic and enables steering or simulation scenarios in real time.',
    content: {
      type: 'html'
    },
    duration: '1-2 weeks',
    team: '3-4',
    highlighted: true,
    part: 1
  },
  {
    id: 3,
    title: 'Productive Pilot (ICC India)',
    icon: Server,
    description: 'Deploy within client environment',
    expandedDescription: 'Together with Deloitte ICC India, deploy the prototype as a productive pilot. Industrialise the model in Power BI, SAC or internal systems. Deliver live dashboards, simulation and user access.',
    content: {
      type: 'text',
      text: 'Implemented with Deloitte ICC India – 1 week turnaround',
      badge: 'ICC Partnership'
    },
    duration: '1 week',
    team: 'Joint DE + ICC',
    part: 1
  },
  {
    id: 4,
    title: 'Data Validation & Connector Refinement',
    icon: CheckCircle,
    description: 'Ensure stability and usability',
    expandedDescription: 'Validate data flows and fine-tune connectors post-deployment. Secure consistent refresh, KPI accuracy and end-user feedback. Prepare final Proof of Value deliverables.',
    duration: '1-2 weeks',
    team: '2-3',
    part: 1
  },
  {
    id: 5,
    title: 'Optional: Scaling & Transformation',
    icon: TrendingUp,
    description: 'Extend to full solution',
    expandedDescription: 'Based on the validated business case, expand to full-scale rollouts, architecture design or AI-analytics programmes.',
    duration: '2-6 months',
    team: '>10',
    part: 2,
    optional: true
  }
];

export default function HowSection() {
  const { positionIframeOver, hideIframe } = useIframe();
  const [selectedStep, setSelectedStep] = useState(null);
  const [expandedPreview, setExpandedPreview] = useState(false);
  const [showGantt, setShowGantt] = useState(false);
  const [htmlPrototype, setHtmlPrototype] = useState('');
  const [loadingPrototype, setLoadingPrototype] = useState(true);
  const [cockpitData, setCockpitData] = useState(null);

  useEffect(() => {
    loadPrototype();
    loadCockpitData();
  }, []);

  const loadCockpitData = async () => {
    try {
      const data = await base44.entities.CockpitData.list();
      if (data && data.length > 0) {
        const latest = data[data.length - 1];
        setCockpitData(latest.parsed_data);
        console.log('Loaded cockpit data from DB:', latest.parsed_data);
      }
    } catch (error) {
      console.error('Error loading cockpit data:', error);
    }
  };

  useEffect(() => {
    const handleMessage = async (event) => {
      if (event.data && event.data.type === 'COCKPIT_DATA_UPDATE') {
        console.log('✅ Received cockpit data from iframe:', event.data.data);
        const newData = event.data.data;
        setCockpitData(newData);
        
        try {
          await base44.entities.CockpitData.create({
            data_type: 'csv_import',
            parsed_data: newData,
            row_count: newData.rows ? newData.rows.length : 0,
            columns: newData.columns || []
          });
          console.log('✅ Cockpit data saved to DB successfully');
        } catch (error) {
          console.error('❌ Error saving cockpit data to DB:', error);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const loadPrototype = async () => {
    try {
      const prototypes = await base44.entities.HtmlPrototype.list();
      if (prototypes && prototypes.length > 0) {
        // Suche nach dem originalen v4 Complete Prototype
        let latest = prototypes.find(p => p.name === "Vertriebssteuerungs-Cockpit v4 Complete");
        
        if (latest) {
          // Füge postMessage zum originalen Code hinzu
          let modifiedHtml = latest.html_content;
          
          // Finde die parseCSV Funktion und füge postMessage hinzu
          if (modifiedHtml.includes('function parseCSV(text)')) {
            // Füge nach dem Parsen die postMessage Zeile ein
            modifiedHtml = modifiedHtml.replace(
              'updateDashboard();',
              `updateDashboard();\n                \n                // Send data to parent window for Claude AI\n                window.parent.postMessage({\n                    type: 'COCKPIT_DATA_UPDATE',\n                    data: { columns: headers, rows: data }\n                }, '*');`
            );
          }
          
          setHtmlPrototype(modifiedHtml);
        } else {
          // Fallback auf neuesten Prototype
          setHtmlPrototype(prototypes[prototypes.length - 1].html_content);
        }
      }
    } catch (error) {
      console.error('Error loading prototype:', error);
      setHtmlPrototype('<html><body><p style="text-align:center;padding:20px;font-family:sans-serif;color:red;">Fehler beim Laden des Prototypen.</p></body></html>');
    } finally {
      setLoadingPrototype(false);
    }
  };

  // Position shared iframe when step 2 is selected
  useEffect(() => {
    if (selectedStep === 2) {
      setTimeout(() => {
        positionIframeOver('how-step2-container');
      }, 200);
    } else {
      hideIframe();
    }
  }, [selectedStep, positionIframeOver, hideIframe]);

  // Position shared iframe when expanded preview is opened
  useEffect(() => {
    if (expandedPreview) {
      setTimeout(() => {
        positionIframeOver('how-expanded-container');
      }, 200);
    } else if (selectedStep !== 2) {
      // Only hide if we're not showing it in step 2
      hideIframe();
    }
  }, [expandedPreview, selectedStep, positionIframeOver, hideIframe]);

  const timelinePhases = [
    { id: 1, title: 'Scope Definition / Problem Framing', duration: '2 weeks', team: '2–3', start: 0, end: 2, keyOutput: 'Use-case scope, data mapping, success criteria', part: 1 },
    { id: 2, title: 'AI-Driven Prototype Build', duration: '1–2 weeks', team: '3–4', start: 2, end: 3.5, keyOutput: 'Interactive prototype, simulation model', part: 1 },
    { id: 3, title: 'Productive Pilot (ICC)', duration: '1 week', team: 'Joint DE + ICC', start: 3.5, end: 4.5, keyOutput: 'Pilot running in target system (Power BI / SAC)', part: 1 },
    { id: 4, title: 'Validation & Connector Refinement', duration: '1–2 weeks', team: '2–3', start: 4.5, end: 6, keyOutput: 'Validated dataflows + final PoV dashboard', part: 1 },
    { id: 5, title: 'Optional Scaling Phase', duration: '2–6 months', team: '>10', start: 6, end: 14, keyOutput: 'Enterprise implementation / rollout', part: 2, optional: true }
  ];

  const totalWeeks = 14;

  return (
    <section id="how" className="h-screen w-full bg-gradient-to-br from-gray-50 to-white flex flex-col px-20 py-12 overflow-auto">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <EditableText
          id="how-title"
          as="h1"
          defaultSize="text-4xl"
          className="font-normal text-black text-left mb-2"
          style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}
        >
          From data complexity to AI-driven results
        </EditableText>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <EditableText
          id="how-subtitle"
          as="h2"
          defaultSize="text-2xl"
          className="text-gray-600 text-left mb-8"
        >
          A rapid Proof-of-Value approach (4–6 weeks) followed by an optional scaling phase enables fast validation and measurable outcomes.
        </EditableText>
      </motion.div>

      <div className={`flex flex-col mb-8 transition-all duration-300 ${showGantt ? 'flex-shrink' : 'flex-grow'}`}>
        <div className="flex justify-between items-stretch gap-6 mb-4">
          {steps.filter(s => s.part === 1).map((step, index) => {
            const Icon = step.icon;
            const isSelected = selectedStep?.id === step.id;
            const isHighlighted = step.highlighted;
            const isExpandable = step.id === 2;

            return (
              <motion.div
                key={step.id}
                className={`rounded-xl flex flex-col hover:shadow-2xl transition-all duration-300 ${isExpandable ? 'cursor-pointer' : ''} ${
                  isSelected ? 'bg-[#046A38] text-white p-6' : 
                  isHighlighted ? 'bg-gradient-to-br from-[#E8F6CF] to-[#D4EDDA] text-[#046A38] shadow-lg shadow-green-400/40' :
                  'bg-[#E8F6CF] text-[#046A38]'
                } ${showGantt ? 'p-2' : 'p-4'}`}
                style={{ 
                  minHeight: showGantt ? '60px' : (isSelected ? 'auto' : '200px'), 
                  height: showGantt ? '60px' : (isSelected ? 'auto' : '200px'),
                  flex: isSelected ? '2 1 0%' : '1 1 0%'
                }}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                onClick={() => {
                  if (!showGantt && isExpandable) {
                    setSelectedStep(selectedStep?.id === step.id ? null : step);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`rounded-full flex items-center justify-center flex-shrink-0 ${
                    isSelected ? 'bg-white/20 w-10 h-10' : 
                    isHighlighted ? 'bg-[#046A38]/20' :
                    'bg-[#046A38]/20'
                  } ${showGantt ? 'w-6 h-6' : 'w-9 h-9'}`}>
                    <Icon className={showGantt ? 'w-3 h-3' : (isSelected || isHighlighted ? 'w-5 h-5' : 'w-4 h-4')} />
                  </div>
                  <div>
                    <div className={showGantt ? 'text-sm opacity-80' : 'text-base opacity-80'}>Step {step.id}</div>
                    <EditableText
                      id={`how-step-title-${step.id}`}
                      as="h3"
                      defaultSize="text-2xl"
                      className={`font-bold leading-tight ${showGantt ? 'text-base' : ''}`}
                    >
                      {step.title}
                    </EditableText>
                    {step.content?.badge && !isSelected && !showGantt && (
                      <span className="text-sm bg-[#046A38] text-white px-2 py-0.5 rounded-full mt-1 inline-block">
                        {step.content.badge}
                      </span>
                    )}
                  </div>
                </div>

                {!showGantt && (
                  <>
                    <EditableText
                      id={`how-step-desc-${step.id}`}
                      as="p"
                      defaultSize="text-xl"
                      className={`mb-3 opacity-90 ${isSelected ? 'line-clamp-none' : 'line-clamp-2'}`}
                    >
                      {step.description}
                    </EditableText>
                    
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-3 flex-grow"
                        >
                          {step.content?.type === 'html' ? (
                            <div className="bg-white rounded-lg p-2 border shadow-inner relative">
                              <div className="mb-2 text-base text-gray-600 flex items-center justify-between">
                                <span>Interactive Prototype Preview:</span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setExpandedPreview(true);
                                  }}
                                  className="flex items-center gap-1 text-[#046A38] hover:text-[#86BC25] transition-colors font-semibold"
                                >
                                  <Maximize2 className="w-4 h-4" />
                                  <span className="text-base">Expand Fullscreen</span>
                                </button>
                              </div>
                              <div
                                className="border border-gray-300 rounded overflow-hidden cursor-pointer hover:border-[#86BC25] transition-colors"
                                style={{ transform: 'scale(0.5)', transformOrigin: '0 0', width: '200%', height: '300px' }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedPreview(true);
                                }}
                              >
                                <div
                                  id="how-step2-container"
                                  className="w-full border-0"
                                  style={{ height: '600px' }}
                                />
                              </div>
                            </div>
                          ) : step.content?.type === 'text' ? (
                            <div className="bg-white/10 rounded-lg p-3">
                              <p className="text-xl leading-relaxed font-semibold">{step.content.text}</p>
                            </div>
                          ) : null}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {!isSelected && isExpandable && (
                      <div className="mt-auto pt-3 text-center">
                        <div className="text-sm opacity-70">Click to expand</div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="flex items-center gap-4 my-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="text-xl text-gray-500 italic">
            <span className="font-semibold text-[#046A38]">Part 1:</span> Rapid Proof of Value (4–6 weeks) |
            <span className="font-semibold text-gray-600 ml-2">Part 2:</span> Scaling & Transformation (optional)
          </div>
          <div className="flex-1 h-px bg-gray-300"></div>
        </motion.div>

        {steps.filter(s => s.part === 2).map((step, index) => {
          const Icon = step.icon;
          const isSelected = selectedStep?.id === step.id;
          
          return (
            <motion.div
              key={step.id}
              className={`rounded-xl flex flex-col hover:shadow-2xl transition-all duration-300 ${
                isSelected ? 'bg-[#A7E3B2] text-[#046A38] p-6' : 
                'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 p-4 border-2 border-dashed border-gray-400'
              }`}
              style={{ minHeight: isSelected ? 'auto' : '120px' }}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <div className={`rounded-full flex items-center justify-center flex-shrink-0 ${
                  isSelected ? 'bg-[#046A38]/20 w-12 h-12' : 'bg-gray-300 w-10 h-10'
                }`}>
                  <Icon className={isSelected ? 'w-6 h-6' : 'w-5 h-5'} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="text-base opacity-80">Step {step.id}</div>
                    <span className="text-sm bg-gray-500 text-white px-2 py-0.5 rounded-full">Optional</span>
                  </div>
                  <h3 className="text-2xl font-bold">{step.title}</h3>
                </div>
              </div>

              <p className="mt-3 text-xl opacity-90">{step.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Timeline Overview Text */}
      {!showGantt && (
        <motion.div
          className="text-center text-2xl text-gray-700 mb-3 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <strong>Part 1:</strong> Rapid Proof of Value – 4–6 weeks | <strong>Part 2:</strong> Scaling Phase (optional)
        </motion.div>
      )}

      <motion.div
        className="bg-gradient-to-r from-[#046A38] to-[#1B8F5C] text-white rounded-xl shadow-lg overflow-visible cursor-pointer"
        style={{
          minHeight: showGantt ? '500px' : '180px',
          maxHeight: showGantt ? 'none' : '180px'
        }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        onClick={() => setShowGantt(!showGantt)}
      >
        <AnimatePresence mode="wait">
          {!showGantt ? (
            <motion.div
              key="timeline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="h-full p-6"
            >
              <div className="flex items-center justify-between h-full">
                {timelinePhases.map((phase, index) => {
                  const isOptional = phase.optional;

                  return (
                    <React.Fragment key={phase.id}>
                      <motion.div
                        className={`flex flex-col items-center justify-center px-3 flex-1 rounded-lg ${isOptional ? 'bg-gray-400/30 py-3' : ''}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 1 + index * 0.15, duration: 0.4 }}
                      >
                        <div className="text-center mb-2">
                          <div className={`font-semibold text-xl mb-1 ${isOptional ? 'text-gray-200' : 'text-white'}`}>
                            {phase.title}
                          </div>
                          <div className={`text-base ${isOptional ? 'text-gray-300' : 'text-white/90'}`}>
                            {phase.duration}
                          </div>
                        </div>

                        <div className={`flex items-center gap-2 rounded-full px-3 py-1 text-base font-semibold ${isOptional ? 'bg-gray-500/30' : 'bg-white/20'}`}>
                          <Users className="w-4 h-4" />
                          <span>Team: {phase.team}</span>
                        </div>
                      </motion.div>

                      {index < timelinePhases.length - 1 && (
                        <div className="text-white/30">
                          <ChevronRight className="w-5 h-5" />
                        </div>
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gantt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-8 overflow-visible"
            >
              <h3 className="text-2xl font-semibold mb-6 text-center">Project Timeline - Gantt View</h3>

              <div className="bg-white/10 rounded-lg p-6">
                <div className="flex mb-3">
                  <div className="w-64"></div>
                  <div className="flex-1 flex">
                    {[...Array(7)].map((_, i) => (
                      <div key={i} className="flex-1 text-center text-base text-white/80 border-l border-white/20">
                        Week {i * 2 + 1}-{i * 2 + 2}
                      </div>
                    ))}
                  </div>
                </div>

                {timelinePhases.map((phase, index) => {
                  const isOptional = phase.optional;
                  
                  return (
                    <motion.div
                      key={phase.id}
                      className="flex items-center mb-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-64 text-xl font-medium pr-6">
                        <div className="flex items-center gap-2">
                          {phase.title}
                          {isOptional && (
                            <span className="text-sm bg-green-300 text-green-900 px-2 py-0.5 rounded-full">Optional</span>
                          )}
                        </div>
                        <div className="text-base text-white/70 mt-1">{phase.keyOutput}</div>
                      </div>
                      <div className="flex-1 relative h-12">
                        <motion.div
                          className={`absolute h-full rounded flex items-center justify-center text-base font-semibold shadow-lg ${
                            isOptional
                              ? 'bg-green-200/80 text-green-900 border-2 border-dashed border-green-400'
                              : 'bg-white/90 text-[#046A38]'
                          }`}
                          style={{
                            left: `${(phase.start / totalWeeks) * 100}%`,
                            width: `${((phase.end - phase.start) / totalWeeks) * 100}%`
                          }}
                          initial={{ scaleX: 0, originX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                        >
                          {phase.duration}
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="text-center text-xl text-white mt-6">
                <strong>Part 1:</strong> Rapid Proof of Value – 4–6 weeks | <strong>Part 2:</strong> Scaling Phase (optional)<br/>
                <span className="text-base text-white/80">Average team size: 4 consultants · Includes Deloitte ICC India for industrialisation</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Fullscreen Prototype Modal */}
      <AnimatePresence>
        {expandedPreview && (
          <motion.div
            className="fixed inset-0 bg-black/90 z-[9999] flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setExpandedPreview(false)}
          >
            {/* Header with close button */}
            <div className="bg-gradient-to-r from-[#046A38] to-[#1B8F5C] p-4 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">AI-Driven Prototype: Vertriebssteuerungs-Cockpit</h2>
                <p className="text-sm text-white/80 mt-1">Interactive sales steering dashboard with CSV import, KPIs & intelligent AI analysis</p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedPreview(false);
                }}
                className="bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors backdrop-blur-sm"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Fullscreen iframe and Claude AI Assistant */}
            <div
              className="flex-1 flex bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                id="how-expanded-container"
                className="w-full h-full border-0"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
