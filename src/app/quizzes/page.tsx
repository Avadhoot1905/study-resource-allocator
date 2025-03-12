'use client';

import React, { useState } from 'react';
import SidebarMenu from '@/components/side';
import QuizSetupCard from '@/components/quiz-card';
import QuestionCard from '@/components/question-card';
import CountdownTimer from '@/components/quiz-timer'; // Import the new timer component
import SubmitButton from '@/components/submit';
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";

const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"] },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"] },
    { question: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
];

const QuizzesPage: React.FC = () => {
    const [quizStarted, setQuizStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState<string[]>(Array(questions.length).fill(""));

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
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

    return (
        <SidebarProvider>
            <div className="flex h-screen w-full overflow-hidden">
                <SidebarMenu />
                <main className="flex-1 p-6 overflow-auto">
                    <div className="relative">
                        <h1 className="text-4xl font-bold mb-6">Quizzes</h1>
                        
                        {quizStarted && (
                            <div className="absolute top-0 right-0">
                                <CountdownTimer 
                                    initialMinutes={0} 
                                    initialSeconds={30} 
                                    onTimeUp={handleTimeUp}
                                    autoStart={true}
                                    compact={true}
                                />
                            </div>
                        )}
                    </div>

                    <div className="max-w-2xl mx-auto">
                        {!quizStarted ? (
                            <QuizSetupCard onStartQuiz={() => setQuizStarted(true)} />
                        ) : (
                            <div className="mt-12">
                                <QuestionCard
                                    key={currentQuestionIndex}
                                    question={questions[currentQuestionIndex].question}
                                    options={questions[currentQuestionIndex].options}
                                    selectedOption={selectedOptions[currentQuestionIndex]}
                                    onSelectOption={handleOptionSelect}
                                />
                                <div className="flex justify-end w-full mt-4">
                                    {currentQuestionIndex < questions.length - 1 ? (
                                        <Button onClick={handleNextQuestion}>Next Question</Button>
                                    ) : (
                                        <SubmitButton />
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </SidebarProvider>
    );
};

export default QuizzesPage;