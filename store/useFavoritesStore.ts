
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Location } from '../types';

interface FavoritesState {
  favorites: Location[];
  selectedLocation: Location | null;
  addFavorite: (location: Omit<Location, 'id' | 'createdAt'>) => void;
  removeFavorite: (id: string) => void;
  setSelectedLocation: (location: Location | null) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      selectedLocation: null,
      addFavorite: (loc) => set((state) => ({
        favorites: [
          ...state.favorites,
          {
            ...loc,
            id: crypto.randomUUID(),
            createdAt: Date.now()
          }
        ]
      })),
      removeFavorite: (id) => set((state) => ({
        favorites: state.favorites.filter((f) => f.id !== id)
      })),
      setSelectedLocation: (loc) => set({ selectedLocation: loc }),
    }),
    {
      name: 'locais-favoritos-storage',
    }
  )
);
