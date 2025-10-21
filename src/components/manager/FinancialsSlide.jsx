import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function FinancialsSlide() {
  const [animateChart, setAnimateChart] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateChart(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const data = [
    { name: 'Last Year', value: 150 },
    { name: 'Today', value: 300 },
    { name: 'Next Year', value: 450 },
    { name: '2 Years', value: 600 }
  ];

  return (
    <div className="h-full w-full bg-gradient-to-br from-white to-gray-100 p-8">
      <motion.h1 
        className="text-4xl font-bold text-[#003b6e] text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        FINANCIALS – Business Case
      </motion.h1>

      <motion.h2 
        className="text-2xl text-gray-700 text-center mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Project Economics & Growth Potential
      </motion.h2>

      <div className="max-w-4xl mx-auto">
        {/* Interactive Chart */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0, 0, 0, 0.1)" />
                <XAxis dataKey="name" stroke="#666" />
                <YAxis 
                  stroke="#666"
                  tickFormatter={(value) => `€${value}K`}
                />
                <Tooltip 
                  formatter={(value) => [`€${value}K`, 'Fee Volume']}
                  labelStyle={{ color: '#666' }}
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                    border: '1px solid #86BC25',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#86BC25" 
                  strokeWidth={4}
                  dot={{ fill: '#86BC25', strokeWidth: 3, stroke: '#ffffff', r: 8 }}
                  activeDot={{ r: 12, stroke: '#86BC25', strokeWidth: 3 }}
                  animationBegin={animateChart ? 0 : 10000}
                  animationDuration={2000}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Current Project Value', value: '€200-400K', description: 'Per harmonization project' },
            { title: 'Project Duration', value: '6-12 Months', description: 'Typical timeline' },
            { title: 'Team Size', value: '3-4 FTEs', description: 'Core project team' }
          ].map((metric, index) => (
            <motion.div 
              key={metric.title}
              className="bg-white rounded-lg p-6 shadow-lg text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <h3 className="text-sm font-semibold text-gray-600 mb-2">{metric.title}</h3>
              <div className="text-3xl font-bold text-[#86BC25] mb-2">{metric.value}</div>
              <p className="text-sm text-gray-600">{metric.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Growth Statement */}
        <motion.div 
          className="bg-gradient-to-r from-[#86BC25] to-[#5a8019] text-white rounded-xl p-8 text-center shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h3 className="text-2xl font-bold mb-4">Market Opportunity</h3>
          <p className="text-lg opacity-95 mb-4">
            Each consolidation and transformation creates new opportunities.<br/>
            <strong>Deloitte can become go-to partner for harmonization projects in DACH.</strong>
          </p>
          <div className="flex justify-center gap-8 text-sm">
            <div>
              <div className="text-2xl font-bold">550+</div>
              <div>Insurance M&A deals</div>
            </div>
            <div>
              <div className="text-2xl font-bold">55+</div>
              <div>Fintech transactions</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}