
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, MapPin, Loader2, X, AlertCircle } from 'lucide-react';
import { searchAddress } from '../services/geocodingService';
import { useFavoritesStore } from '../store/useFavoritesStore';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const setSelectedLocation = useFavoritesStore((state) => state.setSelectedLocation);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 500);
    return () => clearTimeout(timer);
  }, [query]);

  const { data: results, isLoading, isError } = useQuery({
    queryKey: ['geocode', debouncedQuery],
    queryFn: () => searchAddress(debouncedQuery),
    enabled: debouncedQuery.length > 2,
  });

  const handleSelect = (res: any) => {
    const lat = parseFloat(res.lat);
    const lng = parseFloat(res.lon);
    setSelectedLocation({
      id: 'preview',
      name: res.display_name.split(',')[0],
      lat,
      lng,
      address: res.display_name,
      createdAt: Date.now()
    });
    setQuery('');
    setDebouncedQuery('');
  };

  return (
    <div className="relative w-full max-w-md z-[1000]">
      <div className="flex items-center bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all focus-within:ring-2 focus-within:ring-blue-500/50">
        <div className="pl-4 text-gray-400">
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-blue-500" /> : <Search className="w-5 h-5" />}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar endereço ou local..."
          className="w-full py-4 px-3 outline-none text-gray-700 font-medium"
        />
        {query && (
          <button 
            onClick={() => { setQuery(''); setDebouncedQuery(''); }}
            className="pr-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Resultados e Erros */}
      <div className="absolute top-full left-0 right-0 mt-2 z-[1001]">
        {isError && debouncedQuery.length > 2 && (
          <div className="bg-red-50 text-red-700 p-4 rounded-xl shadow-lg border border-red-100 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm">Erro ao buscar endereço. Verifique sua conexão.</span>
          </div>
        )}

        {results && results.length === 0 && debouncedQuery.length > 2 && !isLoading && (
          <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 text-gray-500 text-sm">
            Nenhum local encontrado para "{debouncedQuery}".
          </div>
        )}

        {results && results.length > 0 && query.length > 2 && (
          <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden max-h-72 overflow-y-auto divide-y divide-gray-50">
            {results.map((res) => (
              <button
                key={res.place_id}
                onClick={() => handleSelect(res)}
                className="w-full text-left px-5 py-4 hover:bg-blue-50/50 flex items-start gap-4 transition-colors group"
              >
                <div className="bg-blue-100 p-2 rounded-lg text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-gray-800 line-clamp-1">
                    {res.display_name.split(',')[0]}
                  </span>
                  <span className="text-xs text-gray-500 line-clamp-1">{res.display_name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
