import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const projects = [
    { id: 1, pos: [52.52, 13.40], status: 'Active', name: 'Berlin Transformation', value: '€2.1M' },
    { id: 2, pos: [48.85, 2.35], status: 'Completed', name: 'Paris Integration', value: '€1.5M' },
    { id: 3, pos: [40.71, -74.00], status: 'Active', name: 'New York Advisory', value: '€3.5M' },
    { id: 4, pos: [35.68, 139.69], status: 'Pipeline', name: 'Tokyo Market Entry', value: '€4.0M' },
    { id: 5, pos: [51.50, -0.12], status: 'Completed', name: 'London Compliance', value: '€1.8M' },
];

const statusColors = {
    Active: 'bg-green-100 text-green-800',
    Completed: 'bg-gray-100 text-gray-800',
    Pipeline: 'bg-orange-100 text-orange-800',
};

const createCustomIcon = (status) => {
    let color = '#666666'; // Completed
    if (status === 'Active') color = '#86BC25';
    if (status === 'Pipeline') color = '#FFA500';

    const markerHtmlStyles = `
        background-color: ${color};
        width: 2rem;
        height: 2rem;
        display: block;
        left: -1rem;
        top: -1rem;
        position: relative;
        border-radius: 2rem 2rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF;`
    
    return L.divIcon({
        className: "my-custom-pin",
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `<span style="${markerHtmlStyles}" />`
    })
};

export default function InteractiveMap() {
    if (typeof window === 'undefined') {
        return null;
    }

    return (
        <MapContainer center={[40, 10]} zoom={2} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
            />
            {projects.map(p => (
                <Marker key={p.id} position={p.pos} icon={createCustomIcon(p.status)}>
                    <Popup>
                        <div className="p-1 font-sans">
                            <h4 className="font-bold text-black mb-2 pb-1 border-b-2 border-[#86BC25]">{p.name}</h4>
                            <div className="flex justify-between py-1 border-b border-gray-200"><span className="text-gray-600 text-sm">Status:</span> <span className={`text-sm font-semibold px-2 py-0.5 rounded ${statusColors[p.status]}`}>{p.status}</span></div>
                            <div className="flex justify-between py-1"><span className="text-gray-600 text-sm">Value:</span> <span className="font-bold text-black">{p.value}</span></div>
                        </div>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}