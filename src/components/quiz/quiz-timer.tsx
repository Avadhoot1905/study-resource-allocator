'use client';

import { useEffect, useState, useRef } from 'react';
import { Badge } from "@/components/ui/badge";

interface CountdownTimerProps {
  initialSeconds: number;
  onTimeUp: () => void;
  onTimeUpdate?: (remainingSeconds: number) => void;
}

export default function CountdownTimer({
  initialSeconds,
  onTimeUp,
  onTimeUpdate,
}: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const onTimeUpdateRef = useRef(onTimeUpdate);

  // Update the ref when callback changes
  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => {
        const newSeconds = prev - 1;
        
        // Use ref to call the callback
        if (onTimeUpdateRef.current) {
          onTimeUpdateRef.current(newSeconds);
        }
        
        if (newSeconds <= 0) {
          clearInterval(timer);
          onTimeUp();
          return 0;
        }
        return newSeconds;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onTimeUp]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Badge variant="outline" className="px-3 py-2 text-sm font-mono">
      {formatTime(seconds)}
    </Badge>
  );
}