import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ChapterView } from './components/ChapterView';
import { QuizModule } from './components/QuizModule';
import { DEFAULT_CHAPTERS } from './constants';
import { AppView, QuizData } from './types';
import { generateQuizForChapter } from './services/geminiService';

const App: React.FC = () => {
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
  
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever view changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [view, currentChapterId, quizData]);

  const handleSelectChapter = (id: string) => {
    setCurrentChapterId(id);
    setView(AppView.CHAPTER);
    setQuizData(null); 
  };

  const handleBack = () => {
    if (view === AppView.QUIZ) {
      setView(AppView.CHAPTER);
      setQuizData(null);
    } else if (view === AppView.CHAPTER) {
      setView(AppView.HOME);
      setCurrentChapterId(null);
    }
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
      alert("Ocorreu um erro ao processar a resposta da IA. Por favor, tente novamente em alguns instantes. Se o erro persistir, verifique a configuração da Chave de API.");
    }
  };

  const handleCloseQuiz = () => {
    setView(AppView.CHAPTER);
    setQuizData(null);
  };

  const currentChapter = DEFAULT_CHAPTERS.find(c => c.id === currentChapterId);

  // Determina o título do cabeçalho
  let headerTitle = 'Guia de Bolso - Redação Oficial';
  if (view === AppView.QUIZ) headerTitle = 'Avaliação de Conhecimento';
  else if (view === AppView.CHAPTER && currentChapter) headerTitle = currentChapter.title;

  return (
    <div className="h-[100dvh] w-full bg-gray-100 flex justify-center overflow-hidden">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col relative">
        <Header 
          title={headerTitle}
          showBack={view !== AppView.HOME}
          onBack={handleBack}
        />

        <main 
          ref={mainRef}
          className="flex-1 overflow-y-auto overflow-x-hidden bg-white scroll-smooth"
        >
          {view === AppView.HOME && (
            <HomeView 
              chapters={DEFAULT_CHAPTERS} 
              onSelectChapter={handleSelectChapter} 
            />
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
    </div>
  );
};

export default App;