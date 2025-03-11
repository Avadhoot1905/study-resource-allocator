'use client';

import React, { useState } from 'react';
import SidebarMenu from '@/components/side';
import QuizSetupCard from '@/components/quiz-card';
import QuestionCard from '@/components/question-card';
import Timer from '@/components/quiz-timer';
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

    return (
        <SidebarProvider>
            <div className="flex min-h-screen bg-gray-100">
                <SidebarMenu />
                <div className="flex flex-col items-center w-full p-6 relative">
                    {!quizStarted ? (
                        <QuizSetupCard onStartQuiz={() => setQuizStarted(true)} />
                    ) : (
                        <>
                            <div className="absolute top-4 right-4">
                                <Timer initialTime={30} />
                            </div>
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
                        </>
                    )}
                </div>
            </div>
        </SidebarProvider>
    );
};

export default QuizzesPage;
