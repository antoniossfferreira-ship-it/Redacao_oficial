
import React, { useState } from 'react';
import { QuizData } from '../types';
import { Check, X, RefreshCw, ArrowRight, ListChecks } from 'lucide-react';

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
      <div className="max-w-xl mx-auto pt-12 animate-fade-in">
        <div className="bg-white rounded border border-gray-200 p-10 text-center">
          <div className="inline-block p-3 bg-gray-100 rounded-full mb-6">
            <ListChecks className="w-8 h-8 text-gray-700" />
          </div>
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Avaliação Concluída</h2>
          <p className="text-gray-600 mb-8">
            Resultado: <span className="font-bold text-gray-900">{score}</span> de {data.questions.length} acertos.
          </p>
          
          <div className="w-full bg-gray-100 h-2 mb-8 rounded-full overflow-hidden">
            <div 
              className="bg-official-700 h-full" 
              style={{ width: `${(score / data.questions.length) * 100}%` }}
            ></div>
          </div>

          <button 
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-medium text-official-700 hover:text-official-900 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Retornar ao conteúdo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto pt-8 animate-fade-in">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-8 text-xs text-gray-400 uppercase tracking-wider font-medium">
        <span>Questão {currentIndex + 1} / {data.questions.length}</span>
        <span>Pontuação Atual: {score}</span>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-900 leading-relaxed">{currentQuestion.question}</h3>
      </div>

      <div className="space-y-3">
        {currentQuestion.options.map((option, idx) => {
          let cardClass = "w-full text-left p-4 rounded border text-sm transition-all relative flex items-start gap-3 ";
          
          if (showFeedback) {
            if (idx === currentQuestion.correctAnswerIndex) {
              cardClass += "border-green-200 bg-green-50 text-green-900";
            } else if (idx === selectedOption) {
              cardClass += "border-red-200 bg-red-50 text-red-900";
            } else {
              cardClass += "border-gray-100 text-gray-400 opacity-60";
            }
          } else {
            if (selectedOption === idx) {
              cardClass += "border-official-900 bg-gray-50 text-gray-900";
            } else {
              cardClass += "border-gray-200 hover:border-gray-400 text-gray-700 hover:bg-gray-50";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={showFeedback}
              className={cardClass}
            >
              <div className={`w-4 h-4 mt-0.5 rounded-full border shrink-0 flex items-center justify-center ${
                 selectedOption === idx || (showFeedback && idx === currentQuestion.correctAnswerIndex) 
                 ? 'border-current' 
                 : 'border-gray-300'
              }`}>
                {(selectedOption === idx || (showFeedback && idx === currentQuestion.correctAnswerIndex)) && (
                   <div className="w-2 h-2 rounded-full bg-current" />
                )}
              </div>
              
              <span className="flex-1 leading-relaxed">{option}</span>
              
              {showFeedback && idx === currentQuestion.correctAnswerIndex && (
                <Check className="w-4 h-4 text-green-600 shrink-0" />
              )}
              {showFeedback && idx === selectedOption && idx !== currentQuestion.correctAnswerIndex && (
                <X className="w-4 h-4 text-red-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {showFeedback && (
        <div className="mt-8 p-5 bg-gray-50 border-l-2 border-gray-300 text-gray-700 text-sm leading-relaxed">
          <p className="font-semibold text-gray-900 mb-2">Análise:</p>
          {currentQuestion.explanation}
        </div>
      )}

      <div className="mt-10 flex justify-end border-t border-gray-100 pt-6">
        {!showFeedback ? (
          <button
            onClick={confirmAnswer}
            disabled={selectedOption === null}
            className="bg-gray-900 text-white px-6 py-2.5 rounded text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black transition-colors"
          >
            Confirmar
          </button>
        ) : (
          <button
            onClick={nextQuestion}
            className="bg-official-700 text-white px-6 py-2.5 rounded text-sm font-medium hover:bg-official-800 transition-colors flex items-center gap-2"
          >
            {isLastQuestion ? "Ver Resultado" : "Próxima"}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
