import React from 'react';
import { Chapter } from '../types';
import { ArrowRight } from 'lucide-react';

interface ChapterViewProps {
  chapter: Chapter;
  onStartQuiz: () => void;
  isGeneratingQuiz: boolean;
}

export const ChapterView: React.FC<ChapterViewProps> = ({ chapter, onStartQuiz, isGeneratingQuiz }) => {
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

      <div className="mt-12 px-6">
        <div className="bg-official-900 rounded-xl p-6 text-center shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-5 rounded-full"></div>
          
          <h3 className="text-base font-bold text-white mb-1 relative z-10">Fixação de Conteúdo</h3>
          <p className="text-official-300 text-xs mb-5 relative z-10">Teste seu conhecimento com questões geradas por IA.</p>
          
          <button
            onClick={onStartQuiz}
            disabled={isGeneratingQuiz}
            className="w-full relative z-10 flex items-center justify-center gap-2 bg-accent-600 hover:bg-accent-500 text-white font-medium py-3.5 px-4 rounded-lg transition-all disabled:opacity-70 active:scale-[0.98]"
          >
            {isGeneratingQuiz ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processando...</span>
              </>
            ) : (
              <>
                <span>Iniciar Quiz</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};