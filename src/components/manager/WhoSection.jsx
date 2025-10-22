
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Briefcase, GraduationCap, Building, TrendingUp, Users, Star, ChevronsRight, ChevronsLeft } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import InteractiveWorldMapNew from './InteractiveWorldMapNew'; // New world map component
import DetailedTimeline from './DetailedTimeline'; // Import the new DetailedTimeline component

// Sport images - Add your own images to public/images/sports/
// Supported formats: sport-1.jpg, sport-2.jpeg, sport-3.jpg, sport-4.jpg
const sportsImagesList = [
  { id: 1, filename: 'sport-1.jpg', title: 'Sport 1' },
  { id: 2, filename: 'sport-2.jpeg', title: 'Sport 2' },
  { id: 3, filename: 'sport-3.jpg', title: 'Sport 3' },
  { id: 4, filename: 'sport-4.jpg', title: 'Sport 4' },
];

const defaultSportsImages = sportsImagesList.map(img => ({
  id: img.id,
  title: img.title,
  url: `/EikeCase/images/sports/${img.filename}`,
  isLocal: true
}));

const compactMilestones = [
  { icon: GraduationCap, year: '2015-18', title: 'Banker', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/2340d7224_OLB.png'},
  { icon: Briefcase, year: '2018-21', title: 'Jr. Consultant', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2e/CEMS_logo.svg', hasDeloitte: true},
  { icon: Building, year: '2022', title: 'Consultant', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/eaebdd7ca_Commerzpng.png', hasDeloitte: true},
  { icon: Users, year: '2022-24', title: 'Sr. Consultant', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/260011748_ERGO.png', hasDeloitte: true},
  { icon: Star, year: '2025', title: 'Project Lead', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/60d27e529_Barmenia-removebg-preview.png', hasDeloitte: true},
];

export default function WhoSection() {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [visitedCount, setVisitedCount] = useState(0);
  const [isJourneyExpanded, setIsJourneyExpanded] = useState(false);
  const [privateVideoError, setPrivateVideoError] = useState(false);
  const [businessVideoError, setBusinessVideoError] = useState(false);
  const sportsImages = defaultSportsImages; // Use static images from public folder

  const fetchVisitedCount = async () => {
      try {
          const countries = await base44.entities.VisitedCountry.list();
          // Count unique country codes to avoid duplicates
          const uniqueCountryCodes = new Set(countries.map(c => c.country_code.toLowerCase()));
          setVisitedCount(uniqueCountryCodes.size);
      } catch (error) {
          console.error("Error fetching visited countries count:", error);
      }
  };

  useEffect(() => {
    fetchVisitedCount();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section id="who" className="h-screen w-full bg-gradient-to-br from-white to-gray-100 flex flex-col px-20 py-12 overflow-hidden">
      <motion.h1
        className="text-4xl font-normal text-black text-left mb-2"
        style={{ fontFamily: 'Aptos, Open Sans, Segoe UI, sans-serif' }}
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Breaking complexity starts with me
      </motion.h1>

      <motion.h2
        className="text-2xl text-gray-600 text-left mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        Curious Mind. Dynamic Leader. Defined by Efficiency.
      </motion.h2>

      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>

        <AnimatePresence initial={false}>
          {isJourneyExpanded ? (
            <motion.div
              key="journey-expanded"
              className="lg:col-span-2 lg:row-span-2 bg-white rounded-xl shadow-lg p-6 flex flex-col"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-[#003b6e]">My Professional Journey</h2>
                    <button
                        onClick={() => setIsJourneyExpanded(false)}
                        className="flex items-center gap-1 text-sm text-[#003b6e] hover:text-[#86BC25] transition-colors"
                    >
                        <ChevronsLeft className="w-4 h-4" />
                        Collapse
                    </button>
                </div>
                <div className="flex-grow overflow-hidden">
                    <DetailedTimeline /> {/* The DetailedTimeline component is placed here */}
                </div>
            </motion.div>
          ) : (
            <>
              {/* Globetrotter with Flag Grid */}
              <motion.div
                key="globetrotter"
                className="bg-white rounded-xl shadow-lg p-3 flex flex-col"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-[#003b6e] flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Globetrotter
                  </h3>
                </div>
                <div className="flex-grow bg-gray-50 rounded-lg overflow-hidden relative">
                  <InteractiveWorldMapNew onCountryToggled={fetchVisitedCount} visitedCount={visitedCount} />
                </div>
              </motion.div>

              {/* Sport Enthusiast */}
              <motion.div
                key="sport"
                className="bg-white rounded-xl shadow-lg p-3 flex flex-col"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold text-[#003b6e] mb-2">🏃 Sport Enthusiast</h3>
                <div className="flex-grow flex gap-2 overflow-x-auto rounded-lg" style={{ scrollbarWidth: 'thin', scrollbarColor: '#9CA3AF #E5E7EB' }}>
                  {sportsImages.map((image) => (
                    <div
                      key={image.id}
                      className="flex-shrink-0 w-1/3 min-w-[100px] h-full rounded-lg overflow-hidden cursor-pointer group relative"
                      onClick={() => setFullscreenImage(image)}
                    >
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Tech Explorer */}
              <motion.div
                key="tech-explorer"
                className="bg-white rounded-xl shadow-lg p-3 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-bold text-[#003b6e] mb-2">💻 Tech Explorer</h3>
                <div className="flex-grow flex gap-2">
                  {/* Left - Private Video */}
                  <div className="flex-1 flex flex-col">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Private</p>
                    <div className="flex-1 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all relative">
                      <video
                        className="w-full h-full object-cover"
                        src="/videos/tech/private.mp4"
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        onMouseEnter={(e) => e.target.play().catch(() => {})}
                        onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                        onError={() => setPrivateVideoError(true)}
                        onLoadedData={() => setPrivateVideoError(false)}
                      >
                        <source src="/videos/tech/private.mp4" type="video/mp4" />
                      </video>
                      {privateVideoError && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <p className="text-xs text-gray-400 text-center px-2">Private Tech<br/>Video placeholder</p>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Right - Business Video */}
                  <div className="flex-1 flex flex-col">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Business</p>
                    <div className="flex-1 bg-gradient-to-br from-green-50 to-green-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-green-400 transition-all relative">
                      <video
                        className="w-full h-full object-cover"
                        src="/videos/tech/business.mp4"
                        loop
                        muted
                        playsInline
                        preload="metadata"
                        onMouseEnter={(e) => e.target.play().catch(() => {})}
                        onMouseLeave={(e) => { e.target.pause(); e.target.currentTime = 0; }}
                        onError={() => setBusinessVideoError(true)}
                        onLoadedData={() => setBusinessVideoError(false)}
                      >
                        <source src="/videos/tech/business.mp4" type="video/mp4" />
                      </video>
                      {businessVideoError && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <p className="text-xs text-gray-400 text-center px-2">Business Tech<br/>Video placeholder</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* My Journey (Compact) */}
              <motion.div
                key="journey-compact"
                className="bg-white rounded-xl shadow-lg p-3 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-[#003b6e] flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      My Journey
                    </h3>
                    <button
                        onClick={() => setIsJourneyExpanded(true)}
                        className="flex items-center gap-1 text-sm text-[#003b6e] hover:text-[#86BC25] transition-colors"
                        aria-label="Expand Journey"
                    >
                        Expand <ChevronsRight className="w-3 h-3" />
                    </button>
                </div>

                <div className="flex-grow flex items-center justify-between gap-2 relative" style={{ maxHeight: '80%' }}>
                  {/* Green Deloitte Box - behind the 4 boxes, now includes logo */}
                  <div className="absolute top-0 bottom-0 left-[20%] right-0 bg-gradient-to-r from-[#046A38]/10 to-[#86BC25]/10 rounded-lg pointer-events-none z-0 border-2 border-[#046A38]/20">
                    {/* Deloitte Logo inside box */}
                    <div className="absolute top-2 left-0 right-0 flex items-center justify-center">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/e/ed/Logo_of_Deloitte.svg"
                        alt="Deloitte"
                        className="h-6 object-contain opacity-70"
                      />
                    </div>
                  </div>

                  {compactMilestones.map((milestone, index) => {
                    const Icon = milestone.icon;
                    return(
                      <React.Fragment key={index}>
                        <div
                          className="flex-1 flex flex-col items-center text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer relative z-20"
                          style={{ maxHeight: '80%' }}
                          onClick={() => setIsJourneyExpanded(true)}
                        >
                          {/* Logo */}
                          <div className="h-6 mb-1 flex items-center justify-center">
                            <img src={milestone.logo} alt={milestone.title} className="h-full object-contain" />
                          </div>
                          {/* Title */}
                          <p className="text-xs font-bold text-[#003b6e] leading-tight mb-1">{milestone.title}</p>
                          {/* Year */}
                          <p className="text-[10px] text-gray-500">{milestone.year}</p>
                        </div>
                        {index < compactMilestones.length - 1 && <div className="w-px h-10 bg-gray-200 z-20"></div>}
                      </React.Fragment>
                    )
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <motion.div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setFullscreenImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={() => setFullscreenImage(null)}
          >
            <X className="w-10 h-10" />
          </button>
          <motion.img
            layoutId={`sport-image-${fullscreenImage.id}`}
            src={fullscreenImage.url}
            alt={fullscreenImage.title}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        </motion.div>
      )}
    </section>
  );
}
