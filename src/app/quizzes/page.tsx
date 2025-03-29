'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SidebarMenu from '@/components/side';
import QuizSetupCard from '@/components/quiz-card';
import QuestionCard from '@/components/question-card';
import CountdownTimer from '@/components/quiz-timer';
import SubmitButton from '@/components/submit';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

// Question data - in a real app, this might come from an API or data fetching
const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"] },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"] },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
];

export default function QuizzesPage() {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(questions.length).fill(""));
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward

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

    const handleOptionSelect = (option: string) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions[currentQuestionIndex] = option;
        setSelectedOptions(updatedOptions);
    };

    const handleTimeUp = () => {
        // Auto-submit when time runs out
        console.log("Time's up! Submitting quiz...");
        // Add your submission logic here
    };

    // Animation variants for question transitions
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

    // Setup card animation variants
    const setupCardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                type: "spring",
                stiffness: 500,
                damping: 30
            }
        },
        exit: { 
            opacity: 0,
            y: -50,
            transition: {
                duration: 0.3
            }
        }
    };

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden">
                <SidebarMenu />
                <main className="flex-1 p-6 overflow-auto">
                    <motion.div 
                        className="relative"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl font-bold mb-6">Quizzes</h1>
                        
                        {quizStarted && (
                            <motion.div 
                                className="absolute top-0 right-0"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.3, duration: 0.4 }}
                            >
                                <CountdownTimer 
                                    initialMinutes={0} 
                                    initialSeconds={30} 
                                    onTimeUp={handleTimeUp}
                                    autoStart={true}
                                    compact={true}
                                />
                            </motion.div>
                        )}
                    </motion.div>

                    <div className="max-w-2xl mx-auto">
                        <AnimatePresence mode="wait">
                            {!quizStarted ? (
                                <motion.div 
                                    key="setup"
                                    variants={setupCardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <QuizSetupCard onStartQuiz={() => setQuizStarted(true)} />
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="quiz"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="mt-12"
                                >
                                    <AnimatePresence initial={false} custom={direction} mode="wait">
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
                                                            <SubmitButton />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </motion.div>
                                        </motion.div>
                                    </AnimatePresence>
                                    
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
                </main>
            </div>
        </SidebarProvider>
    );
}