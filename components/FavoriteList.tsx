
import React from 'react';
import { useFavoritesStore } from '../store/useFavoritesStore';
import { MapPin, Trash2, Heart, Navigation, Compass } from 'lucide-react';

const FavoriteList: React.FC = () => {
  const { favorites, removeFavorite, setSelectedLocation, selectedLocation } = useFavoritesStore();

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Deseja realmente remover este local dos favoritos?')) {
      removeFavorite(id);
      if (selectedLocation?.id === id) {
        setSelectedLocation(null);
      }
    }
  };

  // Lógica de pluralização para o contador de locais
  const renderFavoritesCount = () => {
    const count = favorites.length;
    if (count === 0) return "Nenhum local salvo";
    if (count === 1) return "Você tem 1 local salvo";
    return `Você tem ${count} locais salvos`;
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200 shadow-2xl overflow-hidden">
      {/* Header - Adicionado padding superior para não sobrepor o botão de fechar */}
      <div className="p-6 pt-20 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-red-50 rounded-xl">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">Favoritos</h2>
        </div>
        <p className="text-sm text-gray-500 font-medium">{renderFavoritesCount()}</p>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
            <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mb-4 border-2 border-dashed border-gray-200">
              <Compass className="text-gray-300 w-10 h-10 animate-pulse" />
            </div>
            <h3 className="text-gray-900 font-bold mb-1">Mapa Vazio?</h3>
            <p className="text-gray-500 text-sm">Busque um endereço ou clique no mapa para começar a salvar seus lugares favoritos.</p>
          </div>
        ) : (
          favorites
            .sort((a, b) => b.createdAt - a.createdAt)
            .map((loc) => (
              <div
                key={loc.id}
                onClick={() => setSelectedLocation(loc)}
                className={`group relative p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  selectedLocation?.id === loc.id
                    ? 'border-blue-500 bg-blue-50/50 shadow-inner'
                    : 'border-transparent bg-gray-50 hover:bg-white hover:border-gray-200 hover:shadow-lg'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${selectedLocation?.id === loc.id ? 'bg-blue-500' : 'bg-red-400'}`} />
                     <h3 className="font-bold text-gray-900 line-clamp-1 text-sm">{loc.name}</h3>
                  </div>
                  <button
                    onClick={(e) => handleRemove(e, loc.id)}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 line-clamp-2 mb-3 leading-relaxed">
                  {loc.address || 'Endereço não disponível'}
                </p>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100/50">
                  <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-tighter">
                    {loc.lat.toFixed(4)} / {loc.lng.toFixed(4)}
                  </span>
                  <Navigation className={`w-3.5 h-3.5 transition-transform ${selectedLocation?.id === loc.id ? 'text-blue-500 scale-125' : 'text-gray-300'}`} />
                </div>
              </div>
            ))
        )}
      </div>
      
      {/* Footer Minimalista */}
      <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
         <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Desafio IVARE • 2024</p>
      </div>
    </div>
  );
};

export default FavoriteList;
