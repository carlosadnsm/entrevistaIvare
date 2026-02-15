
import React, { useState } from 'react';
import Map from './components/Map';
import Sidebar from './components/FavoriteList';
import SearchBar from './components/SearchBar';
import { Menu, X, Map as MapIcon, Layers } from 'lucide-react';

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Definimos a largura base para reutilizar no cálculo de padding do desktop
  const sidebarWidthClass = "w-[350px] max-w-[50vw]";

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 font-sans overflow-hidden">
      {/* Botão de Menu - Sempre visível para permitir fechar no desktop */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-5 left-5 z-[2000] p-4 bg-white rounded-2xl shadow-2xl border border-gray-100 hover:bg-gray-50 active:scale-95 transition-all text-blue-600"
        title={isSidebarOpen ? "Fechar Menu" : "Abrir Menu"}
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar - Com limite de 50vw e transição suave */}
      <aside
        className={`fixed inset-y-0 left-0 z-[1500] ${sidebarWidthClass} transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </aside>

      {/* Área Principal - Ajusta o padding dinamicamente no desktop quando a sidebar abre */}
      <main 
        className={`relative flex-1 flex flex-col min-w-0 h-full transition-all duration-500 ease-in-out ${
          isSidebarOpen ? 'lg:pl-[350px]' : 'lg:pl-0'
        }`}
      >
        {/* Barra de Busca Flutuante */}
        <div className="absolute top-6 left-0 right-0 z-[1000] px-4 pointer-events-none flex justify-center">
          <div className="pointer-events-auto w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        {/* Branding Flutuante */}
        <div className="absolute bottom-8 right-8 z-[1000] pointer-events-none hidden md:block">
           <div className="pointer-events-auto bg-white/90 backdrop-blur-md shadow-2xl border border-white/50 px-5 py-3 rounded-2xl flex items-center gap-4 transition-transform hover:scale-105">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                    <MapIcon className="w-5 h-5 text-white" />
                 </div>
                 <div className="flex flex-col">
                    <span className="text-sm font-black text-gray-900 leading-none">MapLocs</span>
                    <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider">Favoritos</span>
                 </div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[10px] font-bold text-gray-400">ONLINE</span>
              </div>
           </div>
        </div>

        {/* Componente de Mapa */}
        <div className="flex-1 w-full h-full grayscale-[0.2] contrast-[1.1]">
          <Map isSidebarOpen={isSidebarOpen} />
        </div>
        
        {/* Dica de Uso */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[1000] pointer-events-none">
           <div className="bg-gray-900/80 backdrop-blur px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[11px] text-white font-medium">Clique no mapa para salvar um local</span>
           </div>
        </div>
      </main>

      {/* Overlay de fecho rápido (funciona em Desktop e Mobile) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-[2px] z-[1400] transition-opacity duration-500 lg:bg-transparent lg:backdrop-blur-0"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default App;
