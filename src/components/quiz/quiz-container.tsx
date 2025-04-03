'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizSetupCard from './quiz-setup-card';
import QuestionCard from './question-card';
import CountdownTimer from './quiz-timer';
import QuizResults from './quiz-results';
import { generateQuestions } from '@/app/actions/generateQuestions';
import { Button } from '@/components/ui/button';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  topic: string;
  difficulty: string;
  explanation?: string;
}

export default function QuizContainer() {
  const [quizConfig, setQuizConfig] = useState<{
    topic: string;
    questionCount: number;
    timeLimit: number;
    difficulty: string;
  } | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [timeUsed, setTimeUsed] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = async (config: {
    topic: string;
    questionCount: number;
    timeLimit: number;
    difficulty: string;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const generatedQuestions = await generateQuestions(
        config.topic,
        config.questionCount,
        config.difficulty
      );
      
      setQuestions(generatedQuestions);
      setQuizConfig(config);
      setSelectedOptions(Array(config.questionCount).fill(""));
      setQuizStarted(true);
      setTimeUsed(0);
    } catch (err) {
      console.error("Failed to generate questions:", err);
      setError("Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOptionSelect = (option: string) => {
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = option;
    setSelectedOptions(newSelectedOptions);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleTimeUp = () => {
    setTimeUsed(quizConfig?.timeLimit || 0);
    submitQuiz();
  };

  const handleTimeUpdate = (remainingSeconds: number) => {
    setTimeUsed((quizConfig?.timeLimit || 0) - remainingSeconds);
  };

  const submitQuiz = () => {
    setQuizCompleted(true);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setTimeUsed(0);
    setQuizConfig(null);
  };

  if (quizCompleted && quizConfig) {
    return (
      <QuizResults 
        questions={questions}
        selectedOptions={selectedOptions}
        timeUsed={timeUsed}
        timeLimit={quizConfig.timeLimit}
        onRestart={restartQuiz}
      />
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        {!quizStarted ? (
          <QuizSetupCard 
            onStartQuiz={handleStartQuiz} 
            isLoading={isLoading}
          />
        ) : (
          <motion.div
            key="quiz"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Question {currentQuestionIndex + 1} of {questions.length}
              </div>
              <CountdownTimer 
                initialSeconds={quizConfig?.timeLimit || 0}
                onTimeUp={handleTimeUp}
                onTimeUpdate={handleTimeUpdate}
              />
            </div>

            <QuestionCard
              question={questions[currentQuestionIndex].question}
              options={questions[currentQuestionIndex].options}
              selectedOption={selectedOptions[currentQuestionIndex]}
              onSelectOption={handleOptionSelect}
            />

            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              
              {currentQuestionIndex < questions.length - 1 ? (
                <Button onClick={handleNextQuestion}>Next</Button>
              ) : (
                <Button onClick={submitQuiz}>Submit Quiz</Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {error && (
        <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-lg">
          {error}
          <Button 
            variant="ghost" 
            className="mt-2"
            onClick={restartQuiz}
          >
            Try Again
          </Button>
        </div>
      )}
    </div>
  );
}