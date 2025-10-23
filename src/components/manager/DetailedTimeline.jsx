import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Building, TrendingUp, Users, Star } from 'lucide-react';

const milestones = [
{
  title: 'Banker',
  years: '2015 – 2018',
  logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/2340d7224_OLB.png',
  description: 'Managed a diverse portfolio of private and corporate clients, focusing on investment strategies and credit financing.',
  bulletPoints: [
    'Managed portfolio of private and corporate clients with focus on investment strategies',
    'Built foundation for analytical skills and relationship management'
  ],
  hashtag: '#learning',
  icon: GraduationCap,
  color: 'bg-green-50 border-green-500',
  textColor: 'text-green-800',
  hashtagColor: 'text-green-600'
},
{
  title: 'Junior Consultant',
  years: '2018 – 2021',
  logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/CEMS_logo.svg',
  description: 'PMO for Business Case and committee tasks. Developed foundational skills in project management and stakeholder management.',
  bulletPoints: [
    'Supported PMO for business case preparation and stakeholder alignment',
    'First exposure to compensation and transformation programs'
  ],
  hashtag: '#adapting',
  icon: Briefcase,
  color: 'bg-yellow-50 border-yellow-500',
  textColor: 'text-yellow-800',
  hashtagColor: 'text-yellow-600'
},
{
  title: 'Consultant',
  years: '2022',
  logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/eaebdd7ca_Commerzpng.png',
  secondaryLogo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/260011748_ERGO.png',
  showLogosHorizontal: true,
  description: 'Led complete gap analysis independently – conducted, managed, and reported comprehensive analysis across all business areas.',
  bulletPoints: [
    'Conducted comprehensive GAP analysis across business areas (Commerz Real)',
    'Supported performance management with simulation analysis and executive reporting (ERGO)'
  ],
  hashtag: '#building',
  icon: Building,
  color: 'bg-blue-50 border-blue-500',
  textColor: 'text-blue-800',
  hashtagColor: 'text-blue-600'
},
{
  title: 'Senior Consultant',
  years: '2022 – 2024',
  logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/260011748_ERGO.png',
  description: 'PMO Lead for Performance Management - sharpened simulation results and reported derivations to the board. Go-Live management of entire ZAV program. Later acting manager.',
  bulletPoints: [
    'Transitioned into strategic PMO role with team leadership responsibilities',
    'Led project independently on-site as project lead with consultant colleague'
  ],
  hashtag: '#growing',
  icon: Users,
  color: 'bg-red-50 border-red-500',
  textColor: 'text-red-800',
  hashtagColor: 'text-red-600',
  team: '4 Persons',
  revenue: '€1.8M Fees'
},
{
  title: 'Senior Consultant',
  years: '2025 – Present',
  logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/60d27e529_Barmenia-removebg-preview.png',
  description: 'Project Lead Simulation, Calibration and Contract. Leading Deloitte delivery role for Compensation logic harmonization in major insurance merger.',
  bulletPoints: [
    'Sub-project lead for compensation logic harmonization in major insurance merger',
    'Currently leading E2E simulation stream with cross-functional business-IT alignment'
  ],
  hashtag: '#leading',
  icon: Star,
  color: 'bg-indigo-50 border-indigo-500',
  textColor: 'text-indigo-800',
  hashtagColor: 'text-indigo-600',
  team: '3 Persons',
  revenue: '€500K Fees'
}];


export default function DetailedTimeline() {
  return (
    <div className="w-full h-full overflow-y-auto px-6 py-4">
      <div className="flex gap-4 h-full">
        {milestones.map((milestone, index) => {
          const Icon = milestone.icon;
          return (
            <motion.div
              key={index}
              className={`flex-1 rounded-xl border-4 ${milestone.color} p-6 flex flex-col relative`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}>

              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className={`text-2xl font-bold ${milestone.textColor}`}>{milestone.title}</h3>
                  <p className={`text-sm ${milestone.textColor} opacity-70`}>{milestone.years}</p>
                </div>
                <div className={`rounded-full p-3 ${milestone.color}`}>
                  <Icon className={`w-6 h-6 ${milestone.textColor}`} />
                </div>
              </div>

              {/* Company Logos */}
              <div className="mb-4">
                {milestone.showLogosHorizontal ?
                <div className="flex items-center gap-4">
                    {milestone.logo &&
                  <img src={milestone.logo} alt="Company Logo" className="h-14 object-contain" />
                  }
                    {milestone.secondaryLogo &&
                  <img src={milestone.secondaryLogo} alt="Secondary Company Logo" className="h-10 object-contain" />
                  }
                  </div> :

                <div className="flex flex-col gap-2">
                    {milestone.logo &&
                  <img src={milestone.logo} alt="Company Logo" className="h-10 object-contain object-left" />
                  }
                    {milestone.secondaryLogo &&
                  <img src={milestone.secondaryLogo} alt="Secondary Company Logo" className="h-8 object-contain object-left" />
                  }
                  </div>
                }
              </div>

              {/* Description */}
              <div className="flex-grow mb-4">
                <ul className="text-green-800 text-lg leading-relaxed list-disc list-inside space-y-2">
                  {milestone.bulletPoints.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Footer */}
              <div className="mt-auto space-y-2">
                {/* Team & Revenue */}
                {(milestone.team || milestone.revenue) &&
                <div className="flex items-center gap-4 text-sm">
                    {milestone.team &&
                  <div className="flex items-center gap-1">
                        <Users className={`w-4 h-4 ${milestone.textColor}`} />
                        <span className={milestone.textColor}>{milestone.team}</span>
                      </div>
                  }
                    {milestone.revenue &&
                  <div className="flex items-center gap-1">
                        <span className={`font-bold ${milestone.textColor}`}>€</span>
                        <span className={milestone.textColor}>{milestone.revenue}</span>
                      </div>
                  }
                  </div>
                }

                {/* Hashtag */}
                <div className={`text-lg font-semibold ${milestone.hashtagColor}`}>
                  {milestone.hashtag}
                </div>
              </div>
            </motion.div>);

        })}
      </div>
    </div>);

}