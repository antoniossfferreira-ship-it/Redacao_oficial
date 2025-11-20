import React from 'react';
import { Chapter } from '../types';

interface ChapterViewProps {
  chapter: Chapter;
}

export const ChapterView: React.FC<ChapterViewProps> = ({ chapter }) => {
  return (
    <div className="animate-fade-in pb-20">
      <div className="px-6 py-6 bg-official-50 border-b border-official-100">
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