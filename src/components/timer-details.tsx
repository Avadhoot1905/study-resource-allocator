'use client';

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface PomodoroCardProps {
  setDuration: (duration: number) => void;
  setIsRunning: (isRunning: boolean) => void;
}

export default function PomodoroCard({ setDuration, setIsRunning }: PomodoroCardProps) {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [cycles, setCycles] = useState(4);

  const handleStart = () => {
    setDuration(workTime * 60);
    setIsRunning(true);
  };

  return (
    <Card className="w-full max-w-md p-4">
      <CardHeader>
        <CardTitle className="text-center">Pomodoro Timer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-sm font-semibold">Work Duration (minutes)</label>
          <Input
            type="number"
            placeholder="Enter work time"
            value={workTime}
            onChange={(e) => setWorkTime(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Break Duration (minutes)</label>
          <Input
            type="number"
            placeholder="Enter break time"
            value={breakTime}
            onChange={(e) => setBreakTime(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Number of Cycles</label>
          <Input
            type="number"
            placeholder="Enter cycles"
            value={cycles}
            onChange={(e) => setCycles(Number(e.target.value))}
          />
        </div>
        <Button className="w-full" onClick={handleStart}>Start Pomodoro</Button>
      </CardContent>
    </Card>
  );
}
