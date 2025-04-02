'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuizSetupCard from './quiz-setup-card';
import QuestionCard from './question-card';
import CountdownTimer from './quiz-timer';
import { Button } from "@/components/ui/button";
import QuizResults from './quiz-results';
import { generateQuestions } from '@/app/actions/generateQuestions';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  topic: string;
}

export default function QuizContainer() {
  // Quiz configuration state
  const [quizConfig, setQuizConfig] = useState<{
    topic: string;
    questionCount: number;
    timeLimit: number;
  } | null>(null);

  // Quiz data state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
  // Quiz progress state
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  
  // Time tracking
  const [timeUsed, setTimeUsed] = useState(0);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Start quiz handler
  const handleStartQuiz = async (config: {
    topic: string;
    questionCount: number;
    timeLimit: number;
  }) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const generatedQuestions = await generateQuestions(
        config.topic,
        config.questionCount
      );
      
      setQuestions(generatedQuestions);
      setQuizConfig(config);
      setSelectedOptions(Array(config.questionCount).fill(""));
      setQuizStarted(true);
      setCurrentQuestionIndex(0);
    } catch (err) {
      console.error("Failed to generate questions:", err);
      setError("Failed to generate questions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Quiz navigation
  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setDirection(1);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setDirection(-1);
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  // Answer selection
  const handleOptionSelect = (option: string) => {
    const updatedOptions = [...selectedOptions];
    updatedOptions[currentQuestionIndex] = option;
    setSelectedOptions(updatedOptions);
  };

  // Time management
  const handleTimeUp = () => {
    setTimeUsed(quizConfig?.timeLimit || 0);
    submitQuiz();
  };

  const handleTimeUpdate = (seconds: number) => {
    setTimeUsed((quizConfig?.timeLimit || 0) - seconds);
  };

  // Quiz completion
  const submitQuiz = () => {
    setQuizCompleted(true);
  };

  const restartQuiz = () => {
    setQuizStarted(false);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedOptions([]);
    setTimeUsed(0);
    setQuizConfig(null);
    setQuestions([]);
  };

  // Animation variants
  const pageVariants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  // Render results if quiz is completed
  if (quizCompleted && quizConfig) {
    return (
      <QuizResults 
        questions={questions}
        selectedOptions={selectedOptions}
        timeUsed={timeUsed}
        onRestart={restartQuiz}
      />
    );
  }

  // Render error message if there was an error
  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4 text-center">
        <div className="text-red-500 mb-4">{error}</div>
        <Button onClick={restartQuiz}>Try Again</Button>
      </div>
    );
  }

  // Main render
  return (
    <div className="max-w-2xl mx-auto">
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
            exit={{ opacity: 0 }}
            className="mt-12"
          >
            {/* Timer */}
            {quizConfig && (
              <div className="absolute top-0 right-0 mb-4">
                <CountdownTimer 
                  initialSeconds={quizConfig.timeLimit} 
                  onTimeUp={handleTimeUp}
                  onTimeUpdate={handleTimeUpdate}
                  autoStart={true}
                  compact={true}
                />
              </div>
            )}

            {/* Questions */}
            <AnimatePresence initial={false} custom={direction} mode="wait">
              {questions.length > 0 && (
                <motion.div
                  key={currentQuestionIndex}
                  custom={direction}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <QuestionCard
                    question={questions[currentQuestionIndex].question}
                    options={questions[currentQuestionIndex].options}
                    selectedOption={selectedOptions[currentQuestionIndex]}
                    onSelectOption={handleOptionSelect}
                  />
                  
                  {/* Navigation buttons */}
                  <motion.div 
                    className="flex justify-between w-full mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {currentQuestionIndex > 0 && (
                      <Button 
                        onClick={handlePrevQuestion}
                        variant="outline"
                      >
                        Previous
                      </Button>
                    )}
                    <div className="ml-auto">
                      {currentQuestionIndex < questions.length - 1 ? (
                        <Button onClick={handleNextQuestion}>Next Question</Button>
                      ) : (
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button onClick={submitQuiz}>Submit Quiz</Button>
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Question progress indicators */}
            <motion.div 
              className="flex justify-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {questions.map((_, index) => (
                <motion.div
                  key={index}
                  className={`w-3 h-3 mx-1 rounded-full ${
                    currentQuestionIndex === index ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  whileHover={{ scale: 1.2 }}
                  animate={currentQuestionIndex === index ? 
                    { scale: [1, 1.2, 1], backgroundColor: "#3B82F6" } : 
                    { scale: 1, backgroundColor: "#D1D5DB" }
                  }
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    setDirection(index > currentQuestionIndex ? 1 : -1);
                    setCurrentQuestionIndex(index);
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}