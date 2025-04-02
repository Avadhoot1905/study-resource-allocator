"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

interface TimerProps {
  initialMinutes?: number;
  initialSeconds?: number;
  onTimeUp?: () => void;
  onTimeUpdate?: (remainingSeconds: number) => void;
  autoStart?: boolean;
  compact?: boolean;
}

export default function CountdownTimer({ 
  initialMinutes = 0, 
  initialSeconds = 30, 
  onTimeUp,
  onTimeUpdate,
  autoStart = false,
  compact = false
}: TimerProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: initialMinutes,
    seconds: initialSeconds,
  })
  const [timerActive, setTimerActive] = useState(autoStart)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timerActive) {
      startTimer()
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [timerActive])

  // Initial setup effect
  useEffect(() => {
    if (autoStart) {
      startTimer()
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [])

  const startTimer = () => {
    if (intervalId) clearInterval(intervalId)
    
    const totalSeconds = 
      (timeRemaining.days * 24 * 60 * 60) + 
      (timeRemaining.hours * 60 * 60) + 
      (timeRemaining.minutes * 60) + 
      timeRemaining.seconds
    
    const targetDate = new Date().getTime() + (totalSeconds * 1000)
    
    const newIntervalId = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now
      
      if (distance < 0) {
        clearInterval(newIntervalId)
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        setTimerActive(false)
        if (onTimeUp) onTimeUp()
        return
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24))
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)
      
      setTimeRemaining({ days, hours, minutes, seconds })
    }, 1000)
    
    setIntervalId(newIntervalId)
    setTimerActive(true)
  }

  const pauseTimer = () => {
    if (intervalId) {
      clearInterval(intervalId)
      setIntervalId(null)
    }
    setTimerActive(false)
  }


  if (compact) {
    return (
      <div className="flex flex-col items-end">
        <div className="flex items-center gap-2">
          <div className="text-sm font-medium">Time:</div>
          <div className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-md text-lg font-bold">
            {String(timeRemaining.minutes).padStart(2, '0')}:{String(timeRemaining.seconds).padStart(2, '0')}
          </div>
        </div>
        <div className="flex gap-1 mt-1">
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs px-2"
            onClick={startTimer}
            disabled={timerActive}
          >
            Continue
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="h-7 text-xs px-2"
            onClick={pauseTimer}
            disabled={!timerActive}
          >
            Pause
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-xl font-medium">Time Remaining</div>
      <div className="flex gap-4">
        {timeRemaining.days > 0 && (
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md">
            <div className="text-3xl font-bold">{timeRemaining.days}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Days</div>
          </div>
        )}
        {(timeRemaining.days > 0 || timeRemaining.hours > 0) && (
          <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md">
            <div className="text-3xl font-bold">{timeRemaining.hours}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Hours</div>
          </div>
        )}
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md">
          <div className="text-3xl font-bold">{timeRemaining.minutes}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Minutes</div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md">
          <div className="text-3xl font-bold">{timeRemaining.seconds}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Seconds</div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button 
          variant="outline" 
          onClick={startTimer}
          disabled={timerActive}
        >
          Continue
        </Button>
        <Button 
          variant="outline" 
          onClick={pauseTimer}
          disabled={!timerActive}
        >
          Pause
        </Button>
      </div>
    </div>
  )
}