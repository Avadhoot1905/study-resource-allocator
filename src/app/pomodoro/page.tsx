'use client';

import { useState } from "react";
import SidebarMenu from "@/components/side";
import { SidebarProvider } from "@/components/ui/sidebar";
import PomodoroCard from "@/components/timer-details";
import { Pomodoro } from "@/components/timer";

export default function PomodoroPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(25 * 60); // Default 25 minutes

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <SidebarMenu />
        <div className="flex flex-1 flex-col justify-center items-center p-4 space-y-4">
          <PomodoroCard setDuration={setDuration} setIsRunning={setIsRunning} />
          <Pomodoro isPlaying={isRunning} duration={duration} />
          <button
            onClick={() => setIsRunning((prev) => !prev)}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            {isRunning ? "Pause" : "Start"}
          </button>
        </div>
      </div>
    </SidebarProvider>
  );
}
