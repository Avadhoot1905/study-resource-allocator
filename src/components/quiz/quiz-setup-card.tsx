'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface QuizSetupCardProps {
  onStartQuiz: (config: {
    topic: string;
    questionCount: number;
    timeLimit: number;
  }) => Promise<void>;
  isLoading: boolean;
}

const questionCountOptions = [5, 10, 15, 20];
const timeLimitOptions = [
  { value: 60, label: "1 minute" },
  { value: 120, label: "2 minutes" },
  { value: 180, label: "3 minutes" },
  { value: 300, label: "5 minutes" },
];

export default function QuizSetupCard({ onStartQuiz, isLoading }: QuizSetupCardProps) {
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(180); // 3 minutes default

  const handleStart = async () => {
    if (!topic.trim()) {
      alert("Please enter a quiz topic");
      return;
    }
    await onStartQuiz({
      topic,
      questionCount,
      timeLimit,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          type: "spring",
          stiffness: 500,
          damping: 30
        }
      }}
      exit={{ 
        opacity: 0,
        y: -50,
        transition: {
          duration: 0.3
        }
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Customize Your Quiz</h2>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="topic">Quiz Topic</Label>
            <Input
              id="topic"
              type="text"
              placeholder="Enter quiz topic (e.g., Science, History)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Number of Questions</Label>
            <Select
              value={questionCount.toString()}
              onValueChange={(value) => setQuestionCount(Number(value))}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select question count" />
              </SelectTrigger>
              <SelectContent>
                {questionCountOptions.map((count) => (
                  <SelectItem key={count} value={count.toString()}>
                    {count} questions
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Time Limit</Label>
            <Select
              value={timeLimit.toString()}
              onValueChange={(value) => setTimeLimit(Number(value))}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select time limit" />
              </SelectTrigger>
              <SelectContent>
                {timeLimitOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Button 
            onClick={handleStart}
            size="lg"
            className="px-8 py-4 text-lg w-full"
            disabled={!topic.trim() || isLoading}
          >
            {isLoading ? "Generating Questions..." : "Start Quiz"}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}