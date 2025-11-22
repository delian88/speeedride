import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

interface MapComponentProps {
  center: { lat: number; lng: number };
  markers?: { lat: number; lng: number; type: 'pickup' | 'dropoff' | 'driver' }[];
}

export const MapComponent: React.FC<MapComponentProps> = ({ center, markers = [] }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView([center.lat, center.lng], 14);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([center.lat, center.lng], 14, {
        animate: true,
        duration: 1.5
      });
    }
  }, [center]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    markers.forEach(m => {
      const color = m.type === 'pickup' ? 'green' : m.type === 'dropoff' ? 'red' : 'black';
      
      // Create custom icon using divIcon and Tailwind classes
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="w-4 h-4 rounded-full bg-${color}-500 border-2 border-white shadow-lg"></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8]
      });

      const marker = L.marker([m.lat, m.lng], { icon }).addTo(mapInstanceRef.current!);
      markersRef.current.push(marker);
    });
  }, [markers]);

  return <div ref={mapContainerRef} className="w-full h-full" />;
};
