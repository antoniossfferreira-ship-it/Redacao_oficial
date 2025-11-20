import React from 'react';
import { Chapter } from '../types';
import { CheckCircle2 } from 'lucide-react';

interface ChapterViewProps {
  chapter: Chapter;
}

export const ChapterView: React.FC<ChapterViewProps> = ({ chapter }) => {
  return (
    <div className="animate-fade-in pb-20">
      <div className="px-6 py-6 bg-official-50 border-b border-official-100">
        {/* Selo de Autoria no Capítulo */}
        <div className="flex items-center gap-2 mb-4 opacity-90">
          <div className="w-5 h-5 rounded-full bg-official-900 text-white flex items-center justify-center text-[9px] font-bold font-serif shadow-sm">
            KD
          </div>
          <span className="text-[10px] uppercase tracking-wide font-bold text-official-600">
            Conteúdo elaborado por Prof. Kátia Dantas
          </span>
          <CheckCircle2 className="w-3 h-3 text-accent-500 ml-auto" />
        </div>

        <p className="text-base text-official-700 font-light leading-relaxed">
          {chapter.description}
        </p>
      </div>

      <div className="px-6 pt-8 space-y-10">
        {chapter.sections.map((section) => (
          <section key={section.id}>
            <h3 className="text-lg font-serif font-bold text-official-900 mb-3 pb-2 border-b border-official-100">
              {section.title}
            </h3>
            
            <div className="text-gray-700 leading-7 text-[15px] space-y-3 text-justify">
               {section.content.split('\n').map((line, i) => (
                  line.trim() ? <p key={i} className={line.startsWith('•') ? 'pl-2 text-official-800' : ''}>{line}</p> : null
               ))}
            </div>
          </section>
        ))}
      </div>
      
      {/* Rodapé decorativo do capítulo */}
      <div className="mt-12 flex justify-center pb-6 opacity-30">
        <div className="w-16 h-1 bg-official-900 rounded-full"></div>
      </div>
    </div>
  );
};