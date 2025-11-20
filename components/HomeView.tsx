import React, { useState } from 'react';
import { Chapter } from '../types';
import { ChevronRight, Award, User } from 'lucide-react';

interface HomeViewProps {
  chapters: Chapter[];
  onSelectChapter: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ chapters, onSelectChapter }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="animate-fade-in pb-10">
      <div className="px-6 pt-8 pb-12 bg-official-900 text-white relative overflow-hidden">
        {/* Background Pattern decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="inline-block px-2 py-1 bg-accent-600 text-white text-[10px] font-bold uppercase tracking-wider rounded mb-3 shadow-sm">
            Manual Atualizado
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-2">Guia de Bolso</h2>
          <p className="text-official-200 leading-relaxed text-sm max-w-[80%]">
            Consulta rápida sobre normas de Redação Oficial da Presidência da República.
          </p>
        </div>
      </div>

      {/* Card da Autora - Inserido parcialmente sobre o header */}
      <div className="px-6 -mt-8 relative z-20 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-xl border border-gray-100 flex items-center gap-4">
          <div className="relative shrink-0">
            {/* Container da Imagem */}
            <div className="w-16 h-16 rounded-full border-2 border-accent-500 shadow-md bg-official-50 overflow-hidden relative group">
              {!imageError ? (
                <img 
                  src="./katia-profile.png" 
                  alt="Prof. Kátia Dantas" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  style={{ filter: 'contrast(1.05) saturate(1.1) sepia(0.1)' }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-official-100 text-official-300">
                  <User className="w-8 h-8" />
                </div>
              )}
            </div>
            
            {/* Badge de Verificado/Autoridade */}
            <div className="absolute -bottom-1 -right-1 bg-accent-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
              <Award className="w-3 h-3" />
            </div>
          </div>
          
          <div>
            <p className="text-[10px] font-bold text-accent-600 uppercase tracking-wider mb-0.5">Idealização e Conteúdo</p>
            <h3 className="font-serif font-bold text-official-900 text-lg leading-none mb-1">Kátia Dantas</h3>
            <p className="text-xs text-gray-500 leading-snug">Professora e Instrutora de Língua Portuguesa</p>
          </div>
        </div>
      </div>

      <div className="px-4">
        <h3 className="text-xs font-bold text-official-400 uppercase tracking-widest mb-4 px-2 flex items-center gap-2">
          <span className="w-1 h-1 rounded-full bg-accent-500"></span>
          Índice de Conteúdos
        </h3>
        <div className="space-y-3">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => onSelectChapter(chapter.id)}
              className="w-full bg-white p-4 rounded-lg border border-gray-200 shadow-sm active:scale-[0.98] transition-all flex items-center justify-between group hover:border-official-500 hover:shadow-md"
            >
              <div className="text-left pr-4">
                <h4 className="font-semibold text-official-900 mb-1 group-hover:text-official-700 transition-colors font-serif">
                  {chapter.title}
                </h4>
                <p className="text-xs text-gray-500 line-clamp-2">{chapter.description}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-accent-500 transition-colors" />
            </button>
          ))}
        </div>
      </div>
      
      <div className="mt-12 px-5 text-center pb-6">
        <div className="w-8 h-1 bg-official-200 mx-auto rounded-full mb-4"></div>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Versão Oficial 1.2</p>
      </div>
    </div>
  );
};