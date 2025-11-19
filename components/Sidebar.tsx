
import React from 'react';
import { Chapter } from '../types';
import { Book } from 'lucide-react';

interface SidebarProps {
  chapters: Chapter[];
  currentChapterId: string | null;
  onSelectChapter: (id: string) => void;
  onGoHome: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ chapters, currentChapterId, onSelectChapter, onGoHome }) => {
  return (
    <div className="w-full md:w-72 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0 z-20">
      <div className="p-6 border-b border-gray-100">
        <button onClick={onGoHome} className="flex items-center gap-3 hover:opacity-80 transition-opacity text-left">
          <div className="w-8 h-8 bg-official-900 rounded flex items-center justify-center shrink-0">
            <Book className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-gray-900 leading-tight">Redação Oficial</h1>
            <p className="text-xs text-gray-500">Guia Prático</p>
          </div>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4 px-2">Capítulos</p>
        <ul className="space-y-1">
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <button
                onClick={() => onSelectChapter(chapter.id)}
                className={`w-full text-left px-3 py-2.5 rounded text-sm transition-all duration-200 ${
                  currentChapterId === chapter.id
                    ? 'bg-gray-100 text-gray-900 font-semibold border-l-2 border-official-900 rounded-l-none'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {chapter.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-6 border-t border-gray-100 bg-gray-50/50">
        <div className="text-xs text-gray-400 leading-relaxed">
          Baseado no Manual de Redação da Presidência da República.
        </div>
      </div>
    </div>
  );
};
