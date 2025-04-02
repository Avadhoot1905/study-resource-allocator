'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define props for Question Card
interface QuestionCardProps {
  question: string;
  options: string[];
  selectedOption: string;
  onSelectOption: (selectedOption: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  options, 
  selectedOption, 
  onSelectOption 
}) => {
  return (
    <Card className="w-96 p-4 shadow-md">
      <CardHeader>
        <CardTitle>{question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {options.map((option) => (
          <Button 
            key={option} 
            className={`w-full ${selectedOption === option ? 'bg-blue-600' : ''}`} 
            onClick={() => onSelectOption(option)}
          >
            {option}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};

export default QuestionCard;