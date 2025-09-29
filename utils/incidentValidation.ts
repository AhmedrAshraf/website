import supabase from './supabase';

// Configuration for duplicate prevention
const DUPLICATE_PREVENTION_CONFIG = {
  // Radius in kilometers within which to check for duplicates
  RADIUS_KM: 0.5, // 500 meters
  // Time window in minutes to check for recent incidents
  TIME_WINDOW_MINUTES: 30,
  // Maximum number of incidents allowed in the area within the time window
  MAX_INCIDENTS_IN_AREA: 1
};

/**
 * Calculate distance between two points using Haversine formula
 * @param lat1 Latitude of first point
 * @param lon1 Longitude of first point
 * @param lat2 Latitude of second point
 * @param lon2 Longitude of second point
 * @returns Distance in kilometers
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

/**
 * Check if there are too many recent incidents in the area
 * @param latitude Latitude of the new incident
 * @param longitude Longitude of the new incident
 * @returns Object with validation result and message
 */
export async function validateIncidentLocation(
  latitude: number, 
  longitude: number
): Promise<{ isValid: boolean; message: string; nearbyIncidents?: number }> {
  try {
    // Calculate time threshold
    const timeThreshold = new Date();
    timeThreshold.setMinutes(timeThreshold.getMinutes() - DUPLICATE_PREVENTION_CONFIG.TIME_WINDOW_MINUTES);

    // Fetch recent incidents
    const { data: recentIncidents, error } = await supabase
      .from('incidents')
      .select('latitude, longitude, created_at, type')
      .gte('created_at', timeThreshold.toISOString())
      .eq('status', 'active');

    if (error) {
      console.error('Error fetching recent incidents:', error);
      // If we can't check, allow the report to proceed
      return { isValid: true, message: '' };
    }

    if (!recentIncidents || recentIncidents.length === 0) {
      return { isValid: true, message: '' };
    }

    // Check for incidents within the radius
    const nearbyIncidents = recentIncidents.filter(incident => {
      const distance = calculateDistance(
        latitude, 
        longitude, 
        incident.latitude, 
        incident.longitude
      );
      return distance <= DUPLICATE_PREVENTION_CONFIG.RADIUS_KM;
    });

    if (nearbyIncidents.length >= DUPLICATE_PREVENTION_CONFIG.MAX_INCIDENTS_IN_AREA) {
      return {
        isValid: false,
        message: `Unable to report your incident because there is already a recent report in this area. Please try again later or report from a different location.`,
        nearbyIncidents: nearbyIncidents.length
      };
    }

    return { 
      isValid: true, 
      message: '',
      nearbyIncidents: nearbyIncidents.length
    };

  } catch (error) {
    console.error('Error validating incident location:', error);
    // If validation fails, allow the report to proceed
    return { isValid: true, message: '' };
  }
}

/**
 * Get configuration for duplicate prevention
 */
export function getDuplicatePreventionConfig() {
  return DUPLICATE_PREVENTION_CONFIG;
}
