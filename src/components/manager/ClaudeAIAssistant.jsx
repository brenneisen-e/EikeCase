import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, ChevronDown, ChevronUp } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ClaudeAIAssistant({ dashboardData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(null);
  const [loadedData, setLoadedData] = useState(null);

  useEffect(() => {
    loadApiKey();
    loadCockpitData();
  }, []);

  useEffect(() => {
    if (dashboardData) {
      setLoadedData(dashboardData);
    }
  }, [dashboardData]);

  const loadApiKey = async () => {
    try {
      const keys = await base44.entities.ClaudeApiKey.list();
      if (keys && keys.length > 0) {
        const activeKey = keys.find(k => k.is_active);
        if (activeKey) {
          setApiKey(activeKey.api_key);
        }
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    }
  };

  const loadCockpitData = async () => {
    try {
      const data = await base44.entities.CockpitData.list();
      if (data && data.length > 0) {
        const latest = data[data.length - 1];
        setLoadedData(latest.parsed_data);
        console.log('Loaded cockpit data from DB:', latest.parsed_data);
      }
    } catch (error) {
      console.error('Error loading cockpit data:', error);
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      let contextPrompt = userMessage;
      
      if (loadedData) {
        const dataContext = `
Dashboard-Daten verfügbar:
- Spalten: ${loadedData.columns ? loadedData.columns.join(', ') : 'keine Spalten'}
- Anzahl Zeilen: ${loadedData.rows ? loadedData.rows.length : 0}
- Beispiel-Daten (erste 3 Zeilen): ${loadedData.rows ? JSON.stringify(loadedData.rows.slice(0, 3)) : 'keine Daten'}

Nutzer-Frage: ${userMessage}

Bitte analysiere die Daten und beantworte die Frage des Nutzers.`;
        
        contextPrompt = dataContext;
      }

      const response = await base44.integrations.Core.InvokeLLM({
        prompt: contextPrompt,
        add_context_from_internet: false
      });

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: typeof response === 'string' ? response : response.response || 'Keine Antwort erhalten.' 
      }]);
    } catch (error) {
      console.error('Error calling Claude:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Entschuldigung, es gab einen Fehler bei der Verarbeitung Ihrer Anfrage.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          className="fixed bottom-6 right-6 z-[10000] w-16 h-16 rounded-full bg-gradient-to-br from-[#046A38] to-[#1B8F5C] text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform"
          onClick={() => setIsOpen(true)}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <MessageSquare className="w-8 h-8" />
        </motion.button>
      )}

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-2xl z-[10001] flex flex-col border-l border-gray-200"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#046A38] to-[#1B8F5C] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-6 h-6" />
                <div>
                  <h3 className="font-bold text-lg">Claude AI Assistant</h3>
                  <p className="text-xs opacity-90">
                    {loadedData ? `${loadedData.rows ? loadedData.rows.length : 0} Datenzeilen geladen` : 'Keine Daten verfügbar'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-8">
                  <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="text-sm">Stelle eine Frage zu den Dashboard-Daten</p>
                  {!loadedData && (
                    <p className="text-xs mt-2 text-orange-600">
                      ⚠️ Bitte lade zuerst CSV-Daten im Dashboard hoch
                    </p>
                  )}
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`max-w-[80%] rounded-lg p-3 ${
                    msg.role === 'user'
                      ? 'bg-[#046A38] text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-[#046A38]" />
                    <span className="text-sm text-gray-600">Claude denkt nach...</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Frage zu den Daten stellen..."
                  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#046A38] focus:ring-2 focus:ring-[#046A38]/20"
                  disabled={isLoading || !loadedData}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputValue.trim() || !loadedData}
                  className="bg-[#046A38] text-white rounded-lg px-4 py-2 hover:bg-[#035530] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}