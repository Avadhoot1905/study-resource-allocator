'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface QuizSetupCardProps {
  onStartQuiz: (config: {
    topic: string;
    questionCount: number;
    timeLimit: number;
    difficulty: string;
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
const difficultyOptions = ["Easy", "Medium", "Hard"];

export default function QuizSetupCard({ onStartQuiz, isLoading }: QuizSetupCardProps) {
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState(10);
  const [timeLimit, setTimeLimit] = useState(180);
  const [difficulty, setDifficulty] = useState("Medium");

  const handleStart = async () => {
    if (!topic.trim()) {
      alert("Please enter a quiz topic");
      return;
    }
    await onStartQuiz({
      topic,
      questionCount,
      timeLimit,
      difficulty: difficulty.toLowerCase(),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl space-y-8"
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">Create Your Quiz</h1>
        <p className="mt-2 text-muted-foreground">
          Customize your learning experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Topic Input */}
        <div className="space-y-2">
          <Label className="text-lg">What would you like to be quizzed on?</Label>
          <Input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter any topic (e.g., Quantum Physics, Renaissance Art)"
            className="text-lg py-6 px-4 border-2"
          />
        </div>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Question Count */}
          <div className="space-y-2">
            <Label className="text-lg">Number of Questions</Label>
            <Select
              value={questionCount.toString()}
              onValueChange={(v) => setQuestionCount(Number(v))}
            >
              <SelectTrigger className="h-12 text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {questionCountOptions.map((count) => (
                  <SelectItem key={count} value={count.toString()} className="text-lg">
                    {count}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <Label className="text-lg">Difficulty Level</Label>
            <Select
              value={difficulty}
              onValueChange={setDifficulty}
            >
              <SelectTrigger className="h-12 text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {difficultyOptions.map((level) => (
                  <SelectItem key={level} value={level} className="text-lg">
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Time Limit */}
          <div className="space-y-2">
            <Label className="text-lg">Time Limit</Label>
            <Select
              value={timeLimit.toString()}
              onValueChange={(v) => setTimeLimit(Number(v))}
            >
              <SelectTrigger className="h-12 text-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeLimitOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()} className="text-lg">
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="pt-4"
      >
        <Button
          onClick={handleStart}
          size="lg"
          className="w-full text-xl py-7 shadow-lg"
          disabled={!topic.trim() || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating Your Quiz...
            </span>
          ) : (
            "Start Learning →"
          )}
        </Button>
      </motion.div>
    </motion.div>
  );
}