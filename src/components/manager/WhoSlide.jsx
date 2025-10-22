
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Upload, Trash2 } from 'lucide-react';
import InteractiveWorldMap from './InteractiveWorldMap';
import Timeline from './Timeline';

const defaultSportsImages = [
  { id: 1, title: 'Badminton', url: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800', isDefault: true },
  { id: 2, title: 'Marathon', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800', isDefault: true },
  { id: 3, title: 'Football', url: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800', isDefault: true }
];

export default function WhoSlide({ onNext, onPrev }) {
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [sportsImages, setSportsImages] = useState([]);
  const [hoveredImageId, setHoveredImageId] = useState(null);
  const fileInputRef = useRef(null);

  // Load images from localStorage on mount
  useEffect(() => {
    const savedImages = localStorage.getItem('sports_images');
    if (savedImages) {
      setSportsImages(JSON.parse(savedImages));
    } else {
      setSportsImages(defaultSportsImages);
      localStorage.setItem('sports_images', JSON.stringify(defaultSportsImages));
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
      localStorage.setItem('sports_images', JSON.stringify(updatedImages));
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = (imageId, event) => {
    event.stopPropagation();
    const updatedImages = sportsImages.filter(img => img.id !== imageId);
    setSportsImages(updatedImages);
    localStorage.setItem('sports_images', JSON.stringify(updatedImages));
  };

  return (
    <div className="h-full w-full bg-gradient-to-br from-white to-gray-100 p-8 relative">
      {/* Unsichtbare Navigations-Trigger */}
      <div 
        className="absolute top-0 left-0 w-1/5 h-full z-20 cursor-w-resize"
        onClick={onPrev}
        title="Previous Slide"
      />
      <div 
        className="absolute top-0 right-0 w-1/5 h-full z-20 cursor-e-resize"
        onClick={onNext}
        title="Next Slide"
      />

      <motion.h1 
        className="text-4xl font-bold text-[#003b6e] text-center mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        WHO – Personal Introduction
      </motion.h1>

      <div className="grid grid-cols-2 gap-8 h-5/6">
        {/* Left Side - Personal Photo */}
        <motion.div 
          className="bg-white rounded-xl shadow-lg p-8 flex items-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-center">
            <div className="w-64 h-64 rounded-full overflow-hidden mx-auto mb-6 shadow-xl">
              <img 
                src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/68c975121a45dbb9eb30bd64/17b2122c1_1747395927374.jpg" 
                alt="Eike Brenneisen" 
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-[#003b6e] mb-2">Eike Brenneisen</h3>
            <p className="text-lg text-[#86BC25] font-semibold">BCM Transformation</p>
          </div>
        </motion.div>

        {/* Right Side - Three Interactive Areas */}
        <div className="space-y-4">
          {/* Area 1 - Sport Enthusiast */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 h-1/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-[#003b6e]">🏃 Sport Enthusiast</h3>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 px-3 py-1 bg-[#86BC25] text-white rounded-lg hover:bg-[#7BA622] transition-colors text-sm"
              >
                <Upload className="w-4 h-4" />
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
            <div className="flex gap-2 overflow-x-auto">
              {sportsImages.map((image) => (
                <div
                  key={image.id}
                  className="relative flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setFullscreenImage(image)}
                  onMouseEnter={() => setHoveredImageId(image.id)}
                  onMouseLeave={() => setHoveredImageId(null)}
                >
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  {hoveredImageId === image.id && (
                    <button
                      onClick={(e) => handleDeleteImage(image.id, e)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Area 2 - Globetrotter */}
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 h-1/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-[#003b6e] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Globetrotter
            </h3>
            <div className="h-24 bg-gray-100 rounded-lg overflow-hidden">
              <InteractiveWorldMap compact={true} />
            </div>
          </motion.div>

          {/* Area 3 - Tech Explorer */}
          <motion.div
            className="bg-white rounded-xl shadow-lg p-6 h-1/3"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h3 className="text-lg font-bold text-[#003b6e] mb-4">💻 Tech Explorer</h3>
            <div className="flex gap-4 h-24">
              {/* Left Side - Private */}
              <div className="flex-1 flex flex-col">
                <p className="text-xs font-semibold text-gray-600 mb-1">Private</p>
                <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src="https://mein-inventar-9e0d6fc0.base44.app/"
                    className="w-full h-full border-0"
                    title="Private Inventory"
                  />
                </div>
              </div>
              {/* Right Side - Business */}
              <div className="flex-1 flex flex-col">
                <p className="text-xs font-semibold text-gray-600 mb-1">Business</p>
                <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden">
                  <iframe
                    src="https://deudeloitte.sharepoint.com/sites/DOL-c-DE-EventExperiencePlatform/SitePages/Deloitte-Event-Experience.aspx?env=WebView"
                    className="w-full h-full border-0"
                    title="Business Platform"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Timeline */}
      <motion.div 
        className="absolute bottom-4 left-8 right-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Timeline />
      </motion.div>

      {/* Fullscreen Image Modal */}
      {fullscreenImage && (
        <motion.div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setFullscreenImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setFullscreenImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={fullscreenImage.url}
            alt={fullscreenImage.title}
            className="max-w-full max-h-full object-contain"
          />
        </motion.div>
      )}
    </div>
  );
}
