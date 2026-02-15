
import { GeocodingResult } from '../types';

export const searchAddress = async (query: string): Promise<GeocodingResult[]> => {
  if (!query) return [];
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5&addressdetails=1`
  );
  if (!response.ok) {
    throw new Error('Falha ao buscar endereço');
  }
  return response.json();
};

export const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
  );
  if (!response.ok) return 'Local selecionado';
  const data = await response.json();
  return data.display_name || 'Local selecionado';
};
