'use client';

import { useState } from "react";
import SidebarMenu from "@/components/side";
import { SidebarProvider } from "@/components/ui/sidebar";
import PomodoroCard from "@/components/timer-details";
import { Pomodoro } from "@/components/timer";
import { motion, AnimatePresence } from "framer-motion";

export default function PomodoroPage() {
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(25 * 60); // Default 25 minutes

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <SidebarMenu />
        <main className="flex-1 p-4 overflow-auto">
          <motion.div 
            className="h-full flex flex-col justify-center items-center space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.5,
              ease: "easeOut"
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              layout
            >
              <PomodoroCard setDuration={setDuration} setIsRunning={setIsRunning} />
            </motion.div>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              whileHover={{ scale: 1.03 }}
              layout
            >
              <Pomodoro isPlaying={isRunning} duration={duration} />
            </motion.div>
            
            <AnimatePresence mode="wait">
              <motion.button
                key={isRunning ? "pause" : "start"}
                onClick={() => setIsRunning((prev) => !prev)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: isRunning ? "#e53e3e" : "#38a169",
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ 
                  duration: 0.2,
                  backgroundColor: { duration: 0.2 }
                }}
              >
                {isRunning ? "Pause" : "Start"}
              </motion.button>
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </SidebarProvider>
  );
}