import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { VisitedCountry } from '@/api/entities';
import 'leaflet/dist/leaflet.css';

export default function InteractiveWorldMap({ compact = false, onCountryToggled }) {
    const [worldData, setWorldData] = useState(null);
    const [visitedCountries, setVisitedCountries] = useState(new Set());
    const geoJsonRef = useRef(null);

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson')
            .then(response => response.json())
            .then(data => {
                const filteredFeatures = data.features.filter(feature => feature.properties.name !== "Antarctica");
                setWorldData({ type: "FeatureCollection", features: filteredFeatures });
            })
            .catch(error => console.error('Error loading world data:', error));

        loadVisitedCountries();
    }, []);

    const loadVisitedCountries = async () => {
        try {
            const countries = await VisitedCountry.list();
            const countrySet = new Set(countries.map(c => c.country_code));
            setVisitedCountries(countrySet);
        } catch (error) {
            console.error('Error loading visited countries:', error);
        }
    };

    const getCountryStyle = (feature) => {
        const countryCode = feature.id || feature.properties.iso_a3 || feature.properties.ISO_A3;
        const isVisited = visitedCountries.has(countryCode);
        return {
            color: isVisited ? '#86BC25' : '#cbd5e1',
            weight: isVisited ? 1.5 : 0.8,
            opacity: 1,
            fillOpacity: isVisited ? 0.7 : 0.3,
            fillColor: isVisited ? '#86BC25' : '#e2e8f0'
        };
    };

    const onEachCountry = (feature, layer) => {
        const countryCode = feature.id || feature.properties.iso_a3 || feature.properties.ISO_A3;
        const countryName = feature.properties.name;

        layer.on({
            click: async function(e) {
                try {
                    const isCurrentlyVisited = visitedCountries.has(countryCode);

                    if (isCurrentlyVisited) {
                        const countries = await VisitedCountry.list();
                        const countryToDelete = countries.find(c => c.country_code === countryCode);
                        if (countryToDelete) {
                            await VisitedCountry.delete(countryToDelete.id);
                        }
                    } else {
                        await VisitedCountry.create({
                            country_code: countryCode,
                            country_name: countryName,
                            visited_date: new Date().toISOString().split('T')[0]
                        });
                    }
                    
                    await loadVisitedCountries();
                    if(onCountryToggled) onCountryToggled();

                } catch (error) {
                    console.error(`Error toggling country ${countryCode}:`, error);
                }
            },
            mouseover: (e) => e.target.setStyle({ weight: 2, color: '#4ade80' }),
            mouseout: (e) => {
                if (geoJsonRef.current) {
                    geoJsonRef.current.resetStyle(e.target);
                }
            }
        });
        layer.bindTooltip(countryName, { sticky: true });
    };
    
    useEffect(() => {
        if (geoJsonRef.current) {
            geoJsonRef.current.clearLayers().addData(worldData);
        }
    }, [visitedCountries, worldData]);


    if (!worldData) return <div className="flex items-center justify-center h-full">Loading Map...</div>;

    return (
        <MapContainer 
            center={compact ? [48, 15] : [35, 15]} 
            zoom={compact ? 3 : 2} 
            scrollWheelZoom={true} 
            style={{ height: '100%', width: '100%', borderRadius: '0.5rem' }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            />
            <GeoJSON
                ref={geoJsonRef}
                key={visitedCountries.size}
                data={worldData}
                style={getCountryStyle}
                onEachFeature={onEachCountry}
            />
        </MapContainer>
    );
}