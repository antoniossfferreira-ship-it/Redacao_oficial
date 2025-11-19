
import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Sidebar } from './components/Sidebar';
import { ChapterView } from './components/ChapterView';
import { QuizModule } from './components/QuizModule';
import { DEFAULT_CHAPTERS } from './constants';
import { AppView, QuizData } from './types';
import { generateQuizForChapter } from './services/geminiService';
import { BookOpen, ChevronRight } from 'lucide-react';

const App: React.FC = () => {
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const handleSelectChapter = (id: string) => {
    setCurrentChapterId(id);
    setView(AppView.CHAPTER);
    setQuizData(null); 
  };

  const handleGoHome = () => {
    setCurrentChapterId(null);
    setView(AppView.HOME);
  };

  const handleStartQuiz = async () => {
    if (!currentChapterId) return;

    const chapter = DEFAULT_CHAPTERS.find(c => c.id === currentChapterId);
    if (!chapter) return;

    setIsGeneratingQuiz(true);
    
    const context = chapter.sections.map(s => s.content).join("\n\n");
    const data = await generateQuizForChapter(chapter.title, context);
    
    setIsGeneratingQuiz(false);
    
    if (data) {
      setQuizData(data);
      setView(AppView.QUIZ);
    } else {
      alert("Ocorreu um erro ao gerar o quiz.");
    }
  };

  const handleCloseQuiz = () => {
    setView(AppView.CHAPTER);
    setQuizData(null);
  };

  const currentChapter = DEFAULT_CHAPTERS.find(c => c.id === currentChapterId);

  return (
    <div className="flex min-h-screen bg-white text-gray-900 font-sans">
      <Sidebar 
        chapters={DEFAULT_CHAPTERS} 
        currentChapterId={currentChapterId} 
        onSelectChapter={handleSelectChapter}
        onGoHome={handleGoHome}
      />

      <main className="flex-1 md:ml-72 p-8 md:p-16 transition-all">
        {view === AppView.HOME && (
          <div className="max-w-2xl mx-auto animate-fade-in">
            <div className="mb-16 pb-8 border-b border-gray-200">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-6">
                 <BookOpen className="w-6 h-6 text-gray-700" />
              </div>
              <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Guia de Redação Oficial</h1>
              <p className="text-xl text-gray-500 font-light leading-relaxed">
                Um recurso conciso e prático para servidores e profissionais, focado nas normas atuais da Presidência da República.
              </p>
            </div>

            <div>
              <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Índice de Conteúdos</h2>
              <div className="space-y-6">
                 {DEFAULT_CHAPTERS.map(chapter => (
                   <button 
                      key={chapter.id}
                      onClick={() => handleSelectChapter(chapter.id)}
                      className="group w-full text-left flex items-baseline justify-between py-4 border-b border-gray-100 hover:border-gray-300 transition-colors"
                   >
                      <div className="pr-8">
                        <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-official-700 transition-colors">
                          {chapter.title}
                        </h3>
                        <p className="text-gray-500 text-sm font-light">{chapter.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-official-700 opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                   </button>
                 ))}
              </div>
            </div>
          </div>
        )}

        {view === AppView.CHAPTER && currentChapter && (
          <ChapterView 
            chapter={currentChapter} 
            onStartQuiz={handleStartQuiz}
            isGeneratingQuiz={isGeneratingQuiz}
          />
        )}

        {view === AppView.QUIZ && quizData && (
          <QuizModule 
            data={quizData} 
            onClose={handleCloseQuiz} 
          />
        )}
      </main>
    </div>
  );
};

export default App;
