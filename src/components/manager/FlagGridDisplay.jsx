import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';

export default function FlagGridDisplay({ onCountryToggled, visitedCount }) {
    const [allCountries, setAllCountries] = useState([]);
    const [visitedCountries, setVisitedCountries] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            
            const countries = await base44.entities.Country.list();
            const visited = await base44.entities.VisitedCountry.list();
            
            setAllCountries(countries);
            setVisitedCountries(visited);
        } catch (error) {
            console.error('Error loading countries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFlagClick = async (country) => {
        try {
            const existingVisit = visitedCountries.find(v => v.country_code.toLowerCase() === country.country_code.toLowerCase());
            
            if (existingVisit) {
                await base44.entities.VisitedCountry.delete(existingVisit.id);
                setVisitedCountries(prev => prev.filter(v => v.id !== existingVisit.id));
            } else {
                const newVisit = await base44.entities.VisitedCountry.create({
                    country_code: country.country_code,
                    country_name: country.country_name,
                    visited_date: new Date().toISOString().split('T')[0]
                });
                setVisitedCountries(prev => [...prev, newVisit]);
            }
            
            if (onCountryToggled) onCountryToggled();
        } catch (error) {
            console.error('Error toggling visited country:', error);
        }
    };

    const visitedCountryCodes = new Set(visitedCountries.map(v => v.country_code.toLowerCase()));

    const sortedCountries = [...allCountries].sort((a, b) => {
        const aVisited = visitedCountryCodes.has(a.country_code.toLowerCase());
        const bVisited = visitedCountryCodes.has(b.country_code.toLowerCase());
        
        if (aVisited && !bVisited) return -1;
        if (!aVisited && bVisited) return 1;
        
        return a.country_name.localeCompare(b.country_name);
    });

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Loading flags...</div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            <div className="w-full h-full overflow-y-auto p-2">
                <div className="grid grid-cols-12 gap-2">
                    {sortedCountries.map((country, index) => {
                        const isVisited = visitedCountryCodes.has(country.country_code.toLowerCase());
                        
                        return (
                            <motion.div
                                key={country.country_code}
                                className={`relative rounded overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                                    isVisited 
                                        ? 'border-[#86BC25] shadow-md' 
                                        : 'border-gray-300 grayscale opacity-50 hover:opacity-70'
                                }`}
                                style={{ aspectRatio: '4/3' }}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.005, duration: 0.2 }}
                                title={country.country_name}
                                onClick={() => handleFlagClick(country)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img
                                    src={country.flag_url}
                                    alt={country.country_name}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <div 
                className="absolute bg-white rounded-full shadow-xl flex flex-col items-center justify-center pointer-events-none"
                style={{
                    width: '180px',
                    height: '180px',
                    border: '4px solid #86BC25',
                    left: 'calc(50% - 90px)',
                    top: 'calc(50% - 90px)',
                    zIndex: 10
                }}
            >
                <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, type: 'spring', stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center"
                >
                    <div className="text-5xl font-bold text-[#046A38] mb-1">
                        {visitedCount}
                    </div>
                    <div className="text-xl text-gray-400 font-medium">/ 193</div>
                    <div className="text-sm text-gray-600 mt-2 font-semibold">Countries</div>
                </motion.div>
            </div>
        </div>
    );
}