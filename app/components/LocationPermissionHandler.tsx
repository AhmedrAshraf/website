"use client";
import { useEffect, useState, ReactNode } from 'react';

interface LocationPermissionHandlerProps {
  children: ReactNode;
  onLocationGranted: (position: GeolocationPosition) => void;
  onLocationDenied: () => void;
  onLocationError: (error: GeolocationPositionError) => void;
}

export default function LocationPermissionHandler({
  children,
  onLocationGranted,
  onLocationDenied,
  onLocationError
}: LocationPermissionHandlerProps) {
  const [permissionChecked, setPermissionChecked] = useState(false);

  useEffect(() => {
    console.log('LocationPermissionHandler mounted');
    
    const checkPermission = () => {
      if (!navigator.geolocation) {
        console.log('Geolocation not supported');
        onLocationDenied();
        setPermissionChecked(true);
        return;
      }

      console.log('Requesting geolocation permission');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Geolocation permission granted', position.coords);
          onLocationGranted(position);
          setPermissionChecked(true);
        },
        (error) => {
          console.error('Geolocation permission error:', error);
          if (error.code === error.PERMISSION_DENIED) {
            onLocationDenied();
          } else {
            onLocationError(error);
          }
          setPermissionChecked(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    };

    checkPermission();

    // Add a fallback timeout
    const timeoutId = setTimeout(() => {
      if (!permissionChecked) {
        console.log('Permission check timed out');
        onLocationDenied();
        setPermissionChecked(true);
      }
    }, 15000);

    return () => {
      clearTimeout(timeoutId);
      console.log('LocationPermissionHandler unmounted');
    };
  }, [onLocationGranted, onLocationDenied, onLocationError, permissionChecked]);

  return <>{children}</>;
} 
