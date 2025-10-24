import React from 'react';
import { Database, Network, ShieldCheck, RefreshCw, BarChart3, Calculator, Shield } from 'lucide-react';

export default function ChallengePreview() {
  const pillars = [
    { icon: Database, title: 'Data silos', description: 'Multiple disconnected systems prevent a unified business view.' },
    { icon: Network, title: 'Functional complexity', description: 'Steering logic dispersed across tools and spreadsheets.' },
    { icon: ShieldCheck, title: 'Regulatory pressure', description: 'Compliance requirements add friction and slow data handling.' },
    { icon: RefreshCw, title: 'Evolving business needs', description: 'Product changes demand faster analysis than current systems.' }
  ];

  return (
    <div className="w-full h-full bg-white p-6 overflow-hidden">
      {/* Title */}
      <h1 className="text-2xl font-normal text-black mb-1" style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}>
        Complexity, silos, and regulation slow down steering
      </h1>
      <h2 className="text-base text-gray-600 mb-4">
        Fragmented data and manual processes limit transparency, speed, and fact-based decisions.
      </h2>

      {/* 4 Pillars - Smaller */}
      <div className="grid grid-cols-4 gap-2 mb-3">
        {pillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <div
              key={index}
              className="rounded-lg p-2 shadow-sm border bg-gray-50 border-gray-200"
            >
              <div className="w-6 h-6 rounded-full flex items-center justify-center mb-1 bg-white">
                <Icon className="w-3 h-3 text-gray-700" strokeWidth={2} />
              </div>
              <h3 className="text-xs font-semibold text-gray-900 mb-1">{pillar.title}</h3>
              <p className="text-[10px] leading-tight text-gray-700">{pillar.description}</p>
            </div>
          );
        })}
      </div>

      {/* Application Fields Section - Expanded */}
      <div className="bg-gradient-to-r from-[#046A38] to-[#1B8F5C] rounded-lg shadow-md text-white p-4">
        <h3 className="text-xl font-bold text-white mb-3 text-center">Application Fields</h3>

        {/* Target Groups */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-white/90 mb-2 text-center">Target Groups</h4>
          <div className="flex items-center justify-center gap-4">
            {[
              { icon: BarChart3, title: 'Banks' },
              { icon: Shield, title: 'Insurers' },
              { icon: Database, title: 'Asset Managers' }
            ].map((group, index) => {
              const Icon = group.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-1">
                    <Icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                  </div>
                  <h5 className="text-[10px] font-semibold text-white">{group.title}</h5>
                </div>
              );
            })}
          </div>
        </div>

        {/* Topics */}
        <div>
          <h4 className="text-xs font-semibold text-white/90 mb-2 text-center">Topics</h4>
          <div className="grid grid-cols-4 gap-2">
            {[
              { icon: BarChart3, title: 'Sales Steering', description: 'Performance tracking' },
              { icon: Calculator, title: 'Simulation', description: 'Scenario planning' },
              { icon: Shield, title: 'Compliance', description: 'Regulatory reporting' },
              { icon: RefreshCw, title: 'Migration', description: 'Contract conversion' }
            ].map((topic, index) => {
              const Icon = topic.icon;
              return (
                <div key={index} className="flex flex-col items-center text-center p-2 bg-white/10 rounded">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mb-1">
                    <Icon className="w-4 h-4 text-white" strokeWidth={1.5} />
                  </div>
                  <h5 className="text-[9px] font-semibold text-white mb-0.5">{topic.title}</h5>
                  <p className="text-[8px] text-white/70">{topic.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
