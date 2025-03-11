'use client';

import { useEffect, useState } from "react";
import { Circle } from "lucide-react";

const Timer = ({ initialTime = 30 }: { initialTime?: number }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="flex items-center space-x-2 text-lg font-semibold">
      <Circle className="w-6 h-6 text-red-500 animate-pulse" />
      <span>{timeLeft}s</span>
    </div>
  );
};

export default Timer;