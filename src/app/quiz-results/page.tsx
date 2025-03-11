'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RefreshCw, Share2 } from 'lucide-react';

const QuizResultPage: React.FC = () => {
    const router = useRouter();
    const score = 85; // Example score
    const totalQuestions = 100; // Example total questions
    const percentage = (score / totalQuestions) * 100;
    
    // Function to determine result message and badge color
    const getResultFeedback = () => {
        if (percentage >= 90) return { message: "Excellent!", color: "bg-green-500" };
        if (percentage >= 70) return { message: "Good job!", color: "bg-blue-500" };
        if (percentage >= 50) return { message: "Nice try!", color: "bg-yellow-500" };
        return { message: "Keep practicing!", color: "bg-red-500" };
    };
    
    const feedback = getResultFeedback();
    
    const handleRetakeQuiz = () => {
        router.push('/quizzes'); // Navigate to quiz setup page
    };
    
    const handleBackToHome = () => {
        router.push('/home'); // Navigate to home page
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center pb-2">
                    <Badge className={`${feedback.color} text-white mx-auto mb-2`}>
                        {feedback.message}
                    </Badge>
                    <CardTitle className="text-3xl">Quiz Results</CardTitle>
                    <CardDescription>You've completed the quiz!</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-6 pt-4">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-medium">Score:</span>
                        <span className="text-2xl font-bold">{score}/{totalQuestions}</span>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span>Percentage</span>
                            <span className="font-medium">{percentage.toFixed(1)}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-md">
                        <h3 className="font-semibold mb-2">Performance Summary</h3>
                        <ul className="space-y-1 text-sm">
                            <li className="flex justify-between">
                                <span>Correct Answers:</span>
                                <span>{score}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Incorrect Answers:</span>
                                <span>{totalQuestions - score}</span>
                            </li>
                            <li className="flex justify-between">
                                <span>Completion Time:</span>
                                <span>5:42</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
                
                <CardFooter className="flex-col space-y-2">
                    <Button 
                        onClick={handleRetakeQuiz} 
                        className="w-full"
                        variant="default"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Retake Quiz
                    </Button>
                    
                    <div className="flex w-full gap-2">
                        <Button 
                            onClick={handleBackToHome} 
                            variant="outline"
                            className="flex-1"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Home
                        </Button>
                        
                        <Button 
                            onClick={() => alert('Share feature would go here')} 
                            variant="outline"
                            className="flex-1"
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            Share Results
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default QuizResultPage;