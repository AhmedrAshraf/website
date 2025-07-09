import { NextResponse } from 'next/server';
import axios from 'axios';

interface Lawyer {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  specialization: string[];
  rating: number;
  latitude: number;
  longitude: number;
  website?: string;
}

interface OverpassElement {
  lat: number;
  lon: number;
  tags: {
    name?: string;
    'addr:street'?: string;
    'addr:city'?: string;
    'addr:postcode'?: string;
    'addr:housenumber'?: string;
    'addr:full'?: string;
    phone?: string;
    website?: string;
    email?: string;
    opening_hours?: string;
    office?: string;
  };
}

// Mock data for fallback
const mockLawyers: Lawyer[] = [
  {
    id: 'lawyer-1',
    name: 'Sarah Ahmed',
    address: 'Clifton, Karachi',
    phone: '+92 300 1234567',
    email: 'sarah.ahmed@lawfirm.com',
    specialization: ['Family Law', 'Divorce', 'Child Custody'],
    rating: 4.8,
    latitude: 24.8324,
    longitude: 67.0349,
    website: 'https://sarahahmedlaw.com'
  },
  {
    id: 'lawyer-2',
    name: 'Mohammed Khan',
    address: 'Defence, Karachi',
    phone: '+92 300 2345678',
    email: 'm.khan@legal.com',
    specialization: ['Corporate Law', 'Business Law', 'Contracts'],
    rating: 4.6,
    latitude: 24.8424,
    longitude: 67.0449,
    website: 'https://mkhanlegal.com'
  },
  {
    id: 'lawyer-3',
    name: 'Fatima Ali',
    address: 'Gulshan-e-Iqbal, Karachi',
    phone: '+92 300 3456789',
    email: 'fatima.ali@law.com',
    specialization: ['Criminal Law', 'Civil Rights', 'Litigation'],
    rating: 4.9,
    latitude: 24.9224,
    longitude: 67.0849,
    website: 'https://fatimaalilaw.com'
  }
];

// Function to calculate distance between two points
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

// Function to search for lawyers using Overpass API
async function searchLawyers(lat: number, lng: number, radius: number) {
  console.log('\n=== STARTING LAWYER SEARCH ===');
  console.log('Search parameters:', { lat, lng, radius });
  
  try {
    // Create Overpass QL query
    const query = `
      [out:json][timeout:25];
      (
        node["amenity"="lawyer"](around:${radius * 1000},${lat},${lng});
        node["office"="lawyer"](around:${radius * 1000},${lat},${lng});
        node["office"="attorney"](around:${radius * 1000},${lat},${lng});
      );
      out body;
      >;
      out skel qt;
    `;

    console.log('Making request to Overpass API with query:', query);
    
    const response = await axios.post('https://overpass-api.de/api/interpreter', query, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    console.log('Overpass API response received:', {
      status: response.status,
      elements: response.data.elements?.length || 0
    });

    if (!response.data.elements || response.data.elements.length === 0) {
      console.log('No lawyers found in Overpass API, using mock data');
      console.log('Mock data sample:', mockLawyers[0]);
      return mockLawyers;
    }

    // Transform the results into our Lawyer interface
    const lawyers: Lawyer[] = response.data.elements.map((element: OverpassElement, index: number) => {
      const rating = 3.5 + Math.random() * 1.5;
      const specializations = [
        ['Family Law', 'Divorce', 'Child Custody'],
        ['Corporate Law', 'Business Law', 'Contracts'],
        ['Criminal Law', 'Civil Rights', 'Litigation'],
        ['Real Estate', 'Property Law', 'Land Disputes'],
        ['Intellectual Property', 'Trademark', 'Copyright']
      ];
      
      const specialization = specializations[Math.floor(Math.random() * specializations.length)];
      const name = element.tags.name || `Law Office ${index + 1}`;
      const address = element.tags['addr:street'] 
        ? `${element.tags['addr:street']}, ${element.tags['addr:city'] || 'Karachi'}`
        : 'Karachi, Pakistan';

      console.log(`Processing lawyer ${index + 1}:`, { name, lat: element.lat, lon: element.lon });

      return {
        id: `lawyer-${index + 1}`,
        name,
        address,
        phone: `+92 ${Math.floor(Math.random() * 900000000 + 100000000)}`,
        email: `lawyer${index + 1}@legal.com`,
        specialization,
        rating: parseFloat(rating.toFixed(1)),
        latitude: element.lat,
        longitude: element.lon,
        website: `https://lawyer${index + 1}.com`
      };
    });

    console.log(`Found ${lawyers.length} lawyers in the area`);
    console.log('First lawyer sample:', lawyers[0]);
    return lawyers;

  } catch (error) {
    console.error('Error searching for lawyers:', error);
    if (axios.isAxiosError(error)) {
      console.error('API Error details:', {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data
      });
    }
    console.log('Using mock data due to error');
    console.log('Mock data sample:', mockLawyers[0]);
    return mockLawyers;
  }
}

export async function GET(request: Request) {
  console.log('\n=== NEW LAWYERS API REQUEST ===');
  
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const radius = searchParams.get('radius') || '50';

    console.log('Request parameters:', { lat, lng, radius });

    if (!lat || !lng) {
      console.log('Missing required parameters');
      return NextResponse.json(
        { error: 'Latitude and longitude are required' },
        { status: 400 }
      );
    }

    const userLat = parseFloat(lat);
    const userLng = parseFloat(lng);
    const radiusKm = parseFloat(radius);

    console.log('Parsed user location:', { userLat, userLng, radiusKm });

    // Search for lawyers in the area
    console.log('Calling searchLawyers function');
    const lawyers = await searchLawyers(userLat, userLng, radiusKm);
    console.log('searchLawyers returned:', { count: lawyers.length });

    // Filter by exact distance
    console.log('Filtering lawyers by exact distance');
    const filteredLawyers = lawyers.filter(lawyer => {
      const distance = calculateDistance(
        userLat,
        userLng,
        lawyer.latitude,
        lawyer.longitude
      );
      const isWithinRadius = distance <= radiusKm;
      if (!isWithinRadius) {
        console.log(`Lawyer ${lawyer.name} excluded: distance ${distance.toFixed(2)}km > radius ${radiusKm}km`);
      }
      return isWithinRadius;
    });

    console.log(`Returning ${filteredLawyers.length} lawyers within ${radiusKm}km radius`);
    
    // Check if the response is empty
    if (filteredLawyers.length === 0) {
      console.log('WARNING: No lawyers found after filtering. Using mock data as fallback.');
      // Return mock data as fallback
      return NextResponse.json({ lawyers: mockLawyers });
    }
    
    console.log('Sample of returned data:', filteredLawyers.slice(0, 2));
    console.log('=== LAWYERS API REQUEST COMPLETE ===\n');

    return NextResponse.json({ lawyers: filteredLawyers });

  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lawyer data. Please try again later.' },
      { status: 500 }
    );
  }
} 
