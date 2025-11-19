
export interface Section {
  id: string;
  title: string;
  content: string;
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  sections: Section[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface QuizData {
  questions: QuizQuestion[];
}

export enum AppView {
  HOME = 'HOME',
  CHAPTER = 'CHAPTER',
  QUIZ = 'QUIZ'
}
