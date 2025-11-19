
import React from 'react';
import { Chapter } from '../types';
import { GraduationCap, ArrowRight } from 'lucide-react';

interface ChapterViewProps {
  chapter: Chapter;
  onStartQuiz: () => void;
  isGeneratingQuiz: boolean;
}

export const ChapterView: React.FC<ChapterViewProps> = ({ chapter, onStartQuiz, isGeneratingQuiz }) => {
  return (
    <div className="max-w-2xl mx-auto pb-32 animate-fade-in">
      <header className="mb-12 pt-4">
        <span className="text-sm font-medium text-official-700 tracking-widest uppercase block mb-3">Documentação</span>
        <h2 className="text-4xl font-serif font-bold text-gray-900 mb-4 leading-tight">{chapter.title}</h2>
        <p className="text-xl text-gray-500 font-light leading-relaxed border-l-4 border-gray-200 pl-4">
          {chapter.description}
        </p>
      </header>

      <div className="space-y-16">
        {chapter.sections.map((section) => (
          <section key={section.id} className="group">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-baseline gap-3 border-b border-gray-100 pb-2">
              {section.title}
            </h3>
            
            <div className="prose prose-slate prose-lg max-w-none text-gray-700 leading-relaxed">
               {section.content.split('\n').map((line, i) => (
                  line.trim() ? <p key={i} className="mb-4">{line}</p> : null
               ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-20 pt-10 border-t border-gray-200">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">Fixação de Conteúdo</h3>
            <p className="text-gray-600 text-sm">Avalie seu conhecimento sobre este capítulo.</p>
          </div>
          
          <button
            onClick={onStartQuiz}
            disabled={isGeneratingQuiz}
            className="shrink-0 inline-flex items-center gap-3 bg-white border border-gray-300 text-gray-900 hover:border-official-700 hover:text-official-700 font-medium py-2.5 px-6 rounded transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGeneratingQuiz ? (
              <>
                <svg className="animate-spin h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-sm">Preparando Quiz...</span>
              </>
            ) : (
              <>
                <span className="text-sm">Iniciar Avaliação</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
