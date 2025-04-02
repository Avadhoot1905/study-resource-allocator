'use client';

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SidebarMenu from "@/components/side";
import { SidebarProvider } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { GoogleGenAI } from "@google/genai";

// Message type to distinguish between user and AI messages
type Message = {
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initialize Google GenAI - in a real app, use environment variables
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-2.0-flash";

  const sendMessage = async () => {
    if (input.trim()) {
      // Add user message
      const userMessage: Message = {
        text: input.trim(),
        sender: 'user',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);
      
      try {
        // Call Google GenAI API
        const response = await ai.models.generateContent({
          model,
          contents: input.trim(),
        });
        
        // Add AI response
        const aiMessage: Message = {
          text: response.text || "Sorry, I couldn't generate a response.",
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, aiMessage]);
      } catch (error) {
        console.error("Error generating response:", error);
        
        // Add error message
        const errorMessage: Message = {
          text: "Sorry, there was an error generating a response. Please try again.",
          sender: 'ai',
          timestamp: new Date()
        };
        
        setMessages(prev => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <SidebarProvider>
      <div className="flex flex-col md:flex-row h-screen w-full overflow-hidden">
        <div className="md:block">
          <SidebarMenu />
        </div>
        <motion.main 
          className="flex-1 p-2 md:p-4 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex flex-col flex-1 w-full max-w-3xl mx-auto"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="flex-1 overflow-auto mb-2 md:mb-4 shadow-md">
              <CardContent className="p-2 md:p-4 h-full">
                <AnimatePresence>
                  {messages.length === 0 ? (
                    <motion.div 
                      className="h-full flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.p 
                        className="text-gray-500 text-center"
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "reverse", 
                          duration: 2,
                          ease: "easeInOut" 
                        }}
                      >
                        No messages yet...
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.div className="space-y-2 md:space-y-3">
                      {messages.map((msg, index) => (
                        <motion.div
                          key={index}
                          className={`p-2 md:p-3 rounded-lg ${
                            msg.sender === 'user' 
                              ? 'bg-blue-100 ml-4 md:ml-12' 
                              : 'bg-gray-100 mr-4 md:mr-12'
                          }`}
                          initial={{ opacity: 0, y: 20, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ 
                            duration: 0.3,
                            type: "spring",
                            stiffness: 500,
                            damping: 25
                          }}
                          whileHover={{ 
                            scale: 1.01,
                            backgroundColor: msg.sender === 'user' ? "#dbeafe" : "#f3f4f6"
                          }}
                        >
                          {msg.text}
                        </motion.div>
                      ))}
                      <div ref={messagesEndRef} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
            <motion.div 
              className="flex items-center gap-2 w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Textarea
                className="flex-1 resize-none text-sm md:text-base p-2"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                rows={2}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  onClick={sendMessage} 
                  disabled={isLoading}
                  className="px-3 md:px-4 py-2"
                >
                  {isLoading ? "..." : "Send"}
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.main>
      </div>
    </SidebarProvider>
  );
}