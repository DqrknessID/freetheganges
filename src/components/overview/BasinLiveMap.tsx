import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { riverPaths } from '../../data/riverPaths';
import { ActiveView } from '../../types';

interface BasinLiveMapProps {
  onNavigate: (view: ActiveView) => void;
}

const URBAN_CENTERS_GIS = [
  { name: 'Haridwar', country: 'India', lat: 29.96, lng: 78.17, status: 'Baseline', color: '#4ADE80', highlight: 'Ganges Upper Reaches: Clean Baseline Flow' },
  { name: 'Kanpur', country: 'India', lat: 26.43, lng: 80.40, status: 'Critical', color: '#F87171', highlight: 'Jajmau Tanneries: Severe Hexavalent Chromium (48.5 mg/L)' },
  { name: 'Prayagraj', country: 'India', lat: 25.43, lng: 81.88, status: 'Watchlist', color: '#38BDF8', highlight: 'Ganges-Yamuna Sangam: Siltation and Elevated BOD' },
  { name: 'Varanasi', country: 'India', lat: 25.31, lng: 83.01, status: 'Severe', color: '#FB923C', highlight: 'Assi & Varuna Outfalls: Fecal Coliform Surges' },
  { name: 'Patna', country: 'India', lat: 25.62, lng: 85.17, status: 'Severe', color: '#FB923C', highlight: 'Gandak-Ganges Confluence: Untreated Sewage Plumes' },
  { name: 'Kolkata', country: 'India', lat: 22.58, lng: 88.35, status: 'Severe', color: '#FB923C', highlight: 'Hooghly Industrial Reach: Heavy Metals and Chemical Runoff' },
  { name: 'Dhaka', country: 'Bangladesh', lat: 23.71, lng: 90.36, status: 'Critical', color: '#F87171', highlight: 'Buriganga River: Severe Biological Anoxia (DO 0.2 mg/L)' },
  { name: 'Chandpur', country: 'Bangladesh', lat: 23.23, lng: 90.65, status: 'Watchlist', color: '#38BDF8', highlight: 'Padma-Meghna Confluence: Microplastics and Silt Deficits' },
  { name: 'Chittagong', country: 'Bangladesh', lat: 22.25, lng: 91.80, status: 'Severe', color: '#FB923C', highlight: 'Karnaphuli Estuary: Shipbreaking Asbestos and Oils' },
];

export const BasinLiveMap: React.FC<BasinLiveMapProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (mapRef.current) return;

    try {
      const map = L.map(containerRef.current, {
        center: [25.5, 85.0],
        zoom: 6,
        minZoom: 4,
        maxZoom: 12,
        maxBounds: [
          [19.0, 72.0],
          [33.0, 98.0],
        ],
        zoomControl: true,
        attributionControl: false,
      });

      // Esri World Dark Gray Base (Free, no API key, no watermark)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
      }).addTo(map);

      // Esri Dark Gray Reference (Labels & Political Boundaries)
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 16,
        opacity: 0.8,
      }).addTo(map);

      // Render River Paths
      riverPaths.forEach((river) => {
        const polyline = L.polyline(river.coordinates, {
          color: river.color || '#38BDF8',
          weight: Math.max(river.width || 3, 3),
          opacity: 0.9,
          lineJoin: 'round',
          lineCap: 'round',
        });

        polyline.bindTooltip(
          `<div style="font-family:monospace;font-size:11px;font-weight:700;color:#38BDF8;">${river.name} (${river.system})</div>`,
          { sticky: true, className: 'leaflet-dark-tooltip' }
        );

        polyline.addTo(map);
      });

      // Render Urban Centers Markers
      URBAN_CENTERS_GIS.forEach((city) => {
        const icon = L.divIcon({
          className: 'custom-city-pin',
          html: `
            <div style="position:relative;width:24px;height:24px;display:flex;align-items:center;justify-content:center;cursor:pointer;">
              <div style="position:absolute;width:24px;height:24px;border-radius:50%;background:${city.color};opacity:0.25;animation:pulse 2s infinite;"></div>
              <div style="width:12px;height:12px;border-radius:50%;background:#0A1422;border:2px solid ${city.color};"></div>
              <div style="width:4px;height:4px;border-radius:50%;background:${city.color};"></div>
            </div>
          `,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        const marker = L.marker([city.lat, city.lng], { icon });

        const popupContent = document.createElement('div');
        popupContent.style.fontFamily = 'Plus Jakarta Sans, sans-serif';
        popupContent.style.padding = '4px';
        popupContent.innerHTML = `
          <div style="font-weight:700;color:#FFFFFF;font-size:12px;margin-bottom:2px;">${city.name} (${city.country})</div>
          <div style="font-size:11px;color:${city.color};font-weight:600;margin-bottom:4px;">Status: ${city.status}</div>
          <div style="font-size:11px;color:#CBD5E1;line-height:1.4;margin-bottom:8px;">${city.highlight}</div>
          <button id="inspect-${city.name}" style="background:#152234;color:#38BDF8;border:1px solid #2D4263;padding:6px 10px;border-radius:4px;font-size:11px;cursor:pointer;width:100%;font-weight:600;">
            Inspect in Environmental Atlas
          </button>
        `;

        popupContent.querySelector(`#inspect-${city.name}`)?.addEventListener('click', () => {
          onNavigate('atlas');
        });

        marker.bindPopup(popupContent, {
          className: 'leaflet-dark-popup',
        });

        marker.bindTooltip(
          `<div style="font-family:sans-serif;font-size:11px;font-weight:700;color:#FFFFFF;">${city.name}</div>`,
          { direction: 'top', offset: [0, -12] }
        );

        marker.addTo(map);
      });

      mapRef.current = map;
    } catch (err) {
      console.warn('Leaflet live map initialization skipped in current runtime:', err);
    }

    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.remove();
        } catch {
          // ignore cleanup in test
        }
        mapRef.current = null;
      }
    };
  }, [onNavigate]);

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-border-strong bg-[#0B1524]" data-lenis-prevent>
      <div
        ref={containerRef}
        data-lenis-prevent
        style={{ width: '100%', height: '460px', minHeight: '440px', backgroundColor: '#0B1524' }}
      />
    </div>
  );
};
