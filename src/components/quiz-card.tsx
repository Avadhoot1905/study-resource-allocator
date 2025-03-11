'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// Define props type for Quiz Setup
interface QuizSetupCardProps {
  onStartQuiz: () => void;
}

const QuizSetupCard: React.FC<QuizSetupCardProps> = ({ onStartQuiz }) => {
  const [questions, setQuestions] = useState("10");
  const [time, setTime] = useState("10 minutes");
  const [topic, setTopic] = useState("General Knowledge");

  const handleStartClick = () => {
    // You can still collect the quiz details here if needed
    const quizDetails = { questions, time, topic };
    console.log("Starting quiz with settings:", quizDetails);
    onStartQuiz();
  };

  return (
    <Card className="w-96 p-4 shadow-md">
      <CardHeader>
        <CardTitle>Quiz Setup</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Number of Questions */}
        <div>
          <p className="mb-2 font-semibold">Number of Questions</p>
          <Select onValueChange={setQuestions} defaultValue={questions}>
            <SelectTrigger>
              <SelectValue placeholder="Select number of questions" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 15, 20].map((num) => (
                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Time Limit */}
        <div>
          <p className="mb-2 font-semibold">Time Limit</p>
          <Select onValueChange={setTime} defaultValue={time}>
            <SelectTrigger>
              <SelectValue placeholder="Select time limit" />
            </SelectTrigger>
            <SelectContent>
              {["5 minutes", "10 minutes", "15 minutes", "20 minutes"].map((t) => (
                <SelectItem key={t} value={t}>{t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Topic Selection */}
        <div>
          <p className="mb-2 font-semibold">Topic</p>
          <Select onValueChange={setTopic} defaultValue={topic}>
            <SelectTrigger>
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              {["General Knowledge", "Math", "Science", "History"].map((top) => (
                <SelectItem key={top} value={top}>{top}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full mt-4" onClick={handleStartClick}>
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
};

export default QuizSetupCard;