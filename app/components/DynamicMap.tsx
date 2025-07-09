"use client";
import { useEffect, useState, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import LocationPermissionHandler from './LocationPermissionHandler';
import { useTranslation } from '../context/TranslationContext';
import useSupercluster from 'use-supercluster';
import { BBox } from 'geojson';

// Fix for default marker icons in Leaflet with Next.js
const DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapLocation {
  id: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  type: string;
  date: string;
  address: string;
  status?: string;
}

interface DynamicMapProps {
  locations: MapLocation[];
  center?: {
    lat: number;
    lng: number;
  };
  zoom?: number;
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

// Add ClusterMarkers component
function ClusterMarkers({ locations, createCustomIcon }: { 
  locations: MapLocation[], 
  createCustomIcon: (color: string) => L.DivIcon 
}) {
  const map = useMap();
  const [bounds, setBounds] = useState<BBox | undefined>(undefined);
  const [zoom, setZoom] = useState(map.getZoom());

  // Update bounds and zoom when map moves
  useEffect(() => {
    const updateMap = () => {
      const b = map.getBounds();
      setBounds([
        b.getWest(),
        b.getSouth(),
        b.getEast(),
        b.getNorth()
      ]);
      setZoom(map.getZoom());
    };
    
    updateMap();
    map.on('moveend', updateMap);
    return () => {
      map.off('moveend', updateMap);
    };
  }, [map]);

  // Format GeoJSON points for supercluster
  const points = locations.map(item => ({
    type: 'Feature' as const,
    properties: { 
      ...item,
      color: item.type.toLowerCase() === 'incidents' 
        ? (item.status?.toLowerCase() === 'active' ? 'red' 
          : item.status?.toLowerCase() === 'resolved' ? 'green' 
          : item.status?.toLowerCase() === 'investigating' ? 'orange' 
          : 'gray')
        : 'red'
    },
    geometry: {
      type: 'Point' as const,
      coordinates: [item.longitude, item.latitude]
    }
  }));

  const { clusters, supercluster } = useSupercluster({
    points,
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 20 }
  });

  if (!bounds) return null;

  return (
    <>
      {clusters.map(cluster => {
        const [longitude, latitude] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount } = cluster.properties;

        if (isCluster) {
          return (
            <Marker
              key={`cluster-${cluster.id}`}
              position={[latitude, longitude]}
              icon={L.divIcon({
                html: `<div class="cluster-marker">${pointCount}</div>`,
                className: "custom-cluster-icon",
                iconSize: L.point(40, 40, true)
              })}
              eventHandlers={{
                click: () => {
                  const expansionZoom = Math.min(
                    supercluster.getClusterExpansionZoom(cluster.id),
                    20
                  );
                  map.setView([latitude, longitude], expansionZoom);
                }
              }}
            />
          );
        }

        // For individual points
        const item = cluster.properties;
        return (
          <Marker
            key={`point-${item.id}`}
            position={[latitude, longitude]}
            icon={createCustomIcon(item.color)}
          >
            <Popup>
              <div className="text-sm">
                <strong className="block mb-1">{item.title}</strong>
                <p className="mb-1">{item.description}</p>
                <p className="text-gray-600">{item.address}</p>
                {item.date && (
                  <p className="text-gray-600 mt-1">{new Date(item.date).toLocaleDateString()}</p>
                )}
                {item.status && (
                  <span className={`
                    inline-block px-2 py-1 mt-2 rounded-full text-xs
                    ${item.status.toLowerCase() === 'active' ? 'bg-red-100 text-red-800' :
                      item.status.toLowerCase() === 'resolved' ? 'bg-green-100 text-green-800' :
                      'bg-yellow-100 text-yellow-800'}
                  `}>
                    {item.status}
                  </span>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
}

function getUserLocation(): Promise<{ lat: number; lng: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser'));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        () => {
          // Default to San Francisco if geolocation fails
          resolve({ lat: 37.7749, lng: -122.4194 });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    }
  });
}

export default function DynamicMap({ locations, center: initialCenter, zoom: initialZoom = 12 }: DynamicMapProps) {
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  const mapZoom = initialZoom;
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const handleLocationGranted = useCallback((position: GeolocationPosition) => {
    const { latitude: lat, longitude: lng } = position.coords;
    setUserLocation({ lat, lng });
    if (!initialCenter) {
      setMapCenter([lat, lng]);
    }
    setIsLoading(false);
  }, [initialCenter]);

  const handleLocationDenied = useCallback(() => {
    setLocationError('Location access was denied. Please enable location access in your browser settings to use this feature.');
    if (!initialCenter) {
      setMapCenter([37.7749, -122.4194]); // Default to San Francisco
    }
    setIsLoading(false);
  }, [initialCenter]);

  const handleLocationError = useCallback((error: GeolocationPositionError) => {
    let message = 'Unable to access your location. ';
    switch (error.code) {
      case error.POSITION_UNAVAILABLE:
        message += 'Location information is unavailable.';
        break;
      case error.TIMEOUT:
        message += 'The request to get your location timed out.';
        break;
      default:
        message += 'An unknown error occurred.';
    }
    setLocationError(message);
    if (!initialCenter) {
      setMapCenter([37.7749, -122.4194]); // Default to San Francisco
    }
    setIsLoading(false);
  }, [initialCenter]);

  useEffect(() => {
    const initializeMap = async () => {
      if (initialCenter) {
        setMapCenter([initialCenter.lat, initialCenter.lng]);
        setIsLoading(false);
      } else {
        try {
          const location = await getUserLocation();
          setUserLocation(location);
          setMapCenter([location.lat, location.lng]);
        } catch (error) {
          if (error instanceof GeolocationPositionError) {
            if (error.code === error.PERMISSION_DENIED) {
              setLocationError('Location access was denied. Please enable location access in your browser settings to use this feature.');
            } else if (error.code === error.POSITION_UNAVAILABLE) {
              setLocationError('Location information is unavailable. Please check your device settings.');
            } else if (error.code === error.TIMEOUT) {
              setLocationError('The request to get your location timed out. Please try again.');
            } else {
              setLocationError('Unable to access your location. Please try again.');
            }
          } else {
            setLocationError('An error occurred while accessing location services. Please try again.');
          }
          // Default to San Francisco
          setMapCenter([37.7749, -122.4194]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    initializeMap();
  }, [initialCenter]);

  const createCustomIcon = (color: string) => {
    return L.divIcon({
      html: `
        <div style="
          position: relative;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
        ">
          <svg viewBox="0 0 24 24" width="36" height="36">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" 
              fill="${color}"
              stroke="#ffffff"
              stroke-width="1.5"
            />
          </svg>
          <div style="
            position: absolute;
            bottom: -2px;
            left: 50%;
            transform: translateX(-50%);
            width: 8px;
            height: 8px;
            background-color: ${color};
            border: 2px solid #ffffff;
            border-radius: 50%;
            box-shadow: 0 0 4px rgba(0,0,0,0.4);
          "></div>
        </div>
      `,
      className: '',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -36]
    });
  };

  const handleViewAllClick = () => {
    if (locations.length > 0 && mapInstance) {
      const bounds = L.latLngBounds(
        locations.map(loc => [loc.latitude, loc.longitude])
      );
      mapInstance.fitBounds(bounds, { padding: [50, 50] });
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Getting your location...</p>
        </div>
      </div>
    );
  }

  if (!mapCenter) {
    return (
      <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-xl">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Initializing map...</p>
        </div>
      </div>
    );
  }

  return (
    <LocationPermissionHandler
      onLocationGranted={handleLocationGranted}
      onLocationDenied={handleLocationDenied}
      onLocationError={handleLocationError}
    >
      <div className="relative w-full h-[600px] rounded-xl overflow-hidden">
        <style jsx global>{`
          .custom-cluster-icon {
            background: none;
          }
          
          .cluster-marker {
            color: #fff;
            background: #1978c8;
            border-radius: 50%;
            padding: 10px;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            font-size: 14px;
            box-shadow: 0 0 0 5px rgba(25, 120, 200, 0.3);
          }
        `}</style>
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          className="w-full h-full"
          style={{ background: '#f0f0f0' }}
          ref={setMapInstance}
        >
          <ChangeView center={mapCenter} zoom={mapZoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {userLocation && (
            <Marker
              position={[userLocation.lat, userLocation.lng]}
              icon={createCustomIcon('blue')}
            >
              <Popup>
                <div className="text-sm">
                  <strong>{t('incidents.all.yourLocation')}</strong>
                </div>
              </Popup>
            </Marker>
          )}

          <ClusterMarkers 
            locations={locations} 
            createCustomIcon={createCustomIcon} 
          />
        </MapContainer>

        {locationError && (
          <div className="absolute top-4 left-4 z-[1000] p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p className="text-sm text-red-600 dark:text-red-400">{locationError}</p>
          </div>
        )}

        <div className="absolute bottom-4 right-4 z-[1000] flex gap-2">
          <button
            onClick={() => userLocation && mapInstance?.setView([userLocation.lat, userLocation.lng], mapZoom)}
            className="px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 text-gray-900 transition-colors text-sm font-medium"
          >
            {t('incidents.all.centerOnMe')}
          </button>
          <button
            onClick={handleViewAllClick}
            className="px-4 py-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 text-gray-900 transition-colors text-sm font-medium"
          >
            {t('incidents.all.viewAll')}
          </button>
        </div>
      </div>
    </LocationPermissionHandler>
  );
} 
