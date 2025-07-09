interface Attorney {
  id: string;
  name: string;
  specialization: string;
  location: string;
  detailedLocation: string;
  rating: number;
  cases: number;
  image: string;
  languages: string[];
  featured: boolean;
  lat: number;
  lng: number;
  phone: string;
  email: string;
  barNumber: string;
}

interface LocationParams {
  lat: number;
  lng: number;
  radius: number;
}

// Sample attorneys data - replace this with your actual data source
const sampleAttorneys: Attorney[] = [
  {
    id: "1",
    name: "John Smith",
    specialization: "Immigration Law",
    location: "San Francisco",
    detailedLocation: "123 Market St, San Francisco, CA 94105",
    rating: 4.8,
    cases: 150,
    image: "/images/attorneys/attorney1.jpg",
    languages: ["English", "Spanish"],
    featured: true,
    lat: 37.7749,
    lng: -122.4194,
    phone: "+1 (415) 555-0123",
    email: "john.smith@example.com",
    barNumber: "CA123456"
  },
  {
    id: "2",
    name: "Sarah Johnson",
    specialization: "Family Law",
    location: "San Francisco",
    detailedLocation: "456 Mission St, San Francisco, CA 94105",
    rating: 4.9,
    cases: 200,
    image: "/images/attorneys/attorney2.jpg",
    languages: ["English", "Mandarin"],
    featured: false,
    lat: 37.7833,
    lng: -122.4167,
    phone: "+1 (415) 555-0124",
    email: "sarah.johnson@example.com",
    barNumber: "CA123457"
  },
  {
    id: "3",
    name: "Michael Chen",
    specialization: "Corporate Law",
    location: "San Francisco",
    detailedLocation: "789 Howard St, San Francisco, CA 94103",
    rating: 4.7,
    cases: 180,
    image: "/images/attorneys/attorney3.jpg",
    languages: ["English", "Cantonese"],
    featured: true,
    lat: 37.7817,
    lng: -122.4123,
    phone: "+1 (415) 555-0125",
    email: "michael.chen@example.com",
    barNumber: "CA123458"
  }
];

// Haversine formula to calculate distance between two points
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

export async function getAttorneys({ lat, lng, radius }: LocationParams): Promise<Attorney[]> {
  try {
    // Filter attorneys based on distance
    const filteredAttorneys = sampleAttorneys.filter((attorney) => {
      if (!attorney.lat || !attorney.lng) return false;
      
      const distance = calculateDistance(
        lat,
        lng,
        attorney.lat,
        attorney.lng
      );
      
      return distance <= radius;
    }).sort((a, b) => {
      // First sort by featured status
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then sort by rating
      return b.rating - a.rating;
    });

    return filteredAttorneys;
  } catch (error) {
    console.error('Error in getAttorneys:', error);
    throw error;
  }
} 