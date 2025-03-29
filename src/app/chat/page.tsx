'use client';

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SidebarMenu from "@/components/side";
import { SidebarProvider } from "@/components/ui/sidebar";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <SidebarMenu />
        <motion.main 
          className="flex-1 p-4 flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="flex flex-col flex-1 max-w-3xl w-full mx-auto"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="flex-1 overflow-auto mb-4 shadow-md">
              <CardContent className="p-4 h-full">
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
                    <motion.div className="space-y-3">
                      {messages.map((msg, index) => (
                        <motion.div
                          key={index}
                          className="p-3 bg-gray-100 rounded-lg"
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
                            backgroundColor: "#f3f4f6"
                          }}
                        >
                          {msg}
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
                className="flex-1 resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button onClick={sendMessage}>Send</Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.main>
      </div>
    </SidebarProvider>
  );
}