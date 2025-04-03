'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, RefreshCw } from "lucide-react";
import { useState } from "react";

interface QuizResultsProps {
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation?: string;
  }[];
  selectedOptions: string[];
  timeUsed: number;
  timeLimit: number;
  onRestart: () => void;
}

export default function QuizResults({
  questions,
  selectedOptions,
  timeUsed,
  timeLimit,
  onRestart,
}: QuizResultsProps) {
  const [viewMode, setViewMode] = useState<'summary' | 'review'>('summary');

  const correctAnswers = questions.reduce((count, question, index) => {
    return count + (selectedOptions[index] === question.correctAnswer ? 1 : 0);
  }, 0);

  const percentage = (correctAnswers / questions.length) * 100;
  const timePercentage = (timeUsed / timeLimit) * 100;

  const getResultBadge = (): { text: string; variant: "default" | "destructive" | "secondary" | "outline" | null | undefined } => {
      if (percentage >= 80) return { text: "Excellent!", variant: "default" };
      if (percentage >= 60) return { text: "Good Job!", variant: "secondary" };
      return { text: "Keep Practicing", variant: "destructive" };
  };

  const resultBadge = getResultBadge();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="w-full max-w-2xl mx-auto space-y-6"
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Quiz Results</CardTitle>
          <div className="flex justify-center">
            <Badge variant={resultBadge.variant}>
              {resultBadge.text}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Score</h3>
              <div className="text-3xl font-bold">
                {correctAnswers}/{questions.length}
              </div>
              <Progress value={percentage} className="h-2" />
              <div className="text-sm text-muted-foreground">
                {percentage.toFixed(1)}% correct
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-medium">Time</h3>
              <div className="text-3xl font-bold">
                {Math.floor(timeUsed / 60)}:{String(timeUsed % 60).padStart(2, '0')}
              </div>
              <Progress value={timePercentage} className="h-2" />
              <div className="text-sm text-muted-foreground">
                {Math.floor(timeLimit / 60)}:{String(timeLimit % 60).padStart(2, '0')} total
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant={viewMode === 'summary' ? 'default' : 'outline'}
              onClick={() => setViewMode('summary')}
              className="flex-1"
            >
              Summary
            </Button>
            <Button
              variant={viewMode === 'review' ? 'default' : 'outline'}
              onClick={() => setViewMode('review')}
              className="flex-1"
            >
              Review Mistakes
            </Button>
          </div>

          {viewMode === 'review' && (
            <div className="space-y-4">
              <h3 className="font-medium">Question Review</h3>
              {questions.map((question, index) => {
                if (selectedOptions[index] === question.correctAnswer) return null;
                
                return (
                  <div key={index} className="p-4 border rounded-lg">
                    <h4 className="font-medium">{question.question}</h4>
                    <div className="mt-2 space-y-1">
                      <div className="text-destructive">
        Your answer: {selectedOptions[index] || "Skipped"}
                      </div>
                      <div className="text-success">
        Correct answer: {question.correctAnswer}
                      </div>
                      {question.explanation && (
                        <div className="text-sm text-muted-foreground mt-2">
                          {question.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-center gap-2">
        <Button onClick={onRestart} className="gap-2">
          <RefreshCw className="w-4 h-4" />
          Retake Quiz
        </Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          New Quiz
        </Button>
      </div>
    </motion.div>
  );
}