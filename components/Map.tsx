
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { reverseGeocode } from '../services/geocodingService';
import { Location } from '../types';
import { Save, MapPin, X } from 'lucide-react';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const DEFAULT_CENTER: [number, number] = [-18.9186, -48.2772];

interface MapProps {
  isSidebarOpen?: boolean;
}

// Sub-componente para lidar com atualizações de viewport e correção de tamanho
const MapController = ({ location, isSidebarOpen }: { location: Location | null; isSidebarOpen?: boolean }) => {
  const map = useMap();
  
  // Efeito para centralizar o mapa em um local selecionado
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 16, { animate: true });
    }
  }, [location, map]);

  // Efeito CRÍTICO para resolver as partes cinzas do mapa
  useEffect(() => {
    // Força o mapa a recalcular seu tamanho
    map.invalidateSize();
    
    // Pequeno atraso para garantir que as transições de CSS da sidebar terminaram
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 400);

    return () => clearTimeout(timer);
  }, [map, isSidebarOpen]);

  return null;
};

const ClickHandler = ({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const Map: React.FC<MapProps> = ({ isSidebarOpen }) => {
  const { selectedLocation, setSelectedLocation, addFavorite, favorites } = useFavoritesStore();
  const [clickedPos, setClickedPos] = useState<{ lat: number; lng: number } | null>(null);
  const [saveName, setSaveName] = useState('');
  const [address, setAddress] = useState('');
  const [isReverseGeocoding, setIsReverseGeocoding] = useState(false);

  const handleMapClick = async (lat: number, lng: number) => {
    setClickedPos({ lat, lng });
    setSelectedLocation(null);
    setSaveName('');
    setIsReverseGeocoding(true);
    const addr = await reverseGeocode(lat, lng);
    setAddress(addr);
    setIsReverseGeocoding(false);
  };

  const handleSave = () => {
    if (clickedPos && saveName.trim()) {
      addFavorite({
        name: saveName.trim(),
        lat: clickedPos.lat,
        lng: clickedPos.lng,
        address: address,
      });
      setClickedPos(null);
      setSaveName('');
    }
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer center={DEFAULT_CENTER} zoom={13} scrollWheelZoom={true} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController location={selectedLocation} isSidebarOpen={isSidebarOpen} />
        <ClickHandler onMapClick={handleMapClick} />

        {/* Marcador de Busca Selecionada */}
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
            <Popup minWidth={200} closeButton={false}>
              <div className="p-2">
                <h3 className="font-bold text-blue-700 text-sm mb-1">{selectedLocation.name}</h3>
                <p className="text-[11px] text-gray-500 leading-tight mb-2">{selectedLocation.address}</p>
                <div className="flex justify-between items-center text-[10px] text-gray-400">
                  <span>{selectedLocation.lat.toFixed(5)}, {selectedLocation.lng.toFixed(5)}</span>
                </div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Marcadores de Favoritos */}
        {favorites.map((fav) => (
          <Marker key={fav.id} position={[fav.lat, fav.lng]} icon={new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })}>
            <Popup closeButton={false}>
              <div className="p-1">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <h3 className="font-bold text-gray-800 text-sm">{fav.name}</h3>
                </div>
                <p className="text-[11px] text-gray-500 line-clamp-2">{fav.address}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Popup de Novo Registro ao Clicar */}
        {clickedPos && (
          <Marker position={[clickedPos.lat, clickedPos.lng]}>
            {/* Fix: Replace 'onClose' (which is not a valid react-leaflet Popup prop) with 'eventHandlers.remove' */}
            <Popup 
              minWidth={240} 
              eventHandlers={{
                remove: () => setClickedPos(null)
              }} 
              closeButton={false}
            >
              <div className="p-3">
                <div className="flex items-center justify-between mb-3">
                   <div className="flex items-center gap-2">
                      <div className="p-1.5 bg-blue-100 rounded-lg">
                        <MapPin className="w-4 h-4 text-blue-600" />
                      </div>
                      <h3 className="font-bold text-gray-800 text-sm">Novo Local</h3>
                   </div>
                   <button onClick={() => setClickedPos(null)} className="text-gray-400 hover:text-gray-600">
                     <X className="w-4 h-4" />
                   </button>
                </div>
                
                <div className="space-y-3">
                  <div className="text-[11px] text-gray-500 bg-gray-50 p-2 rounded border border-gray-100 italic">
                    {isReverseGeocoding ? "Buscando endereço..." : (address || "Endereço não identificado")}
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Nome do Local</label>
                    <input
                      type="text"
                      autoFocus
                      value={saveName}
                      onChange={(e) => setSaveName(e.target.value)}
                      className="w-full text-sm border-2 border-gray-100 rounded-lg p-2 focus:border-blue-500 focus:outline-none transition-colors"
                      placeholder="Ex: Minha Casa, Trabalho..."
                    />
                  </div>

                  <button
                    onClick={handleSave}
                    disabled={!saveName.trim()}
                    className={`w-full flex items-center justify-center gap-2 text-white font-bold py-2.5 px-4 rounded-lg transition-all ${
                      saveName.trim() ? 'bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200' : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    Salvar nos Favoritos
                  </button>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default Map;
