'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SidebarMenu from '@/components/side';
import { SidebarProvider } from "@/components/ui/sidebar";
import QuizContainer from '@/components/quiz/quiz-container';

export default function QuizzesPage() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <SidebarMenu />
        <main className="flex-1 p-6 overflow-auto">
          <motion.div 
            className="relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-6">Quizzes</h1>
          </motion.div>
          
          <QuizContainer />
        </main>
      </div>
    </SidebarProvider>
  );
}