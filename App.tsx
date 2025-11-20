import React, { useState, useRef, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { ChapterView } from './components/ChapterView';
import { DEFAULT_CHAPTERS } from './constants';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentChapterId, setCurrentChapterId] = useState<string | null>(null);
  const [view, setView] = useState<AppView>(AppView.HOME);
  
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll to top whenever view changes
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTo(0, 0);
    }
  }, [view, currentChapterId]);

  const handleSelectChapter = (id: string) => {
    setCurrentChapterId(id);
    setView(AppView.CHAPTER);
  };

  const handleBack = () => {
    if (view === AppView.CHAPTER) {
      setView(AppView.HOME);
      setCurrentChapterId(null);
    }
  };

  const currentChapter = DEFAULT_CHAPTERS.find(c => c.id === currentChapterId);

  // Determina o título do cabeçalho
  let headerTitle = 'Guia de Bolso - Redação Oficial';
  if (view === AppView.CHAPTER && currentChapter) headerTitle = currentChapter.title;

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
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;