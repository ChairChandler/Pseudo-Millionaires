export interface QuestionModel {
    category: string;
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}