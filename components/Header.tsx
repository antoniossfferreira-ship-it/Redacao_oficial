import React from 'react';
import { ArrowLeft, Book } from 'lucide-react';

interface HeaderProps {
  title?: string;
  showBack: boolean;
  onBack: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, showBack, onBack }) => {
  return (
    <header className="sticky top-0 z-50 bg-official-900 text-white h-14 flex items-center px-4 justify-between shadow-md shrink-0">
      <div className="flex items-center gap-3 flex-1 overflow-hidden">
        {showBack ? (
          <button 
            onClick={onBack}
            className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-white/10 active:bg-white/20 transition-colors text-white"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-8 h-8 bg-official-800 border border-white/10 rounded flex items-center justify-center shadow-sm shrink-0">
            <Book className="w-4 h-4 text-accent-500" />
          </div>
        )}
        
        <h1 className={`font-semibold truncate ${showBack ? 'text-base' : 'text-lg font-serif tracking-wide text-gray-100'}`}>
          {title}
        </h1>
      </div>
    </header>
  );
};