"use client";

import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { MapPin, Sun, Moon } from 'lucide-react';
import { useLanguage } from '@/src/contexts/LanguageContext';

// Coordonnées de Toulouse
const TOULOUSE_COORDS: [number, number] = [43.6045, 1.4442];
const DEFAULT_ZOOM = 12;

const LocationMap = memo(function LocationMap() {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState('');
  const [isDaytime, setIsDaytime] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const toulouseTime = new Intl.DateTimeFormat('fr-FR', {
        timeZone: 'Europe/Paris',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now);
      
      setCurrentTime(toulouseTime);
      
      const hour = parseInt(toulouseTime.split(':')[0], 10);
      setIsDaytime(hour >= 6 && hour < 21);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function loadMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      try {
        // Dynamically import Leaflet
        const { default: L } = await import('leaflet');
        await import('leaflet/dist/leaflet.css' as any);

        if (!isMounted || !mapContainerRef.current) return;

        // Initialize map (static, non-interactive)
        const map = L.map(mapContainerRef.current, {
          zoomControl: false,
          attributionControl: false,
          dragging: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          boxZoom: false,
          keyboard: false,
          touchZoom: false
        }).setView(TOULOUSE_COORDS, DEFAULT_ZOOM);

        // Ajouter les tuiles du thème sombre
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          attribution: '',
          keepBuffer: 4,
          updateWhenIdle: false,
          updateWhenZooming: false
        }).addTo(map);

        mapInstanceRef.current = map;
        setIsMapLoaded(true);
      } catch (error) {
        console.error('Failed to load map:', error);
      }
    }

    loadMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const recenterMap = useCallback(() => {
    mapInstanceRef.current?.setView(TOULOUSE_COORDS, DEFAULT_ZOOM);
  }, []);

  return (
    <div 
      className="flex flex-col rounded-xl border p-4 shadow-lg"
      style={{
        borderColor: 'var(--color-surface0)',
        backgroundColor: 'var(--color-base)'
      }}
    >
      <div className="mb-3 flex w-full items-center gap-2 text-left text-sm font-semibold">
        <MapPin size={16} style={{ color: 'var(--color-accent)' }} />
        <span style={{ color: 'var(--color-text)' }}>
          {t('location.based_in')}
        </span>
      </div>
      <div 
        className="relative w-full flex-1 overflow-hidden rounded-lg"
        style={{ backgroundColor: 'var(--color-surface0)', minHeight: '300px' }}
      >
        <div ref={mapContainerRef} className="h-full w-full" />
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs" style={{ color: 'var(--color-subtext1)' }}>
              {t('location.loading_map')}
            </span>
          </div>
        )}
      </div>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-xs whitespace-nowrap" style={{ color: 'var(--color-subtext0)' }}>
          Toulouse, France
        </span>
        {currentTime && (
          <div className="flex items-center gap-1">
            {isDaytime ? (
              <Sun size={12} style={{ color: 'var(--color-yellow)' }} />
            ) : (
              <Moon size={12} style={{ color: 'var(--color-lavender)' }} />
            )}
            <span className="text-xs font-mono" style={{ color: 'var(--color-subtext1)' }}>
              {currentTime}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});

export default LocationMap;
