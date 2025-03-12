'use client';

import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import SidebarMenu from "@/components/side";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function ChatPage() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        <SidebarMenu />
        <main className="flex-1 p-4 flex flex-col">
          <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto">
            <Card className="flex-1 overflow-auto mb-4 shadow-md">
              <CardContent className="p-4 h-full">
                {messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <p className="text-gray-500 text-center">No messages yet...</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((msg, index) => (
                      <div key={index} className="p-3 bg-gray-100 rounded-lg">
                        {msg}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="flex items-center gap-2 w-full">
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
              <Button onClick={sendMessage}>Send</Button>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}