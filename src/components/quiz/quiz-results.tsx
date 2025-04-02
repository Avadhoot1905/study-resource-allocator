'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, RefreshCw, Share2 } from 'lucide-react';

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizResultsProps {
  questions: Question[];
  selectedOptions: string[];
  timeUsed: number;
  onRestart: () => void;
}

export default function QuizResults({ questions, selectedOptions, timeUsed, onRestart }: QuizResultsProps) {
  const calculateResults = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedOptions[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    return {
      score: correctAnswers,
      totalQuestions: questions.length,
      percentage: (correctAnswers / questions.length) * 100,
      timeUsed: timeUsed
    };
  };

  const { score, totalQuestions, percentage, timeUsed: finalTime } = calculateResults();
  const minutes = Math.floor(finalTime / 60);
  const seconds = finalTime % 60;
  const timeString = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const getResultFeedback = (percentage: number) => {
    if (percentage >= 90) return { message: "Excellent!", color: "bg-green-500" };
    if (percentage >= 70) return { message: "Good job!", color: "bg-blue-500" };
    if (percentage >= 50) return { message: "Nice try!", color: "bg-yellow-500" };
    return { message: "Keep practicing!", color: "bg-red-500" };
  };

  const feedback = getResultFeedback(percentage);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.8 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.1,
        duration: 0.5
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: 1 + (custom * 0.1),
        duration: 0.3
      }
    }),
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      className="w-full"
    >
      <Card className="shadow-lg overflow-hidden">
        <CardHeader className="text-center pb-2 relative">
          <motion.div
            variants={itemVariants}
            custom={0}
            className="flex justify-center mb-2"
          >
            <Badge className={`${feedback.color} text-white`}>
              {feedback.message}
            </Badge>
          </motion.div>
          <motion.div
            variants={itemVariants}
            custom={1}
          >
            <CardTitle className="text-3xl">Quiz Results</CardTitle>
          </motion.div>
          <motion.div
            variants={itemVariants}
            custom={2}
          >
            <CardDescription>You've completed the quiz!</CardDescription>
          </motion.div>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-4">
          <motion.div 
            className="flex justify-between items-center"
            variants={itemVariants}
            custom={3}
          >
            <span className="text-lg font-medium">Score:</span>
            <motion.span 
              className="text-2xl font-bold"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: 1,
                transition: { delay: 0.5, duration: 0.5 }
              }}
            >
              {score}/{totalQuestions}
            </motion.span>
          </motion.div>
          
          <motion.div 
            className="space-y-2"
            variants={itemVariants}
            custom={4}
          >
            <div className="flex justify-between text-sm">
              <span>Percentage</span>
              <motion.span 
                className="font-medium"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 0.7, duration: 0.5 }
                }}
              >
                {percentage.toFixed(1)}%
              </motion.span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full ${feedback.color}`}
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.6 }}
              />
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-gray-50 p-4 rounded-md"
            variants={itemVariants}
            custom={5}
          >
            <h3 className="font-semibold mb-2">Performance Summary</h3>
            <ul className="space-y-1 text-sm">
              <motion.li 
                className="flex justify-between"
                variants={itemVariants}
                custom={6}
              >
                <span>Correct Answers:</span>
                <span>{score}</span>
              </motion.li>
              <motion.li 
                className="flex justify-between"
                variants={itemVariants}
                custom={7}
              >
                <span>Incorrect Answers:</span>
                <span>{totalQuestions - score}</span>
              </motion.li>
              <motion.li 
                className="flex justify-between"
                variants={itemVariants}
                custom={8}
              >
                <span>Completion Time:</span>
                <span>{timeString}</span>
              </motion.li>
            </ul>
          </motion.div>
        </CardContent>
        
        <CardFooter className="flex-col space-y-2">
          <motion.div
            variants={buttonVariants}
            custom={0}
            whileHover="hover"
            whileTap="tap"
            className="w-full"
          >
            <Button 
              onClick={onRestart} 
              className="w-full"
              variant="default"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          </motion.div>
          
          <div className="flex w-full gap-2">
            <motion.div
              variants={buttonVariants}
              custom={1}
              whileHover="hover"
              whileTap="tap"
              className="flex-1"
            >
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Quiz Page
              </Button>
            </motion.div>
            
            <motion.div
              variants={buttonVariants}
              custom={2}
              whileHover="hover"
              whileTap="tap"
              className="flex-1"
            >
              <Button 
                onClick={() => alert('Share feature would go here')} 
                variant="outline"
                className="w-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}