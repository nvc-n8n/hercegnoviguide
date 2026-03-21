import { useState } from 'react';
import * as Location from 'expo-location';

import { useAppStore } from '@/src/store/useAppStore';

export const useLocation = () => {
  const lastKnownLocation = useAppStore((s) => s.lastKnownLocation);
  const setLastKnownLocation = useAppStore((s) => s.setLastKnownLocation);
  const [isRequestingLocation, setIsRequestingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocation = async () => {
    setIsRequestingLocation(true);
    setLocationError(null);

    try {
      const permission = await Location.requestForegroundPermissionsAsync();

      if (permission.status !== 'granted') {
        setLocationError('Dozvola za lokaciju nije odobrena.');
        return null;
      }

      const currentPosition = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      if (!currentPosition?.coords) {
        setLocationError('Lokacija nije dostupna.');
        return null;
      }

      const nextLocation = {
        latitude: currentPosition.coords.latitude,
        longitude: currentPosition.coords.longitude,
        timestamp: Date.now(),
      };

      setLastKnownLocation(nextLocation);
      return nextLocation;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Lokacija trenutno nije dostupna.';
      setLocationError(message);
      console.error('Location request failed:', error);
      return null;
    } finally {
      setIsRequestingLocation(false);
    }
  };

  return {
    lastKnownLocation,
    locationError,
    isRequestingLocation,
    requestLocation,
  };
};
