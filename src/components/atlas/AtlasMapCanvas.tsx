import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { 
  riverPaths, 
  hotspotsData, 
  industrialFacilities, 
  waterQualityStations, 
  ecologicalZones 
} from '../../data';
import { SeverityTier } from '../../types/geo';
import { SelectedEntity } from './LocationInspector';

interface AtlasMapCanvasProps {
  showRivers: boolean;
  showHotspots: boolean;
  showIndustries: boolean;
  showStations: boolean;
  showEcoZones: boolean;
  selectedSeverity: SeverityTier | 'All';
  searchQuery: string;
  onSelectEntity: (entity: SelectedEntity) => void;
  resetTrigger: number;
  zoomInTrigger: number;
  zoomOutTrigger: number;
}

export const AtlasMapCanvas: React.FC<AtlasMapCanvasProps> = ({
  showRivers,
  showHotspots,
  showIndustries,
  showStations,
  showEcoZones,
  selectedSeverity,
  searchQuery,
  onSelectEntity,
  resetTrigger,
  zoomInTrigger,
  zoomOutTrigger,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  // Layer group refs
  const riversLayerRef = useRef<L.LayerGroup | null>(null);
  const hotspotsLayerRef = useRef<L.LayerGroup | null>(null);
  const industriesLayerRef = useRef<L.LayerGroup | null>(null);
  const stationsLayerRef = useRef<L.LayerGroup | null>(null);
  const ecoZonesLayerRef = useRef<L.LayerGroup | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    try {
      const map = L.map(mapContainerRef.current, {
        center: [25.80, 85.50],
        zoom: 6,
        minZoom: 4,
        maxZoom: 18,
        maxBounds: [
          [19.5, 72.0],
          [32.5, 98.5],
        ],
        zoomControl: false,
        attributionControl: false,
      });

      // Primary: Esri World Dark Gray Base (100% free public REST service, NO API key required, NO watermark)
      // Fallback: OpenStreetMap with dark tile filter on tile error
      const primaryTileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}';
      const fallbackTileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

      let fallbackTriggered = false;
      const tileLayer = L.tileLayer(primaryTileUrl, {
        maxZoom: 16,
        attribution: '&copy; <a href="https://www.esri.com">Esri</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      });

      tileLayer.on('tileerror', () => {
        if (!fallbackTriggered) {
          fallbackTriggered = true;
          try {
            tileLayer.setUrl(fallbackTileUrl);
            const container = tileLayer.getContainer();
            if (container) {
              container.classList.add('dark-tiles');
            }
          } catch {
            // Guard against headless/test environments where DOM or setUrl might be limited
          }
        }
      });

      tileLayer.addTo(map);

      // Esri World Dark Gray Reference overlay for geographic labels and boundaries
      try {
        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
          maxZoom: 16,
          opacity: 0.75,
        }).addTo(map);
      } catch {
        // Guard against headless/test environments
      }

      // Create Layer Groups
      const riversGroup = L.layerGroup().addTo(map);
      const hotspotsGroup = L.layerGroup().addTo(map);
      const industriesGroup = L.layerGroup().addTo(map);
      const stationsGroup = L.layerGroup().addTo(map);
      const ecoZonesGroup = L.layerGroup().addTo(map);

      riversLayerRef.current = riversGroup;
      hotspotsLayerRef.current = hotspotsGroup;
      industriesLayerRef.current = industriesGroup;
      stationsLayerRef.current = stationsGroup;
      ecoZonesLayerRef.current = ecoZonesGroup;

      mapInstanceRef.current = map;
    } catch (err) {
      // In headless test environments (Vitest / JSDOM), Leaflet DOM initialization may fail safely
      console.warn('Leaflet map initialization skipped or limited in current runtime:', err);
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch {
          // ignore cleanup errors in test
        }
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Rivers Layer
  useEffect(() => {
    const group = riversLayerRef.current;
    if (!group) return;

    group.clearLayers();

    if (!showRivers) return;

    riverPaths.forEach((river) => {
      // Filter by search query if applicable
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matches = 
          river.name.toLowerCase().includes(q) ||
          river.system.toLowerCase().includes(q) ||
          river.description.toLowerCase().includes(q);
        if (!matches) return;
      }

      const polyline = L.polyline(river.coordinates, {
        color: river.color,
        weight: river.width,
        opacity: 0.85,
        lineJoin: 'round',
        lineCap: 'round',
      });

      polyline.bindTooltip(`<strong>${river.name}</strong> (${river.system})`, {
        sticky: true,
        className: 'leaflet-custom-tooltip',
      });

      polyline.on('mouseover', () => {
        polyline.setStyle({ weight: river.width + 2, opacity: 1.0 });
      });

      polyline.on('mouseout', () => {
        polyline.setStyle({ weight: river.width, opacity: 0.85 });
      });

      polyline.on('click', () => {
        onSelectEntity({ type: 'river', data: river });
      });

      polyline.addTo(group);
    });
  }, [showRivers, searchQuery, onSelectEntity]);

  // Update Hotspots Layer
  useEffect(() => {
    const group = hotspotsLayerRef.current;
    if (!group) return;

    group.clearLayers();

    if (!showHotspots) return;

    hotspotsData.forEach((hotspot) => {
      // Filter by severity
      if (selectedSeverity !== 'All' && hotspot.severity !== selectedSeverity) {
        return;
      }

      // Filter by search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matches = 
          hotspot.name.toLowerCase().includes(q) ||
          hotspot.city.toLowerCase().includes(q) ||
          hotspot.state.toLowerCase().includes(q) ||
          hotspot.country.toLowerCase().includes(q) ||
          hotspot.primaryPollutants.some((p) => p.toLowerCase().includes(q));
        if (!matches) return;
      }

      const color = 
        hotspot.severity === 'Critical' 
          ? '#D96A6A' 
          : hotspot.severity === 'High' 
          ? '#E7AE55' 
          : '#48B8D0';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="position:relative;width:28px;height:28px;display:flex;align-items:center;justify-content:center;cursor:pointer;">
            <div class="animate-radar-pulse" style="position:absolute;width:28px;height:28px;border-radius:9999px;background-color:${color}44;border:1.5px solid ${color};"></div>
            <div style="width:12px;height:12px;border-radius:9999px;background-color:${color};border:2px solid #080E17;box-shadow:0 0 6px ${color};"></div>
          </div>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      const marker = L.marker(hotspot.coordinates, { icon: customIcon });

      marker.bindTooltip(`<strong>${hotspot.name}</strong><br/>${hotspot.severity} Severity`, {
        direction: 'top',
        className: 'bg-surface text-text-primary border border-border-strong font-mono text-xs px-2 py-1 rounded shadow-lg',
      });

      marker.on('click', () => {
        onSelectEntity({ type: 'hotspot', data: hotspot });
      });

      marker.addTo(group);
    });
  }, [showHotspots, selectedSeverity, searchQuery, onSelectEntity]);

  // Update Industrial Facilities Layer
  useEffect(() => {
    const group = industriesLayerRef.current;
    if (!group) return;

    group.clearLayers();

    if (!showIndustries) return;

    industrialFacilities.forEach((facility) => {
      // Filter by search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matches = 
          facility.name.toLowerCase().includes(q) ||
          facility.clusterName.toLowerCase().includes(q) ||
          facility.sector.toLowerCase().includes(q) ||
          facility.keyChemicals.some((c) => c.toLowerCase().includes(q));
        if (!matches) return;
      }

      const color = 
        facility.complianceStatus === 'Non-Compliant' 
          ? '#D96A6A' 
          : facility.complianceStatus === 'Partially Compliant' 
          ? '#64B88A' 
          : '#E7AE55';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="width:24px;height:24px;border-radius:4px;background:#101A28;border:1.5px solid ${color};color:${color};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 5px rgba(0,0,0,0.5);cursor:pointer;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
            </svg>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker(facility.coordinates, { icon: customIcon });

      marker.bindTooltip(`<strong>${facility.name}</strong><br/>${facility.sector} | ${facility.complianceStatus}`, {
        direction: 'top',
        className: 'bg-surface text-text-primary border border-border-strong font-mono text-xs px-2 py-1 rounded shadow-lg',
      });

      marker.on('click', () => {
        onSelectEntity({ type: 'industry', data: facility });
      });

      marker.addTo(group);
    });
  }, [showIndustries, searchQuery, onSelectEntity]);

  // Update Monitoring Stations Layer
  useEffect(() => {
    const group = stationsLayerRef.current;
    if (!group) return;

    group.clearLayers();

    if (!showStations) return;

    waterQualityStations.forEach((station) => {
      // Filter by search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matches = 
          station.stationName.toLowerCase().includes(q) ||
          station.river.toLowerCase().includes(q) ||
          station.location.toLowerCase().includes(q) ||
          station.primaryContaminant.toLowerCase().includes(q);
        if (!matches) return;
      }

      const isExceeded = station.exceedanceMultiplier > 1;
      const color = isExceeded ? '#D96A6A' : '#64B88A';

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="width:22px;height:22px;border-radius:9999px;background:#101A28;border:1.5px solid ${color};color:${color};display:flex;align-items:center;justify-content:center;box-shadow:0 2px 5px rgba(0,0,0,0.5);cursor:pointer;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
            </svg>
          </div>
        `,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      });

      const marker = L.marker(station.coordinates, { icon: customIcon });

      marker.bindTooltip(`<strong>${station.stationName}</strong><br/>${station.primaryContaminant}: ${station.measuredValue} ${station.unit}`, {
        direction: 'top',
        className: 'bg-surface text-text-primary border border-border-strong font-mono text-xs px-2 py-1 rounded shadow-lg',
      });

      marker.on('click', () => {
        onSelectEntity({ type: 'station', data: station });
      });

      marker.addTo(group);
    });
  }, [showStations, searchQuery, onSelectEntity]);

  // Update Ecological Zones Layer
  useEffect(() => {
    const group = ecoZonesLayerRef.current;
    if (!group) return;

    group.clearLayers();

    if (!showEcoZones) return;

    ecologicalZones.forEach((zone) => {
      // Filter by search query
      if (searchQuery.trim().length > 0) {
        const q = searchQuery.toLowerCase();
        const matches = 
          zone.name.toLowerCase().includes(q) ||
          zone.category.toLowerCase().includes(q) ||
          zone.keySpecies.some((s) => s.toLowerCase().includes(q));
        if (!matches) return;
      }

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html: `
          <div style="width:24px;height:24px;border-radius:9999px;background:#101A28;border:1.5px solid #64B88A;color:#64B88A;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 5px rgba(0,0,0,0.5);cursor:pointer;">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
            </svg>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker(zone.coordinatesCentroid, { icon: customIcon });

      marker.bindTooltip(`<strong>${zone.name}</strong><br/>${zone.category} (${zone.protectionStatus})`, {
        direction: 'top',
        className: 'bg-surface text-text-primary border border-border-strong font-mono text-xs px-2 py-1 rounded shadow-lg',
      });

      marker.on('click', () => {
        onSelectEntity({ type: 'ecozone', data: zone });
      });

      marker.addTo(group);
    });
  }, [showEcoZones, searchQuery, onSelectEntity]);

  // Handle Map Reset
  useEffect(() => {
    if (resetTrigger === 0 || !mapInstanceRef.current) return;
    try {
      mapInstanceRef.current.setView([25.80, 85.50], 6);
    } catch {
      // ignore in test
    }
  }, [resetTrigger]);

  // Handle Zoom In
  useEffect(() => {
    if (zoomInTrigger === 0 || !mapInstanceRef.current) return;
    try {
      mapInstanceRef.current.zoomIn();
    } catch {
      // ignore in test
    }
  }, [zoomInTrigger]);

  // Handle Zoom Out
  useEffect(() => {
    if (zoomOutTrigger === 0 || !mapInstanceRef.current) return;
    try {
      mapInstanceRef.current.zoomOut();
    } catch {
      // ignore in test
    }
  }, [zoomOutTrigger]);

  return (
    <div className="flex-1 w-full h-full relative overflow-hidden bg-[#080E17]">
      <div 
        ref={mapContainerRef} 
        data-testid="atlas-map-canvas"
        className="w-full h-full min-h-[400px] z-10" 
      />
    </div>
  );
};
