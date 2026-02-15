
export interface Location {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address?: string;
  createdAt: number;
}

export interface GeocodingResult {
  display_name: string;
  lat: string;
  lon: string;
  place_id: number;
}
