import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';

// World map GeoJSON URL
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function InteractiveWorldMap({ onCountryToggled, visitedCount }) {
    const [allCountries, setAllCountries] = useState([]);
    const [visitedCountries, setVisitedCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hoveredCountry, setHoveredCountry] = useState(null);

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

    const handleCountryClick = async (geo) => {
        try {
            const countryCode = geo.id; // ISO 3166-1 alpha-3 code
            const countryName = geo.properties.name;

            // Convert alpha-3 to alpha-2 (we'll need to find the matching country in our list)
            const matchingCountry = allCountries.find(c =>
                c.country_name.toLowerCase() === countryName.toLowerCase() ||
                c.country_code.toLowerCase() === countryCode.toLowerCase().substring(0, 2)
            );

            if (!matchingCountry) return;

            const existingVisit = visitedCountries.find(v =>
                v.country_code.toLowerCase() === matchingCountry.country_code.toLowerCase()
            );

            if (existingVisit) {
                await base44.entities.VisitedCountry.delete(existingVisit.id);
                setVisitedCountries(prev => prev.filter(v => v.id !== existingVisit.id));
            } else {
                const newVisit = await base44.entities.VisitedCountry.create({
                    country_code: matchingCountry.country_code,
                    country_name: matchingCountry.country_name,
                    visited_date: new Date().toISOString().split('T')[0]
                });
                setVisitedCountries(prev => [...prev, newVisit]);
            }

            if (onCountryToggled) onCountryToggled();
        } catch (error) {
            console.error('Error toggling visited country:', error);
        }
    };

    const isCountryVisited = (geo) => {
        const countryName = geo.properties.name;
        return visitedCountries.some(v =>
            v.country_name.toLowerCase() === countryName.toLowerCase()
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-gray-500">Loading map...</div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            {/* Map Container */}
            <div className="w-full h-full">
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        scale: 400,
                        center: [15, 50] // Centered on Central Europe
                    }}
                    width={800}
                    height={600}
                    style={{ width: '100%', height: '100%' }}
                >
                    <ZoomableGroup zoom={1} center={[15, 50]}>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const isVisited = isCountryVisited(geo);
                                    const isHovered = hoveredCountry === geo.properties.name;

                                    return (
                                        <Geography
                                            key={geo.rsmKey}
                                            geography={geo}
                                            onMouseEnter={() => setHoveredCountry(geo.properties.name)}
                                            onMouseLeave={() => setHoveredCountry(null)}
                                            onClick={() => handleCountryClick(geo)}
                                            style={{
                                                default: {
                                                    fill: isVisited ? '#86BC25' : '#E5E7EB',
                                                    stroke: '#046A38',
                                                    strokeWidth: 0.5,
                                                    outline: 'none',
                                                    transition: 'all 0.2s ease-in-out'
                                                },
                                                hover: {
                                                    fill: isVisited ? '#9DD12E' : '#D1D5DB',
                                                    stroke: '#046A38',
                                                    strokeWidth: 1,
                                                    outline: 'none',
                                                    cursor: 'pointer'
                                                },
                                                pressed: {
                                                    fill: isVisited ? '#7BA622' : '#C5C9CF',
                                                    stroke: '#046A38',
                                                    strokeWidth: 0.5,
                                                    outline: 'none'
                                                }
                                            }}
                                        />
                                    );
                                })
                            }
                        </Geographies>
                    </ZoomableGroup>
                </ComposableMap>
            </div>

            {/* Hovered Country Tooltip */}
            {hoveredCountry && (
                <motion.div
                    className="absolute top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg border-2 border-[#046A38]"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                >
                    <p className="text-sm font-semibold text-[#046A38]">{hoveredCountry}</p>
                </motion.div>
            )}

            {/* Counter Display - Similar to VSTEike style */}
            <div
                className="absolute bg-white rounded-lg shadow-xl flex flex-col items-center justify-center pointer-events-none"
                style={{
                    width: '180px',
                    height: '180px',
                    border: '4px solid #86BC25',
                    right: '40px',
                    bottom: '40px',
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

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded border-2 border-[#046A38]" style={{ backgroundColor: '#86BC25' }}></div>
                        <span className="text-sm text-gray-700">Visited</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded border-2 border-[#046A38]" style={{ backgroundColor: '#E5E7EB' }}></div>
                        <span className="text-sm text-gray-700">Not Visited</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
