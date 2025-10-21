import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const selectedCountries = new Set([
    // Europa
    'DEU', 'FRA', 'GBR', 'ITA', 'ESP', 'POL', 'ROU', 'NLD', 'BEL', 'GRC', 'PRT', 'CZE', 'HUN', 'SWE', 'AUT', 'BGR', 'DNK', 'FIN', 'SVK', 'NOR', 'IRL', 'HRV', 'SVN', 'LTU', 'LVA', 'EST', 'LUX', 'MLT', 'CYP', 'CHE',
    // Nordamerika
    'USA', 'CAN', 'MEX',
    // Asien
    'JPN', 'CHN', 'IND', 'KOR', 'SGP', 'THA', 'MYS',
    // Ozeanien
    'AUS', 'NZL',
    // Afrika
    'ZAF', 'EGY', 'MAR',
    // Südamerika
    'BRA', 'ARG'
]);

export default function InteractiveWorldMap() {
    const [worldData, setWorldData] = useState(null);
    const countDisplayRef = useRef(null);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
            .then(response => response.json())
            .then(data => {
                const filteredFeatures = data.features.filter(
                    feature => feature.properties.name !== "Antarctica"
                );
                setWorldData({ type: "FeatureCollection", features: filteredFeatures });
            })
            .catch(error => console.error('Error loading world data:', error));
    }, []);

    const updateCounter = () => {
        if (countDisplayRef.current) {
            countDisplayRef.current.textContent = `${selectedCountries.size} Länder bereist`;
        }
    };

    const getCountryStyle = (feature) => {
        const countryCode = feature.properties.ISO_A3 || feature.properties.iso_a3 || feature.properties.id;
        const isSelected = selectedCountries.has(countryCode);
        
        return {
            color: isSelected ? '#86BC25' : '#cbd5e1',
            weight: isSelected ? 1.5 : 0.8,
            opacity: 1,
            fillOpacity: isSelected ? 0.7 : 0.3,
            fillColor: isSelected ? '#86BC25' : '#e2e8f0'
        };
    };

    const onEachCountry = (feature, layer) => {
        const countryCode = feature.properties.ISO_A3 || feature.properties.iso_a3 || feature.properties.id;
        const countryName = feature.properties.NAME || feature.properties.name || feature.properties.ADMIN;

        layer.on({
            click: function(e) {
                const isCurrentlySelected = selectedCountries.has(countryCode);
                
                if (isCurrentlySelected) {
                    selectedCountries.delete(countryCode);
                    e.target.setStyle({
                        color: '#cbd5e1',
                        weight: 0.8,
                        fillOpacity: 0.3,
                        fillColor: '#e2e8f0'
                    });
                } else {
                    selectedCountries.add(countryCode);
                    e.target.setStyle({
                        color: '#86BC25',
                        weight: 1.5,
                        fillOpacity: 0.7,
                        fillColor: '#86BC25'
                    });
                }
                updateCounter();
            },
            mouseover: function(e) {
                e.target.setStyle({
                    weight: 2,
                    color: '#4ade80',
                    fillOpacity: 0.8
                });
            },
            mouseout: function(e) {
                const isSelected = selectedCountries.has(countryCode);
                e.target.setStyle({
                    weight: isSelected ? 1.5 : 0.8,
                    color: isSelected ? '#86BC25' : '#cbd5e1',
                    fillOpacity: isSelected ? 0.7 : 0.3
                });
            }
        });

        if (countryName) {
            layer.bindTooltip(countryName, { sticky: true });
        }
    };

    if (!worldData) {
        return (
            <div className="relative w-full h-full flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#86BC25] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading world map...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full" style={{ aspectRatio: '1/1' }}>
            {/* Zähler */}
            <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#86BC25] rounded-full"></div>
                    <div>
                        <div className="text-sm font-semibold text-gray-800">Weltoffen</div>
                        <div className="text-xs text-gray-600" ref={countDisplayRef}>{selectedCountries.size} Länder bereist</div>
                    </div>
                </div>
            </div>

            <MapContainer 
                center={[54, 15]} // Europa-zentriert
                zoom={4} // Näher herangezoomt
                scrollWheelZoom={true} 
                style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
                />
                <GeoJSON
                    data={worldData}
                    style={getCountryStyle}
                    onEachFeature={onEachCountry}
                />
            </MapContainer>
        </div>
    );
}