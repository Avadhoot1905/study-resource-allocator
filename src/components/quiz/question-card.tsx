'use client';

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedOption: string;
  onSelectOption: (option: string) => void;
}

export default function QuestionCard({
  question,
  options,
  selectedOption,
  onSelectOption,
}: QuestionCardProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-medium">{question}</h2>
      
      <RadioGroup 
        value={selectedOption} 
        onValueChange={onSelectOption}
        className="space-y-2"
      >
        {options.map((option, index) => (
          <div key={index} className="flex items-center space-x-3">
            <RadioGroupItem 
              value={option} 
              id={`option-${index}`}
            />
            <Label 
              htmlFor={`option-${index}`}
              className={cn(
                "text-base font-normal",
                selectedOption === option && "font-medium"
              )}
            >
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}