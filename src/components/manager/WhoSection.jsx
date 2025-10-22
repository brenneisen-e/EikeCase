
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Briefcase, GraduationCap, Building, TrendingUp, Users, Star, ChevronsRight, ChevronsLeft, Upload, Trash2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import InteractiveWorldMapNew from './InteractiveWorldMapNew'; // New world map component
import DetailedTimeline from './DetailedTimeline'; // Import the new DetailedTimeline component

const defaultSportsImages = [
  {
    id: 1,
    title: 'Wildwasser Rafting',
    url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/3dcc5eb12_SAVE_20220418_140433.jpg',
    isDefault: true
  },
  {
    id: 2,
    title: 'Deloitte Team Marathon',
    url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/df4439e82_1685432342706.jpg',
    isDefault: true
  },
  {
    id: 3,
    title: 'Marathon Running',
    url: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/64e1eb2b1_9431_20231001_144044_318986871_original.jpg',
    isDefault: true
  },
];

const compactMilestones = [
  { icon: GraduationCap, year: '2015-18', title: 'Banker', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/2340d7224_OLB.png'},
  { icon: Briefcase, year: '2018-21', title: 'Jr. Consultant', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/260011748_ERGO.png'},
  { icon: Building, year: '2022', title: 'Consultant', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/eaebdd7ca_Commerzpng.png'},
  { icon: Users, year: '2022-24', title: 'Sr. Consultant', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/260011748_ERGO.png'},
  { icon: Star, year: '2025', title: 'Project Lead', logo: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/60d27e529_Barmenia-removebg-preview.png'},
];

export default function WhoSection() {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [visitedCount, setVisitedCount] = useState(0);
  const [isJourneyExpanded, setIsJourneyExpanded] = useState(false);
  const [sportsImages, setSportsImages] = useState([]);
  const [hoveredImageId, setHoveredImageId] = useState(null);
  const fileInputRef = useRef(null);

  // Load sports images from localStorage
  useEffect(() => {
    const savedImages = localStorage.getItem('sports_images_who');
    if (savedImages) {
      setSportsImages(JSON.parse(savedImages));
    } else {
      setSportsImages(defaultSportsImages);
      localStorage.setItem('sports_images_who', JSON.stringify(defaultSportsImages));
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const newImage = {
        id: Date.now(),
        title: file.name.split('.')[0],
        url: reader.result,
        isDefault: false
      };

      const updatedImages = [...sportsImages, newImage];
      setSportsImages(updatedImages);
      localStorage.setItem('sports_images_who', JSON.stringify(updatedImages));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (imageId, event) => {
    event.stopPropagation();
    const updatedImages = sportsImages.filter(img => img.id !== imageId);
    setSportsImages(updatedImages);
    localStorage.setItem('sports_images_who', JSON.stringify(updatedImages));
  };

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
        Curious mind. Driven by impact. Defined by exploration.
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
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-bold text-[#003b6e]">🏃 Sport Enthusiast</h3>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1 px-2 py-1 bg-[#86BC25] text-white rounded-lg hover:bg-[#7BA622] transition-colors text-xs"
                  >
                    <Upload className="w-3 h-3" />
                    Upload
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                <div className="flex-grow flex gap-2 overflow-x-auto rounded-lg">
                  {sportsImages.map((image) => (
                    <div
                      key={image.id}
                      className="flex-shrink-0 w-1/3 h-full rounded-lg overflow-hidden cursor-pointer group relative"
                      onClick={() => setFullscreenImage(image)}
                      onMouseEnter={() => setHoveredImageId(image.id)}
                      onMouseLeave={() => setHoveredImageId(null)}
                    >
                      <img
                        src={image.url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                      {hoveredImageId === image.id && (
                        <button
                          onClick={(e) => handleDeleteImage(image.id, e)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors z-10"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
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
                  {/* Left - Private */}
                  <div className="flex-1 flex flex-col">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Private</p>
                    <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        src="https://mein-inventar-9e0d6fc0.base44.app/"
                        className="w-full h-full border-0"
                        title="Private Inventory"
                        style={{ transform: 'scale(0.7)', transformOrigin: '0 0', width: '142.857%', height: '142.857%' }}
                      />
                    </div>
                  </div>
                  {/* Right - Business */}
                  <div className="flex-1 flex flex-col">
                    <p className="text-xs font-semibold text-gray-600 mb-1">Business</p>
                    <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                      <iframe
                        src="https://deudeloitte.sharepoint.com/sites/DOL-c-DE-EventExperiencePlatform/SitePages/Deloitte-Event-Experience.aspx?env=WebView"
                        className="w-full h-full border-0"
                        title="Business Platform"
                        style={{ transform: 'scale(0.7)', transformOrigin: '0 0', width: '142.857%', height: '142.857%' }}
                      />
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
                    <h3 className="text-lg font-bold text-[#003b6e]">My Journey</h3>
                    <button
                        onClick={() => setIsJourneyExpanded(true)}
                        className="flex items-center gap-1 text-sm text-[#003b6e] hover:text-[#86BC25] transition-colors"
                        aria-label="Expand Journey"
                    >
                        Expand <ChevronsRight className="w-3 h-3" />
                    </button>
                </div>

                <div className="flex-grow flex items-center justify-between gap-2">
                  {compactMilestones.map((milestone, index) => {
                    const Icon = milestone.icon;
                    return(
                      <React.Fragment key={index}>
                        <div
                          className="flex-1 flex flex-col items-center text-center p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                          onClick={() => setIsJourneyExpanded(true)}
                        >
                          {/* Logo */}
                          <div className="h-8 mb-2 flex items-center justify-center">
                            <img src={milestone.logo} alt={milestone.title} className="h-full object-contain" />
                          </div>
                          {/* Title */}
                          <p className="text-xs font-bold text-[#003b6e] leading-tight mb-1">{milestone.title}</p>
                          {/* Year */}
                          <p className="text-[10px] text-gray-500">{milestone.year}</p>
                        </div>
                        {index < compactMilestones.length - 1 && <div className="w-px h-12 bg-gray-200"></div>}
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
