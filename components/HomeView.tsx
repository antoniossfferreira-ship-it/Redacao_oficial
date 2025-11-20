import React from 'react';
import { Chapter } from '../types';
import { ChevronRight } from 'lucide-react';

interface HomeViewProps {
  chapters: Chapter[];
  onSelectChapter: (id: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ chapters, onSelectChapter }) => {
  return (
    <div className="animate-fade-in pb-10">
      <div className="px-6 py-8 bg-official-50 border-b border-official-100 mb-2">
        <div className="inline-block px-2 py-1 bg-official-200 text-official-900 text-[10px] font-bold uppercase tracking-wider rounded mb-3">
          Manual Atualizado
        </div>
        <h2 className="text-2xl font-serif font-bold text-official-900 mb-2">Guia de Bolso</h2>
        <p className="text-official-600 leading-relaxed text-sm">
          Consulta rápida sobre normas de Redação Oficial da Presidência da República.
        </p>
      </div>

      <div className="px-4 mt-6">
        <h3 className="text-xs font-bold text-official-400 uppercase tracking-widest mb-4 px-1">Índice de Conteúdos</h3>
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
      
      <div className="mt-10 px-5 text-center">
        <div className="w-8 h-1 bg-official-200 mx-auto rounded-full mb-4"></div>
        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Versão Oficial 1.1</p>
      </div>
    </div>
  );
};