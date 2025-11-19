import React, { useState } from 'react';
import { QuizData } from '../types';
import { Check, X, RefreshCw, ArrowRight, Trophy } from 'lucide-react';

interface QuizModuleProps {
  data: QuizData;
  onClose: () => void;
}

export const QuizModule: React.FC<QuizModuleProps> = ({ data, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQuestion = data.questions[currentIndex];
  const isLastQuestion = currentIndex === data.questions.length - 1;

  const handleOptionClick = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
  };

  const confirmAnswer = () => {
    if (selectedOption === null) return;
    
    if (selectedOption === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 1);
    }
    setShowFeedback(true);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      setCompleted(true);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowFeedback(false);
    }
  };

  if (completed) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 animate-fade-in text-center bg-official-50">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg border-4 border-official-100">
          <Trophy className="w-12 h-12 text-accent-500" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-official-900 mb-2">Resultado Final</h2>
        <p className="text-official-600 mb-8">
          Você acertou <span className="font-bold text-official-900 text-lg">{score}</span> de {data.questions.length} questões.
        </p>
        
        <div className="w-full max-w-xs bg-gray-200 h-3 mb-8 rounded-full overflow-hidden">
          <div 
            className="bg-official-900 h-full transition-all duration-1000" 
            style={{ width: `${(score / data.questions.length) * 100}%` }}
          ></div>
        </div>

        <button 
          onClick={onClose}
          className="w-full max-w-xs flex items-center justify-center gap-2 bg-official-900 text-white py-3.5 rounded-lg font-medium active:scale-95 transition-all shadow-lg shadow-official-900/20"
        >
          <RefreshCw className="w-4 h-4" />
          Concluir e Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-5 animate-fade-in bg-white">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-8 mt-2">
        <span className="text-xs font-bold text-official-900 w-8">
          Q{currentIndex + 1}
        </span>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / data.questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-medium text-gray-400 w-8 text-right">
          {data.questions.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <h3 className="text-lg font-serif font-bold text-official-900 leading-snug mb-6">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            let cardClass = "w-full text-left p-4 rounded-lg border text-[15px] transition-all relative flex items-start gap-3 active:scale-[0.99] ";
            
            if (showFeedback) {
              if (idx === currentQuestion.correctAnswerIndex) {
                cardClass += "border-green-300 bg-green-50 text-green-900 font-medium";
              } else if (idx === selectedOption) {
                cardClass += "border-red-200 bg-red-50 text-red-900";
              } else {
                cardClass += "border-gray-100 text-gray-400 opacity-50";
              }
            } else {
              if (selectedOption === idx) {
                cardClass += "border-official-900 bg-official-50 text-official-900 font-medium shadow-md ring-1 ring-official-900";
              } else {
                cardClass += "border-gray-200 text-gray-700 bg-white hover:bg-gray-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionClick(idx)}
                disabled={showFeedback}
                className={cardClass}
              >
                 <div className={`w-5 h-5 rounded-full border shrink-0 flex items-center justify-center mt-0.5 transition-colors ${
                   selectedOption === idx || (showFeedback && idx === currentQuestion.correctAnswerIndex)
                   ? 'border-current'
                   : 'border-gray-300'
                 }`}>
                    {(selectedOption === idx || (showFeedback && idx === currentQuestion.correctAnswerIndex)) && (
                      <div className="w-2.5 h-2.5 rounded-full bg-current" />
                    )}
                 </div>
                <span className="flex-1 leading-snug">{option}</span>
                {showFeedback && idx === currentQuestion.correctAnswerIndex && <Check className="w-5 h-5 text-green-600 shrink-0" />}
                {showFeedback && idx === selectedOption && idx !== currentQuestion.correctAnswerIndex && <X className="w-5 h-5 text-red-600 shrink-0" />}
              </button>
            );
          })}
        </div>

        {showFeedback && (
          <div className="mt-6 p-5 bg-official-50 rounded-lg border border-official-100 text-sm text-gray-700 animate-fade-in">
            <p className="font-bold text-official-900 mb-1 text-xs uppercase tracking-wide">Explicação</p>
            <p className="leading-relaxed">{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur border-t border-gray-100 flex justify-center z-10">
        <div className="w-full max-w-md">
          {!showFeedback ? (
            <button
              onClick={confirmAnswer}
              disabled={selectedOption === null}
              className="w-full bg-official-900 text-white py-3.5 rounded-lg font-medium shadow-lg shadow-official-900/20 disabled:opacity-50 disabled:shadow-none transition-all active:scale-[0.98]"
            >
              Confirmar Resposta
            </button>
          ) : (
            <button
              onClick={nextQuestion}
              className="w-full bg-official-900 text-white py-3.5 rounded-lg font-medium shadow-lg shadow-official-900/20 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isLastQuestion ? "Ver Resultado" : "Próxima Questão"}
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};